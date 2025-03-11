import { motion } from 'framer-motion';
import { Heart, Sparkles, Users } from "lucide-react";
import { Spotlight } from "./ui/spotlight";

function Features() {
  return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-4 px-6">
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
          <Spotlight
            className='from-brand via-brand to-brand blur-xl dark:from-brand dark:via-brand dark:to-brand '
            size={84}
            />
          <feature.icon className="h-12 w-12 text-black-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default Features
      