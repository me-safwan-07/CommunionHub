import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group relative bg-white rounded-xl shadow-lg overflow-hidden ${className}`}
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        variants={{
          hover: {
            scale: 1.5,
            rotate: 12,
            transition: { duration: 0.4 }
          }
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-6 border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-6 h-full ${className}`}>
      {children}
    </div>
  );
};