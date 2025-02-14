import './assets/style/globals.css';
import AuthProvider from './components/Login/AuthProvider';
import Footer from './components/Homepage/Footer';
import Navbar from './components/Homepage/Navbar';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import ThemeProvider from './components/Theme/ThemeProvider';

export const metadata = {
  title: 'Harsena | Portofolio',
  description: 'Harsena Argretya',
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
