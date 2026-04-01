import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700']
});

const display = Manrope({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['500', '600', '700', '800']
});

const siteImage = 'https://cdn.displate.com/artwork/270x380/2021-05-18/4228f287d5f02898cdca54134b02df4e_baec7ebe2fa8df8e03d9d6b3b3310344.jpg';

export const metadata = {
  title: 'BlogSphere | Cinematic Blog Experience',
  description: 'A thoughtful space for stories, ideas, and perspectives that expand the mind.',
  icons: {
    icon: siteImage,
    shortcut: siteImage,
    apple: siteImage,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${display.variable} font-body bg-background text-textPrimary antialiased overflow-x-hidden`}
      >
        <ThemeProvider>
          <main className="min-h-[80vh] overflow-x-hidden pb-28">{children}</main>
          <Footer />
          <Navbar />
        </ThemeProvider>
      </body>
    </html>
  );
}