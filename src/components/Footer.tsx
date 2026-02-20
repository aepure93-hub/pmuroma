import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <h3 className="text-2xl font-serif font-bold text-white mb-4">
                Trucco permanente by Paola Benchea
              </h3>
              <p className="text-gray-300 mb-4">
                Specializzata in trucco permanente, dermopigmentazione e microblading a Roma.
                Valorizzo la tua bellezza naturale con trattamenti personalizzati e sicuri.
              </p>
            </div>
            <div className="text-sm text-gray-400">
              P.IVA: 17536931003
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4">Contatti</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin size={16} />
                <span>Ildebrando della Giovanna 83B, 00166 Roma</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone size={16} />
                <span>+39 351 426 0868</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail size={16} />
                <span>info@pmuroma.it</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Orari</h4>
            <div className="text-gray-300 space-y-1">
              <p>Lunedì - Venerdì: 9:00 - 19:00</p>
              <p>Sabato: 9:00 - 16:00</p>
              <p>Domenica: Chiuso</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm"
        >
          <p>&copy; 2024 Trucco permanente by Paola Benchea. Tutti i diritti riservati.</p>
          <p className="mt-2">P.IVA 17536931003 - Realizzato con ❤️ a Roma</p>
          <div className="mt-4 space-x-4">
            <a 
              href="./privacy-policy.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a 
              href="./terms-of-service.html" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Termini di Servizio
            </a>
            <span>•</span>
            <button 
              onClick={() => {
                // Clear cookie consent to show banner again
                localStorage.removeItem('cookie-consent');
                // Force page reload to show cookie banner
                window.location.reload();
              }}
              className="hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            >
              Cookie Settings
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
