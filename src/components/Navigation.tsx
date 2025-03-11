import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Calendar, Home, Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/events', label: 'Events', icon: Calendar },
    { to: '/about', label: 'About', icon: Users },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Calendar className="h-8 w-8 text-brand" />
              <span className="ml-2 text-xl font-bold text-gray-900">CommunionHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="relative inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-brand"
              >
                <Icon className="h-5 w-5 mr-1" />
                {label}
                {location.pathname === to && (
                  <motion.div
                    layoutId="navigation-underline"
                    className="absolute top-7 left-0 right-0 h-0.5 bg-brand"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden flex items-center">
            <button onClick={toggleSidebar} className="text-gray-900">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="fixed top-0 left-0 w-30 h-full bg-white shadow-lg z-50 flex flex-col justify-between"
          >
            <div className="p-4 flex flex-col space-y-4">
              {links.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 text-gray-900 hover:text-brand ${location.pathname === to ? 'font-bold' : ''}`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            {/* Footer fixed at bottom */}
            <div className="p-4 border-t border-gray-200">
              <p className="text-center text-gray-600 flex items-center justify-center">
                Made with <Heart className="h-4 w-4 mx-1 text-red-500" />
              </p>
                © {currentYear} CommunionHub
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
