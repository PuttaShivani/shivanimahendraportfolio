import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Skills',
    description: 'AI/ML and Generative AI technical skills including Python, LangChain, Azure OpenAI, RAG pipelines, MLOps, and cloud AI deployment.',
};

export default function SkillsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
