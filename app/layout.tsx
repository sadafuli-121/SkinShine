import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { PageTransition } from '@/components/layout/page-transition';
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SkinShine - Expert Dermatology Care Online',
  description: 'Connect with certified dermatologists for personalized skin care consultations. AI-powered skin analysis, secure video consultations, and expert care in Hindi, English, and regional languages.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <PageTransition>
            {children}
          </PageTransition>
          <Toaster position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
