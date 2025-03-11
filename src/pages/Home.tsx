import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Connecting People Across Faiths & Interests
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A platform connecting people of all faiths through events and community support.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/events')}
            className="animate-pulse"
          >
            Explore Events
          </Button>
        </motion.div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: 'Community',
              description: 'Connect with like-minded individuals from diverse backgrounds'
            },
            {
              icon: Heart,
              title: 'Support',
              description: 'Find and offer support within your local community'
            },
            {
              icon: Sparkles,
              title: 'Events',
              description: 'Discover and create meaningful events that bring people together'
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <feature.icon className="h-12 w-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};