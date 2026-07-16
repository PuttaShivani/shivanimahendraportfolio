'use client';

import React from 'react';
import { usePerformance } from '@/hooks/usePerformance';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import CertificateHeroScroll from '@/components/sections/CertificateHeroScroll';

export default function AchievementsPage() {
    const { isLowPowerMode } = usePerformance();

    return (
        <div className="min-h-screen bg-background text-foreground overflow-y-auto overflow-x-hidden">
            {/* Hero Scroll Section */}
            <ErrorBoundary fallback={<div className="h-[60vh] flex items-center justify-center">Hero Unavailable</div>}>
                <CertificateHeroScroll isLowPowerMode={isLowPowerMode} />
            </ErrorBoundary>
        </div>
    );
}
