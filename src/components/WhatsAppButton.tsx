import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export const WhatsAppButton = () => {
  const whatsappNumber = '+393514260868';
  const message = encodeURIComponent('Ciao! Vorrei informazioni sui vostri servizi di trucco permanente.');
  
  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      <MessageCircle size={24} />
      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
    </motion.a>
  );
};
