import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Globe } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About CommunionHub</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're building bridges between communities, fostering understanding, and creating
            meaningful connections across different faiths and cultures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {[
            {
              icon: Heart,
              title: 'Our Mission',
              description: 'To create a platform where people of all faiths can come together, share experiences, and build lasting relationships.'
            },
            {
              icon: Users,
              title: 'Our Community',
              description: 'A diverse group of individuals united by the desire to learn from each other and grow together.'
            },
            {
              icon: Globe,
              title: 'Our Vision',
              description: 'To foster a world where differences are celebrated and understanding bridges all divides.'
            }
          ].map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-6">
                <section.icon className="h-8 w-8 text-black" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{section.title}</h2>
              <p className="text-gray-600">{section.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 text-center"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-gray-600 mb-6">
            Whether you're looking to connect with others, share your experiences, or simply learn
            about different faiths and cultures, CommunionHub is here for you.
          </p>
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2089&q=80"
            alt="Community gathering"
            className="rounded-lg w-full max-w-3xl mx-auto"
          />
        </motion.div>
      </div>
    </div>
  );
};