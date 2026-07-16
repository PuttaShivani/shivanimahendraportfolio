import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'GenAI, RAG pipeline, ML forecasting, and inference API projects by Jasper Dasari.',
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
