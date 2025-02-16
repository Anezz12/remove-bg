import './assets/style/globals.css';
import AuthProvider from './components/Login/AuthProvider';
import Footer from './components/Homepage/Footer';
import Navbar from './components/Homepage/Navbar';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import ThemeProvider from './components/Theme/ThemeProvider';
import PotoProfile from '@/public/avatar.jpeg';

export const metadata = {
  title: 'Harsena Argretya | Personal portfolio',
  description:
    'Personal portfolio of Harsena Argretya, a student at AMIKOM University. Explore my projects, skills, and professional journey.',
  keywords: [
    'Harsena Argretya',
    'sena',
    'Argretya',
    'Harsena',
    'AMIKOM',
    'AMIKOM University',
    'Portfolio',
    'Web Developer',
    'Student',
    'Yogyakarta',
    'Software Engineer',
  ],
  openGraph: {
    title: 'Harsena Argretya | AMIKOM University Student Portfolio',
    description:
      'Personal portfolio of Harsena Argretya, showcasing projects and skills as an AMIKOM University student.',
    type: 'website',
    locale: 'en_US',
    url: 'https://www.harsena-argretya.tech',
    siteName: 'Harsena Argretya Portfolio',
    images: [
      {
        url: PotoProfile,
        width: 1200,
        height: 630,
        alt: 'Harsena Argretya - AMIKOM University Student',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-screen antialiased transition-colors duration-300">
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
