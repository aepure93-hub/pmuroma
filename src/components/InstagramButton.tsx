import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

export const InstagramButton = () => {
  return (
    <motion.a
      href="https://www.instagram.com/paola.pmu"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-24 z-40 bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.5 }}
    >
      <Instagram size={24} />
    </motion.a>
  );
};
