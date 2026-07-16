'use client';

import { ReactLenis } from 'lenis/react';

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{
            lerp: 0.09,
            duration: 1.1,
            smoothWheel: true,
            wheelMultiplier: 1.2,
            // @ts-ignore
            syncTouch: true,
            // @ts-ignore
            smoothTouch: false,
        }}>
            {children}
        </ReactLenis>
    );
}
