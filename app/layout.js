import './assets/style/globals.css';
import AuthProvider from './components/Login/AuthProvider';
import Footer from './components/Homepage/Footer';
import Navbar from './components/Homepage/Navbar';

export const metadata = {
  title: 'Harsena | Portofolio',
  description: 'Harsena Argretya',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
