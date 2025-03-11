import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Github, Twitter } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">CommunionHub</h3>
            <p className="text-gray-600 mb-4">
              Connecting people across faiths and interests, building stronger communities together.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-gray-500"
              >
                <Twitter className="h-6 w-6" />
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-400 hover:text-gray-500"
              >
                <Github className="h-6 w-6" />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-600 hover:text-indigo-600">Events</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-indigo-600">About</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600">info@communionhub.com</li>
              <li className="text-gray-600">+1 (555) 123-4567</li>
              <li className="text-gray-600">123 Community Street</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600 flex items-center justify-center">
            Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> © {currentYear} CommunionHub
          </p>
        </div>
      </div>
    </footer>
  );
};