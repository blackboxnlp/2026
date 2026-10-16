import { poster_session_1, poster_session_2, type PosterSessionTable } from "./poster_sessions";

interface SiteConfig {
    website_url: string,
    banner_path: string,
    x_handle: string,
    keywords: string,
    authors: string,
    logo_path: string;
    name: string;
    description: string;
    main_conf: string;
    main_conf_link: string;
    location: string;
    date: string;
    nav_title: string;
    nav_items: Array<{ name: string; href: string }>;
    buttons: Array<{ name: string; href: string }>;
    anthology_link: string;
    email_link: string;
    youtube_link: string;
    x_link: string;
    github_link: string;
    bluesky_link: string;
    program_events: Array<{
        start_time: string;
        end_time: string;
        description: string;
        papers: Array<{ title: string; authors: string }> | undefined;
        /** Collapsible list of posters, built from the OpenReview assignments CSV. */
        poster_table?: PosterSessionTable;
    }>;
    invited_speakers: Array<{
        image_path: string;
        name: string;
        affiliation: string;
        description: string;
        link: string;
        abstract?: string;
        bio?: string;
    }>;
    panelists: Array<{
        image_path: string;
        name: string;
        affiliation: string;
        link: string;
    }>;
    sponsors: Array<{
        image_path: string;
        link: string;
    }>;
    organizers: Array<{
        image_path: string;
        name: string;
        affiliation: string;
        description: string;
        link: string;
    }>;
    faq_items: Array<{
        question: string;
        answer: string;
    }>;
}

const site_config: SiteConfig = {
    website_url: "https://blackboxnlp.github.io",
    banner_path: "2026/banner.png",
    x_handle: "@BlackboxNLP",
    keywords: "BlackboxNLP, EMNLP, NLP, Workshop, XAI, Interpretability, Language Models, Explainability",
    authors: "BlackboxNLP 2026 Organizers",
    logo_path: "/2026/logo.svg",
    name: "BlackboxNLP 2026",
    description: "The Ninth Workshop on Analyzing and Interpreting Neural Networks for NLP",
    main_conf: "EMNLP 2026",
    main_conf_link: "https://2026.emnlp.org",
    location: "Budapest, Hungary",
    date: "October 29th, 2026",
    nav_title: "BlackboxNLP",
    nav_items: [
        { name: "Accepted Papers", href: "/2026/accepted_papers" },
        { name: "Call for Papers", href: "/2026/call" },
        { name: "Reproducibility Track", href: "/2026/reproducibility" },
        { name: "News", href: "/2026/#news" },
        { name: "Program", href: "/2026/#program" },
    ],
    buttons: [
        { name: "Accepted Papers", href: "/2026/accepted_papers" },
        { name: "Call for Papers", href: "/2026/call" },
    ],
    anthology_link: "https://aclanthology.org/venues/blackboxnlp/",
    email_link: "mailto:blackboxnlp@googlegroups.com",
    youtube_link: "https://www.youtube.com/@blackboxnlp",
    x_link: "https://twitter.com/BlackboxNLP",
    github_link: "https://github.com/blackboxnlp",
    bluesky_link: "https://bsky.app/profile/blackboxnlp.bsky.social",
    program_events: [
        {
            "start_time": "9:00",
            "end_time": "9:10",
            "description": "**Opening Remarks**",
            papers: undefined
        },
        {
            "start_time": "9:10",
            "end_time": "9:50",
            "description": "Invited talk by **Sheridan Feucht**",
            papers: undefined
        },
        {
            "start_time": "9:50",
            "end_time": "10:30",
            "description": "Invited talk by **Ivan Titov**",
            papers: undefined
        },
        {
            "start_time": "10:30",
            "end_time": "11:00",
            "description": "Break ☕",
            papers: undefined
        },
        {
            "start_time": "11:00",
            "end_time": "12:00",
            "description": "Oral presentations 1:",
            papers: [
                {
                    title: "**Data Attribution of Emergent Misalignment with Persona Features**",
                    authors: "_Clemens Vetter, David Kaczér, Lucie Flek, Florian Mai_"
                },
                {
                    title: "**How Much Sonority Structure Do Phonotactic Language Models Learn from Distribution?**",
                    authors: "_Jia Can Xu, Mario Giulianelli_"
                },
                {
                    title: "**A circuit for predicting hierarchical structure in-context in Large Language Models**",
                    authors: "_Tankred Saanum, Can Demircan, Samuel J. Gershman, Eric Schulz_"
                }
            ]
        },
        {
            "start_time": "12:00",
            "end_time": "13:00",
            "description": "**Poster Session 1**",
            papers: undefined,
            poster_table: poster_session_1
        },
        {
            "start_time": "13:00",
            "end_time": "14:00",
            "description": "Lunch 🥪",
            papers: undefined
        },
        {
            "start_time": "14:00",
            "end_time": "14:45",
            "description": "Invited talk by **Michael Hahn**",
            papers: undefined
        },
        {
            "start_time": "14:45",
            "end_time": "15:30",
            "description": "Oral presentations 2:",
            papers: [
                {
                    title: "**Probing for Knowledge Attribution in Large Language Models**",
                    authors: "_Ivo Brink, Alexander Boer, Dennis Ulmer_"
                },
                {
                    title: "**Probing Without Labels: Contrast-only Reproductions of Interpretability Results**",
                    authors: "_Stefan F. Schouten, Peter Bloem_"
                },
                {
                    title: "**Does Out-of-Sight Equal Out-of-Mind in CoT Monitorability?**",
                    authors: "_Pedro Lobato Ferreira, Wilker Aziz, Ivan Titov_"
                }
            ]
        },
        {
            start_time: "15:30",
            end_time: "15:40",
            description: "Best paper awards + Closing remarks",
            papers: undefined
        },
        {
            start_time: "15:40",
            end_time: "16:00",
            description: "Break ☕",
            papers: undefined
        },
        {
            start_time: "16:00",
            end_time: "17:00",
            description: "**Poster Session 2**",
            papers: undefined,
            poster_table: poster_session_2
        },
    ],
    invited_speakers: [
        {
            image_path: "https://ivan-titov.org/ititov.jpg",
            name: "Ivan Titov",
            affiliation: "Professor, University of Edinburgh & University of Amsterdam",
            description: "Talk: Post-training for reasoning in LLMs: learning vs reshaping, generalization and failure modes",
            link: "https://ivan-titov.org",
            abstract: "What does post-training for reasoning do to an LLM? It is often argued that it works less by creating new capabilities than by ‘reshaping access’ to capabilities already acquired during pre-training. I will first introduce a formalization of this superficial alignment hypothesis through algorithmic information theory, which lets us relate different ways of adapting models (fine-tuning, in-context learning, prompting) within one framework. The verdict is mixed: most of the gains from post-training cost almost no information but the final gains cost a lot. I will then look inside supervised and reinforcement fine-tuning. SFT adds missing behaviours but moves the model far and may generalize worse; RFT changes the model selectively and generalizes better. These complementary strengths motivate us to build a simple hybrid that uses demonstrations only where exploration fails. I will also show one source of RFT’s selectivity: standard GRPO secretly does sparse token-level credit assignment (and a common default in RL frameworks nearly breaks it!). Finally, the reward-driven optimization can favour answers that look right while the chain of thought behind them is unfaithful or fabricated; I will discuss evidence and conditions for this and a mitigation that gives reward models an interpretability signal from counterfactual rollouts.",
            bio: "…"
        },
        {
            image_path: "https://s44427.pcdn.co/wp-content/uploads/2024/07/Feucht-Sheridan_240410_Khoury_SheridanFeucht_IanMac_1448_Selected.jpg",
            name: "Sheridan Feucht",
            affiliation: "PhD student, Northeastern University",
            description: "Talk: How do LLMs Read? Two Ways LLMs Map from Arbitrary Symbols to Words",
            link: "https://sfeucht.github.io",
            abstract: "Reading is the process of mapping from arbitrary shapes to meaningful words, and comprises much of how we as humans experience language. But LLMs already live and breathe text. Is there any interesting sense in which they would ever learn to \"read\"? In this talk, I discuss my work on two settings in which LLMs must map from arbitrary symbols to meaningful word representations. First, despite the fact that tokens in LLMs typically correspond to words, LLMs often still must learn that certain arbitrary token combinations (e.g. \"pat\", \"rolling\") correspond to a single semantic unit (\"patrolling\"). In our work on the \"dual-route model of induction\", we use such multi-token words to separate two distinct mechanisms for copying text in-context: a semantic pathway and a literal pathway, analogous to the dual-route model of reading in humans. Switching gears to VLMs, I then discuss our recent work on optical character recognition (OCR): how VLMs map from words in pixel space to language space. We identify VLM components responsible for reading text contained in images. Surprisingly, these attention heads can also verbalize semantics of image tokens that do not contain text. We use this finding to create a \"logit lens for image tokens\" that reveals alignment between image and language space in early VLM layers. Taken together, these two lines of work illustrate how LLMs can \"understand\" the semantics of words independent of their surface-level features.",
            bio: "…"
        },
        {
            image_path: "https://lacoco-lab.github.io/home/authors/mhahn/avatar_hu2c1e3a58057cd4576c043ddea658feb3_641679_270x270_fill_q75_lanczos_center.jpg",
            name: "Michael Hahn",
            affiliation: "Professor, Saarland University",
            description: "Talk: From Transformers to Programs and Automata",
            link: "https://www.mhahn.info",
            abstract: "How can we turn a Transformer’s computations into an explicit and interpretable representation of what it does? I will explore how we can map model computations to formal representations as programs and automata. I will first discuss techniques for extracting explicit representations from Transformers via behavioral queries alone. I will then present a pipeline for decompiling transformers into programs using their weights. In the last part, I will examine what observable thinking traces reveal (or not) about the computations underlying a model’s answers. Taken together, these results address a fundamental question: when can we recover faithful representations of Transformer computations, and what remains out of reach?",
            bio: "Michael Hahn received his PhD from Stanford University in 2022, advised by Dan Jurafsky and Judith Degen. He is now a professor at Saarland University, Germany. His research focuses on the theoretical foundations and inner workings of LLMs."
        }
    ],
    panelists: [],
    //     {
    //         image_path: "https://www.svgrepo.com/show/105517/user-icon.svg",
    //         name: "Panelist 1",
    //         affiliation: "Affiliation",
    //         link: "/2025"
    //     },
    //     {
    //         image_path: "https://www.svgrepo.com/show/105517/user-icon.svg",
    //         name: "Panelist 2",
    //         affiliation: "Affiliation",
    //         link: "/2025"
    //     },
    //     {
    //         image_path: "https://www.svgrepo.com/show/105517/user-icon.svg",
    //         name: "Panelist 3",
    //         affiliation: "Affiliation",
    //         link: "/2025"
    //     },
    //     {
    //         image_path: "https://www.svgrepo.com/show/105517/user-icon.svg",
    //         name: "Panelist 4",
    //         affiliation: "Affiliation",
    //         link: "/2025"
    //     },
    // ],
    sponsors: [
        {
            "image_path": "https://ndif.us/images/NDIF_Acr_color.png",
            "link": "https://ndif.us/"
        }
    ],
    organizers: [
        {
            image_path: "/2026/yonatan.jpg",
            name: "Yonatan Belinkov",
            affiliation: "Senior Lecturer, Technion",
            description: "",
            link: "https://belinkov.com/"
        },
        {
            image_path: "https://aaronmueller.github.io/files/profpic_close_centered.jpeg",
            name: "Aaron Mueller",
            affiliation: "Assistant Professor, Boston University",
            description: "",
            link: "https://aaronmueller.github.io/"
        },
        {
            image_path: "https://hanjiechen.github.io/photo/hanjie.jpeg",
            name: "Hanjie Chen",
            affiliation: "Assistant Professor, Rice University",
            description: "",
            link: "https://hanjiechen.github.io/"
        },
        {
            image_path: "/2026/hosein.jpg",
            name: "Hosein Mohebbi",
            affiliation: "AI Researcher at Whispp & Postdoc at University of Amsterdam",
            description: "",
            link: "https://hmohebbi.github.io/"
        },
        {
            image_path: "/2026/gabriele.jpg",
            name: "Gabriele Sarti",
            affiliation: "Postdoc, Northeastern University",
            description: "",
            link: "https://gsarti.com"
        },
        {
            image_path: "/2026/dana.jpg",
            name: "Dana Arad",
            affiliation: "PhD Candidate, Technion",
            description: "",
            link: "https://danaarad.github.io/"
        },
        {
            image_path: "/2026/martin.png",
            name: "Martin Tutek",
            affiliation: "Postdoc, University of Zagreb",
            description: "",
            link: "https://mttk.github.io/"
        },
        {
            image_path: "/2026/nils.png",
            name: "Nils Feldhus",
            affiliation: "Postdoc, University of Groningen",
            description: "",
            link: "https://nfelnlp.github.io/"
        }
    ],
    faq_items: [
        // {
        //     question: "How are virtual poster sessions organized?",
        //     answer: "Virtual poster sessions will be held on Gather.town. The links to the virtual poster sessions will be available on the Underline page of the // BlackboxNLP workshop."
        // },
        {
            question: "Are dual submissions allowed?",
            answer: "Yes, dual submissions are allowed if the other venue also allows dual submissions. If your submission is accepted to the archival track of BlackboxNLP, you will have to withdraw your submission to the other venue."
        },
        // {
        //     question: "How many models/tasks should I evaluate for the shared task?",
        //     answer: "Submissions to the Circuit Localization track should evaluate at least two models and two tasks, while there are no restrictions on the number of // models and tasks for the Causal Variable Localization track. However, for any submission (regardless of the track) to be considered for our final ranking, // it must be evaluated at least on the three less resource-intensive settings in MIB, namely: (1) GPT-2 on IOI (2) Qwen-2.5 on IOI; and (3) Qwen-2.5 on MCQA."
        // },
        // {
        //     question: "How are the shared task submissions evaluated?",
        //     answer: "Shared task submissions will be evaluated by the workshop organizers and MIB creators based on the novelty and effectiveness of the proposed // method. In practice, including more model-task combinations in the evaluation will strengthen high-scoring submissions by demonstrating the generality of // the proposed method's effectiveness. Novelty will be evaluated in light of currently established methods for each one of the tracks."
        // },
        // {
        //     question: "Are submissions to the shared task archival?",
        //     answer: "Yes, submissions to the shared task will be considered archival, and will be published in the BlackboxNLP 2025 workshop proceedings on the ACL // Anthology."
        // },
        // {
        //     question: "How are shared task reports evaluated?",
        //     answer: "Shared task reports will be evaluated by the workshop organizers to assess whether they meet the requirements for archival publication."
        // },
        {
            question: "Is there an option to present the paper virtually?",
            answer: "Unfortunately, this year's BlackboxNLP workshop does not feature any virtual presentation slots. You have to register for the workshop as a presenting author for your paper to be added to the proceedings, as per the guidelines for the conference. However, you do not necessarily have to attend, and people have in the past had someone else (also non-authors) hang their poster."
        }
    ]
};

export default site_config;
