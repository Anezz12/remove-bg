import './assets/style/globals.css';
import AuthProvider from './components/Login/AuthProvider';
import Footer from './components/Homepage/Footer';
import Navbar from './components/Homepage/Navbar';
import Script from 'next/script';
import AdBanner from './components/Homepage/AdBanner';

export const metadata = {
  title: 'Harsena | Portofolio',
  description: 'Harsena Argretya',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <AuthProvider>
          <AdBanner />
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
