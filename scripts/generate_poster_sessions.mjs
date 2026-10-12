#!/usr/bin/env node
/**
 * Generate src/config/poster_sessions.ts from the organizers' CSV of poster
 * session assignments (OpenReview/Poster_Session_Assignments.csv).
 *
 * Author names are joined in from src/config/accepted_papers.json.ts by matching titles,
 * because the OpenReview export only contains paper IDs and titles.
 *
 * Usage: npm run posters [path/to/assignments.csv]
 */
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const csvPath = process.argv[2]
  ? path.resolve(process.cwd(), process.argv[2])
  : path.join(root, "OpenReview", "Poster_Session_Assignments.csv");
const papersPath = path.join(root, "src", "config", "accepted_papers.json.ts");
const configPath = path.join(root, "src", "config", "site_config.json.ts");
const outPath = path.join(root, "src", "config", "poster_sessions.ts");

if (!existsSync(csvPath)) {
  console.error(
    `Poster assignments not found at ${path.relative(root, csvPath)}\n` +
      `That folder is git-ignored, so pass a local copy: npm run posters -- /path/to/Poster_Session_Assignments.csv`,
  );
  process.exit(1);
}

// ---------------------------------------------------------------- CSV parsing

/** Minimal RFC-4180 parser: handles quoted fields containing commas and newlines. */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (quoted) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          quoted = false;
        }
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }

  const [header, ...body] = rows.filter((r) => r.some((cell) => cell.trim() !== ""));
  return body.map((cells) => Object.fromEntries(header.map((key, i) => [key.trim(), (cells[i] ?? "").trim()])));
}

// ------------------------------------------------------------- Title matching

const normalize = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, "");

/** OpenReview titles carry stray spaces before punctuation; tidy them for display. */
const prettyTitle = (title) => title.replace(/\s+([:;,.?])/g, "$1").replace(/\s+/g, " ").trim();

function levenshtein(a, b) {
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    for (let j = 1; j <= b.length; j++) {
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
    prev = curr;
  }
  return prev[b.length];
}

function similarity(a, b) {
  const longest = Math.max(a.length, b.length);
  return longest === 0 ? 0 : 1 - levenshtein(a, b) / longest;
}

/** Author lookup: exact normalized title match first, then a conservative fuzzy pass. */
function buildAuthorIndex(papers) {
  const byTitle = new Map(papers.map((p) => [normalize(p.title), p.authors]));
  return (title) => {
    const key = normalize(title);
    if (byTitle.has(key)) return byTitle.get(key);
    let best = null;
    for (const [candidate, authors] of byTitle) {
      const score = similarity(key, candidate);
      if (score > 0.94 && (!best || score > best.score)) best = { score, authors };
    }
    return best?.authors ?? "";
  };
}

// ------------------------------------------------------------------- Assembly

const csvRows = parseCsv(readFileSync(csvPath, "utf8"));
const papersSource = readFileSync(papersPath, "utf8");
const papersObject = JSON.parse(
  papersSource.slice(papersSource.indexOf("{", papersSource.indexOf("const accepted_papers")), papersSource.lastIndexOf("}") + 1),
);
const papers = papersObject.categories.flatMap((category) => category.papers.map((p) => ({ ...p, category: category.title })));
const authorsOf = buildAuthorIndex(papers);

const REQUIRED_COLUMNS = ["Accepted Paper ID", "Accepted Paper Track", "Accepted Paper Title", "Session Assignment"];
for (const column of REQUIRED_COLUMNS) {
  if (!(column in (csvRows[0] ?? {}))) {
    throw new Error(`Column "${column}" missing from ${path.relative(root, csvPath)}. Found: ${Object.keys(csvRows[0] ?? {}).join(", ")}`);
  }
}

const sessions = new Map();
const unmatched = [];
for (const row of csvRows) {
  const window = /estimated:\s*(\d{1,2}:\d{2})\s*[-–]\s*(\d{1,2}:\d{2})/.exec(row["Session Assignment"]);
  if (!window) throw new Error(`No "estimated: HH:MM-HH:MM" window in session assignment "${row["Session Assignment"]}".`);

  const authors = authorsOf(row["Accepted Paper Title"]);
  if (!authors) unmatched.push(row["Accepted Paper Title"]);

  if (!sessions.has(row["Session Assignment"])) {
    sessions.set(row["Session Assignment"], { window, label: row["Session Assignment"], posters: [] });
  }
  sessions.get(row["Session Assignment"]).posters.push({
    id: Number(row["Accepted Paper ID"]),
    title: prettyTitle(row["Accepted Paper Title"]),
    authors,
    track: row["Accepted Paper Track"],
  });
}

const ordered = [...sessions.values()]
  .sort((a, b) => a.window[1].localeCompare(b.window[1]) || a.window[2].localeCompare(b.window[2]))
  .map((session, index) => {
    const posters = session.posters.sort((a, b) => a.id - b.id);
    const tracks = [...posters.reduce((acc, p) => acc.set(p.track, (acc.get(p.track) ?? 0) + 1), new Map())]
      .sort((a, b) => b[1] - a[1])
      .map(([track, count]) => `${count} ${track}`);
    return {
      key: `poster_session_${index + 1}`,
      start: session.window[1],
      end: session.window[2],
      source: session.label.replace(/\s*\(estimated:.*\)\s*$/, ""),
      summary: `${posters.length} posters (${tracks.join(", ")})`,
      posters,
    };
  });

// Warn when the generated sessions no longer line up with the program items.
const configSource = readFileSync(configPath, "utf8");
const programSessions = [...configSource.matchAll(/\*\*Poster Session\s*\d+\*\*/gi)].length;
if (programSessions !== ordered.length) {
  console.warn(
    `Warning: CSV has ${ordered.length} poster session(s), site_config.json.ts mentions ${programSessions}. Check that each program item got a table.`,
  );
}

// -------------------------------------------------------------------- Emitting

const body = ordered
  .map((session) => {
    const rows = session.posters
      .map(
        (p) =>
          `            {\n` +
          `                id: ${JSON.stringify(String(p.id))},\n` +
          `                title: ${JSON.stringify(p.title)},\n` +
          `                authors: ${JSON.stringify(p.authors)},\n` +
          `                track: ${JSON.stringify(p.track)}\n` +
          `            }`,
      )
      .join(",\n");
    return (
      `export const ${session.key}: PosterSessionTable = {\n` +
      `    start_time: ${JSON.stringify(session.start)},\n` +
      `    end_time: ${JSON.stringify(session.end)},\n` +
      `    source: ${JSON.stringify(session.source)},\n` +
      `    summary: ${JSON.stringify(session.summary)},\n` +
      `    posters: [\n${rows}\n    ]\n` +
      `};`
    );
  })
  .join("\n\n");

const file =
  `// AUTO-GENERATED by scripts/generate_poster_sessions.mjs - do not edit by hand.\n` +
  `// Sources: ${path.relative(root, csvPath)} (${csvRows.length} rows), src/config/accepted_papers.json.ts (authors)\n` +
  `// Regenerate with: npm run posters\n` +
  `\n` +
  `export interface Poster {\n` +
  `    id: string;\n` +
  `    title: string;\n` +
  `    authors: string;\n` +
  `    track: string;\n` +
  `}\n` +
  `\n` +
  `export interface PosterSessionTable {\n` +
  `    start_time: string;\n` +
  `    end_time: string;\n` +
  `    /** Session name as it appears in the CSV. */\n` +
  `    source: string;\n` +
  `    /** Shown on the collapsed row, e.g. "44 posters (22 Main Track, ...)". */\n` +
  `    summary: string;\n` +
  `    posters: Array<Poster>;\n` +
  `}\n\n${body}\n`;

writeFileSync(outPath, file);

console.log(`Wrote ${path.relative(root, outPath)}`);
for (const session of ordered) {
  console.log(`  ${session.key}: ${session.start}-${session.end} - ${session.summary} [${session.source}]`);
}
if (unmatched.length > 0) {
  console.warn(`\nWarning: no authors found in accepted_papers.json.ts for ${unmatched.length} title(s):`);
  for (const title of unmatched) console.warn(`  - ${title}`);
}
