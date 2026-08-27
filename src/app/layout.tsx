import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display, Alex_Brush } from 'next/font/google';
import { getMessages, getLocale } from 'next-intl/server';
import { ThemeProvider, I18nProvider, SmoothScrollProvider } from '@/providers';

import '@/styles/globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains',
    display: 'swap',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-playfair',
    display: 'swap',
});

const signature = Alex_Brush({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-signature',
    display: 'swap',
});

export const metadata: Metadata = {
    title: {
        default: 'PUTTA SHIVANI | Full Stack Developer',
        template: '%s | Portfolio',
    },
    description: 'Motivated B.Tech (ECE) graduate with hands-on experience in building responsive web applications using React and Node.js.',
    keywords: ['full stack developer', 'react.js', 'node.js', 'express.js', 'mongodb', 'ece', 'web development', 'putta shivani'],
    authors: [{ name: 'PUTTA SHIVANI' }],
    creator: 'PUTTA SHIVANI',
    metadataBase: new URL('https://portfolio-shivani-five.vercel.app/'),
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://portfolio-shivani-five.vercel.app/',
        title: 'PUTTA SHIVANI | Full Stack Developer',
        description: 'Full Stack Web Developer specializing in React.js, Node.js, Express.js, and MongoDB.',
        siteName: 'Putta Shivani Portfolio',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PUTTA SHIVANI | Full Stack Developer',
        description: 'Full Stack Web Developer specializing in React.js, Node.js, Express.js, and MongoDB.',
        creator: '@PuttaShivani',
    },
    icons: {
        icon: '/shivaniimage.png',
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
    ],
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
};

import { ThemeAwareClickSpark } from '@/components/ui/ThemeAwareClickSpark';
import { ConditionalNavigation } from '@/components/layout/ConditionalNavigation';
import { ChatBot } from '@/components/layout/ChatBot';

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const locale = await getLocale();
    const messages = await getMessages();

    return (
        <html lang={locale} data-scroll-behavior="smooth" suppressHydrationWarning>
            <body className={`${inter.variable} ${jetbrainsMono.variable} ${playfair.variable} ${signature.variable} font-sans relative`}>
                <ThemeProvider>
                    <I18nProvider locale={locale} messages={messages}>
                        <SmoothScrollProvider>
                            <ThemeAwareClickSpark>
                                <ConditionalNavigation>
                                    {children}
                                </ConditionalNavigation>
                                <ChatBot headless />
                            </ThemeAwareClickSpark>
                        </SmoothScrollProvider>
                    </I18nProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}

