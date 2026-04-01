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
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'BlogSphere | Modern Blog Platform',
    template: '%s | BlogSphere'
  },
  description: 'BlogSphere is a modern editorial blog platform for discovering, reading, and managing articles across multiple categories.',
  keywords: ['BlogSphere', 'blog platform', 'Next.js blog', 'editorial website', 'blog management', 'content platform'],
  applicationName: 'BlogSphere',
  authors: [{ name: 'Abhijeet' }],
  creator: 'Abhijeet',
  publisher: 'BlogSphere',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: 'BlogSphere | Modern Blog Platform',
    description: 'Discover, read, and manage thoughtful blog content with a polished editorial experience.',
    siteName: 'BlogSphere',
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: 'BlogSphere preview image'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlogSphere | Modern Blog Platform',
    description: 'Discover, read, and manage thoughtful blog content with a polished editorial experience.',
    images: [siteImage]
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: siteImage,
    shortcut: siteImage,
    apple: siteImage
  }
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
