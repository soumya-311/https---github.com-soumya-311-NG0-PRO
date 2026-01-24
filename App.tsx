
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Donate from './pages/Donate';
import Volunteer from './pages/Volunteer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Receipt from './pages/Receipt';
import Contact from './pages/Contact';

const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    const path = currentHash.split('?')[0];

    // 🔐 ADMIN ROUTES (No Navbar/Footer)
    if (path === '#/admin') {
      return <AdminLogin />;
    }

    if (path === '#/admin/dashboard') {
      const token = localStorage.getItem('adminToken');

      // Basic protection
      if (!token) {
        window.location.hash = '#/admin';
        return null;
      }

      return <AdminDashboard />;
    }

    // 🧾 RECEIPT PAGE
    if (path.startsWith('#/receipt/')) {
      return <Receipt />;
    }

    // 🌍 PUBLIC ROUTES (With Layout)
    let PageComponent;

    switch (path) {
      case '#/about':
        PageComponent = About;
        break;
      case '#/programs':
        PageComponent = Programs;
        break;
      case '#/donate':
        PageComponent = Donate;
        break;
      case '#/volunteer':
        PageComponent = Volunteer;
        break;
      case '#/contact':
        PageComponent = Contact;
        break;
      case '#/impact':
      case '#/gallery':
      case '#/':
      default:
        PageComponent = Home;
    }

    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <PageComponent />
        </main>
        <Footer />
      </div>
    );
  };

  return <>{renderPage()}</>;
};

export default App;
