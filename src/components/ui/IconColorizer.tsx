import React from 'react';
import { cn } from '@/lib/utils';

interface IconColorizerProps {
    name: string;
    iconUrl: string;
    className?: string;
}

export const brandColors: Record<string, string> = {
    'sql server': '#CC292B',
    'sql': '#CC292B',
    'excel': '#217346',
    'advanced excel': '#217346',
    'power bi': '#F2C811',
    'powerbi': '#F2C811',
    'tableau': '#E97627',
    'pandas': '#150458',
    'numpy': '#013243',
    'python': '#3776AB',
    'vscode': '#007ACC',
    'vs code': '#007ACC',
    'jupyter': '#F37626',
    'github': '#181717',
    'git': '#F05032',
    'conda': '#44A833',
    'google colab': '#F9AB00',
    'typescript': '#3178C6',
    'javascript': '#F7DF1E',
    'react': '#61DAFB',
    'next.js': '#ffffff',
    'node.js': '#339933',
    'tailwind css': '#06B6D4',
    'docker': '#2496ED',
    'solidity': '#363636',
    'tensorflow': '#FF6F00',
    'pytorch': '#EE4C2C',
    'scikit-learn': '#F7931E',
    'figma': '#F24E1E',
    'postman': '#FF6C37',
    'linux': '#FCC624',
};

export const IconColorizer = ({ name, iconUrl, className }: IconColorizerProps) => {
    const normalizedName = name.toLowerCase().trim();
    const color = brandColors[normalizedName] || '#ffffff';

    // If it's a devicon original or standard colored icon, render as-is
    const isColoredDefault = 
        iconUrl.includes('-original.svg') || 
        iconUrl.includes('commons/9/9a') || 
        iconUrl.includes('googlecolab') ||
        iconUrl.includes('devicons');

    if (isColoredDefault) {
        // eslint-disable-next-line @next/next/no-img-element
        return (
            <img
                src={iconUrl}
                alt={name}
                className={cn("object-contain w-full h-full", className)}
                draggable={false}
            />
        );
    }

    return (
        <div
            className={cn("w-full h-full", className)}
            style={{
                backgroundColor: color,
                WebkitMaskImage: `url(${iconUrl})`,
                maskImage: `url(${iconUrl})`,
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
            }}
        />
    );
};
