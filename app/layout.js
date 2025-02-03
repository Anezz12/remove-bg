import { Geist, Geist_Mono } from 'next/font/google';
import './assets/style/globals.css';
import AuthProvider from './components/Login/AuthProvider';

export const metadata = {
  title: 'Harsena | Portofolio',
  description: 'Harsena Argretya',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
