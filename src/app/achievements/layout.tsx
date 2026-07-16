import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Achievements',
    description: 'Generative AI, machine learning, and AI engineering certifications and credentials.',
};

export default function AchievementsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
