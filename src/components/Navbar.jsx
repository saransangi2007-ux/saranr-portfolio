import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Changed Link import
import { Link as RouterLink } from 'react-router-dom'; // Use alias for routing
import { Menu, X, Sun, Moon, Lock } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <RouterLink to="/" className="logo">
          Saran<span className="dot">.</span>
        </RouterLink>

        {/* Desktop Menu */}
        <ul className="nav-links desktop-only">
          {navLinks.map((link) => (
            <li key={link.name}>
              <RouterLink to={link.href}>{link.name}</RouterLink>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <RouterLink to="/admin" className="admin-link" aria-label="Admin Login">
            <Lock size={18} />
          </RouterLink>

          <button
            className="mobile-toggle desktop-hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu">
            <ul className="mobile-nav-links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <RouterLink to={link.href} onClick={() => setIsOpen(false)}>
                    {link.name}
                  </RouterLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: var(--nav-height);
          z-index: 1000;
          transition: all 0.3s ease;
          background: transparent;
        }
        
        .navbar.scrolled {
          background: rgba(10, 10, 10, 0.8);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        [data-theme="light"] .navbar.scrolled {
          background: rgba(245, 245, 245, 0.8);
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 100%;
        }

        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .dot {
          color: var(--primary);
        }

        .nav-links {
          display: flex;
          gap: 30px;
        }

        .nav-links a {
          color: var(--text-secondary);
          font-weight: 500;
          position: relative;
        }

        .nav-links a:hover, .nav-links a.active {
          color: var(--primary);
        }
        
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .theme-toggle, .admin-link {
          color: var(--text-primary);
          padding: 8px;
          border-radius: 50%;
          transition: background 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .theme-toggle:hover, .admin-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--primary);
        }
        
        .mobile-toggle {
          color: var(--text-primary);
        }

        .mobile-menu {
          position: absolute;
          top: var(--nav-height);
          left: 0;
          width: 100%;
          background: var(--bg-secondary);
          padding: 20px;
          border-bottom: 1px solid var(--bg-tertiary);
        }
        
        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
          text-align: center;
        }
        
        .desktop-hidden {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-only {
            display: none;
          }
          .desktop-hidden {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
