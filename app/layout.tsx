import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PAR Population Health Wheel — MVP',
  description: 'Interactive PAR demo — Saudi women (breast cancer) based on published paper.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
