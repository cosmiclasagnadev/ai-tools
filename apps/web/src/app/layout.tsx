import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AITools.sh - AI Tool Repository',
  description: 'Discover and learn about AI tools for your business',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

