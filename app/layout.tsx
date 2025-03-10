import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vita AI - Your Personal Health Companion',
  description: 'An emotionally intelligent AI-powered health companion for personalized wellness',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <Toaster
          position="top-center"
          expand={false}
          richColors
          closeButton
          duration={4000}
        />
      </body>
    </html>
  );
}