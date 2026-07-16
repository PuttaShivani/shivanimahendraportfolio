import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(input: string | number): string {
    const date = new Date(input)
    return date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}

export function getOnlineSkillIcon(name: string, customIcon?: string): string {
    let url = (customIcon || '').trim();
    
    // If the icon is from simpleicons.org, convert it to jsdelivr to avoid connection blocks
    if (url.includes('simpleicons.org')) {
        const parts = url.split('/');
        let slug = parts[parts.length - 1];
        // Remove color parameters if they are appended, e.g. "powerbi/00ccff"
        slug = slug.split('/')[0];
        return `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;
    }
    
    if (url.startsWith('http')) {
        return url;
    }
    
    const slugMap: Record<string, string> = {
        'sql server': 'microsoftsqlserver',
        'sql': 'microsoftsqlserver',
        'mysql': 'mysql',
        'postgresql': 'postgresql',
        'sqlite': 'sqlite',
        'excel': 'microsoftexcel',
        'advanced excel': 'microsoftexcel',
        'power bi': 'powerbi',
        'powerbi': 'powerbi',
        'tableau': 'tableau',
        'python': 'python',
        'pandas': 'pandas',
        'numpy': 'numpy',
        'vs code': 'visualstudiocode',
        'vscode': 'visualstudiocode',
        'jupyter': 'jupyter',
        'github': 'github',
        'git': 'git',
        'conda': 'anaconda',
        'anaconda': 'anaconda',
        'google colab': 'googlecolab',
        'colab': 'googlecolab',
        'dax': 'powerbi',
        'power query': 'powerbi',
        'kpi reporting': 'tableau',
        'typescript': 'typescript',
        'javascript': 'javascript',
        'react': 'react',
        'next.js': 'nextdotjs',
        'nextjs': 'nextdotjs',
        'node.js': 'nodedotjs',
        'nodejs': 'nodedotjs',
        'tailwind css': 'tailwindcss',
        'tailwindcss': 'tailwindcss',
        'docker': 'docker',
        'solidity': 'solidity',
        'tensorflow': 'tensorflow',
        'pytorch': 'pytorch',
        'scikit-learn': 'scikitlearn',
        'figma': 'figma',
        'postman': 'postman',
        'linux': 'linux',
    };
    
    const normalizedName = name.toLowerCase().trim();
    if (slugMap[normalizedName]) {
        return `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slugMap[normalizedName]}.svg`;
    }
    
    const slug = normalizedName.replace(/[\s.-]/g, '');
    return `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;
}
