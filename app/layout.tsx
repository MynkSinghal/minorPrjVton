import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Virtual Try-On Project',
  description: 'A simple virtual try-on application',
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