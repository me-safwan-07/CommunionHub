import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Users, Calendar, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navigation: React.FC = () => {
  const location = useLocation();

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/events', label: 'Events', icon: Calendar },
    { to: '/about', label: 'About', icon: Users },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Calendar className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">CommunionHub</span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            {links.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="relative inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600"
              >
                <Icon className="h-5 w-5 mr-1" />
                {label}
                {location.pathname === to && (
                  <motion.div
                    layoutId="navigation-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};