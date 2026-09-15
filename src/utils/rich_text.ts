// Render OpenReview free-text fields (abstracts) as HTML.
//
// Abstracts arrive from OpenReview as plain text with LaTeX math ($...$, \(...\))
// and the occasional Markdown emphasis or code span, so they need a real parser
// rather than per-rule string replacements. Raw HTML in the source stays escaped.

import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMath from 'remark-math';
import remarkRehype from 'remark-rehype';
import rehypeKatex from 'rehype-katex';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import type { Html, Root, Text } from 'mdast';

// CommonMark parses anything starting with "<" as raw HTML, which silently swallows
// the rest of the line (see abstracts mentioning tokens like <pad>). Treat such
// spans as literal text instead: they get escaped on output.
// Author-side math quirks are normalized before parsing (see prepareMath below).
const ESCAPED_DOLLAR = "\u0000escaped-dollar\u0000";

function remarkHtmlAsText() {
  return (tree: Root) => {
    visit(tree, 'html', (node) => {
      const asText: Text = { type: 'text', value: (node as Html).value };
      Object.assign(node, asText);
    });
  };
}

/**
 * Normalize OpenReview free text before Markdown/math parsing:
 * 1. Protect escaped `\$` so it is never read as a math delimiter.
 * 2. Split back-to-back inline formulas written `$x$$y$`; remark-math otherwise reads
 *    them as one formula with a stray `$`. Only applies between non-space characters,
 *    so display math on its own lines stays as it is.
 * 3. Map `\( \)` and `\[ \]` to the `$`/`$$` forms remark-math understands.
 */
function prepareMath(text: string): string {
  return text
    .replace(/\\\$/g, ESCAPED_DOLLAR)
    .replace(/(?<=\S)\$\$(?=\S)/g, "$ $")
    .replace(/\\\(\s*/g, "$")
    .replace(/\s*\\\)/g, "$")
    .replace(/\\\[\s*/g, "$$")
    .replace(/\s*\\\]/g, "$$")
    .split(ESCAPED_DOLLAR)
    .join("&#36;");
}

const processor = unified()
  .use(remarkParse)
  .use(remarkMath, { singleDollarTextMath: true })
  .use(remarkHtmlAsText)
  .use(remarkRehype, { allowDangerousHtml: false })
  .use(rehypeKatex, {
    // A malformed formula must never fail the build, and it should not turn into a red
    // block on a public page either: failures stay as plain source text (see styling).
    throwOnError: false,
    errorColor: '#374151',
    strict: 'ignore',
    trust: false,
    output: 'htmlAndMathml',
  })
  .use(rehypeStringify, { allowDangerousHtml: false });

export function renderRichText(text: string | undefined | null): string {
  const value = (text ?? '').trim();
  if (value.length === 0) return '';
  // Collapse single newlines so abstracts stay one paragraph, keep blank-line breaks.
  const normalized = value.replace(/\r\n/g, '\n').replace(/([^\n])\n(?!\n)/g, '$1 ');
  const file = processor.processSync(prepareMath(normalized));
  return String(file.value).trim();
}

export default renderRichText;
