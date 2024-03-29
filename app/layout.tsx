import { Metadata } from 'next';
import { montserrat } from './ui/fonts';
import '@/app/ui/global.css';
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
      {/* <header>
        <script src="./TW-ELEMENTS-PATH/dist/js/tw-elements.umd.min.js"></script>
      </header> */}
      <body className={`${montserrat.className} antialiased`}>
      <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
