import { Metadata } from 'next';
import { montserrat } from './ui/fonts';

import '@/app/ui/global.css';
//import SessionProvider from '@/context/SessionAuthProvider';
import { SessionProvider } from '@/context/SessionAuthProvider';
import StoreProvider from './StoreProvider';

export const metadata: Metadata = {
  title: {
    template: '%s | ChatBot Dashboard',
    default: 'ChatBot Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">

      <body className={`${montserrat.className} antialiased`}>
        <StoreProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </StoreProvider>

      </body>
    </html>
  );
}
