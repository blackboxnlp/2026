interface AcceptedPapersList {
    categories: Array<{
        title: string;
        papers: Array<{
            title: string;
            authors: string;
            abstract: string | undefined;
        }>;
    }>;
}

const accepted_papers: AcceptedPapersList = {
    "categories": [
        {
            "title": "Full Papers",
            "papers": [
                // {
                //     "authors": "Alex Gulko, Yusen Peng, Sachin Kumar",
                //     "title": "CE-Bench: Towards a Reliable Contrastive Evaluation Benchmark of Interpretability of Sparse Autoencoders",
                //     "abstract": "Sparse autoencoders (SAEs) are a promising approach for uncovering interpretable features in large language models (LLMs). While several automated evaluation methods exist for SAEs, most rely on external LLMs. In this work, we introduce CE-Bench, a novel and lightweight contrastive evaluation benchmark for sparse autoencoders, built on a curated dataset of contrastive story pairs. We conduct comprehensive evaluation studies to validate the effectiveness of our approach. Our results show that CE-Bench reliably measures the interpretability of sparse autoencoders and aligns well with existing benchmarks without requiring an external LLM judge, achieving over 70% Spearman correlation with results in SAEBench. The official implementation and evaluation dataset are open-sourced and publicly available."
                // },
            ]
        },
        {
            "title": "Shared Task Papers",
            "papers": []
        },
        {
            "title": "Non-archival Abstracts",
            "papers": []
        }
    ]
}

export default accepted_papers;