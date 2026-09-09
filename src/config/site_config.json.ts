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
        // { name: "Accepted Papers", href: "/2026/accepted_papers" },
        { name: "Call for Papers", href: "/2026/call" },
        { name: "Reproducibility Track", href: "/2026/reproducibility" },
        { name: "News", href: "/2026/#news" },
        { name: "Program", href: "/2026/#program" },
    ],
    buttons: [
        // { name: "Accepted Papers", href: "/2026/accepted_papers" },
        { name: "Call for Papers", href: "/2026/call" },
    ],
    anthology_link: "https://aclanthology.org/venues/blackboxnlp/",
    email_link: "mailto:blackboxnlp@googlegroups.com",
    youtube_link: "https://www.youtube.com/@blackboxnlp",
    x_link: "https://twitter.com/BlackboxNLP",
    github_link: "https://github.com/blackboxnlp",
    bluesky_link: "https://bsky.app/profile/blackboxnlp.bsky.social",
    program_events: [
        // Example of program events
        // {
        //     "start_time": "8:00",
        //     "end_time": "9:00",
        //     "description": "*Virtual Poster Session 1 (1AM CEST, 7PM EST, 4PM PST)*",
        //     papers: undefined
        // },
        // {
        //     "start_time": "9:00",
        //     "end_time": "9:10",
        //     "description": "**Opening Remarks**",
        //     papers: undefined
        // },
        // {
        //     "start_time": "9:10",
        //     "end_time": "10:00",
        //     "description": "Invited talk by [**Quanshi Zhang**](https://sjtu-xai-lab.github.io/#people)",
        //     papers: undefined
        // },
        // {
        //     "start_time": "10:00",
        //     "end_time": "10:30",
        //     "description": "Oral presentations:",
        //     papers: [
        //         { title: "**Language Dominance in Multilingual Large Language Models**", authors: "_Nadav Shani, Ali Basirat_" },
        //         { title: "**Circuit-Tracer: A New Library for Finding Feature Circuits**", authors: "_Michael Hanna, Mateusz Piotrowski, Jack Lindsey, Emmanuel Ameisen_" },
        //     ]
        // },
        // {
        //     "start_time": "10:30",
        //     "end_time": "11:00",
        //     "description": "Break ☕",
        //     papers: undefined
        // },
        // {
        //     "start_time": "11:00",
        //     "end_time": "12:00",
        //     "description": "**Poster Session 1**",
        //     papers: undefined
        // },
        // {
        //     "start_time": "12:00",
        //     "end_time": "13:45",
        //     "description": "Lunch 🥪",
        //     papers: undefined
        // },
        // {
        //     "start_time": "13:45",
        //     "end_time": "14:30",
        //     "description": "Invited talk by [**Verna Dankers**](https://www.vernadankers.com/)",
        //     papers: undefined
        // },
        // {
        //     "start_time": "14:30",
        //     "end_time": "14:45",
        //     "description": "Oral presentation:",
        //     papers: [
        //         { title: "**Normative Reasoning in Large Language Models: A Comparative Benchmark from Logical and Modal Perspectives**", authors: "_Kentaro Ozeki, Risako Ando, Takanobu Morishita, Hirohiko Abe, Koji Mineshima, Mitsuhiro Okada_" },
        //     ]
        // },
        // {
        //     start_time: '14:45',
        //     end_time: '15:30',
        //     description: 'Panel discussion - **Evaluating Interpretability Methods: Challenges and Future Directions**',
        //     papers: undefined
        // },
        // {
        //     start_time: '15:30',
        //     end_time: '16:00',
        //     description: 'Break ☕',
        //     papers: undefined
        // },
        // {
        //     start_time: '16:00',
        //     end_time: '17:00',
        //     description: '**Poster Session 2**',
        //     papers: undefined
        // },
        // {
        //     start_time: '17:00',
        //     end_time: '17:20',
        //     description: 'Closing remarks and awards',
        //     papers: undefined
        // },
        // {
        //     "start_time": "17:30",
        //     "end_time": "18:30",
        //     "description": "*Virtual Poster Session 2 (10:30AM CEST, 4:30AM EST, 1:30AM PST)*",
        //     papers: undefined
        // }
    ],
    invited_speakers: [
        {
            image_path: "https://ivan-titov.org/ititov.jpg",
            name: "Ivan Titov",
            affiliation: "Professor, University of Edinburgh & University of Amsterdam",
            description: "Talk: TBA",
            link: "https://ivan-titov.org",
            abstract: "…",
            bio: "…"
        },
        {
            image_path: "https://s44427.pcdn.co/wp-content/uploads/2024/07/Feucht-Sheridan_240410_Khoury_SheridanFeucht_IanMac_1448_Selected.jpg",
            name: "Sheridan Feucht",
            affiliation: "PhD student, Northeastern University",
            description: "Talk: TBA",
            link: "https://sfeucht.github.io",
            abstract: "…",
            bio: "…"
        },
        {
            image_path: "https://lacoco-lab.github.io/home/authors/mhahn/avatar_hu2c1e3a58057cd4576c043ddea658feb3_641679_270x270_fill_q75_lanczos_center.jpg",
            name: "Michael Hahn",
            affiliation: "Professor, Saarland University",
            description: "Talk: TBA",
            link: "https://www.mhahn.info",
            abstract: "…",
            bio: "…"
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
        // }
    ]
};

export default site_config;
