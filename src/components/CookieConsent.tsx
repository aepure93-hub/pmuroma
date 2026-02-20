import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Cookie, Shield } from 'lucide-react';

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptEssential = () => {
    localStorage.setItem('cookie-consent', 'essential');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl"
    >
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-deep-rose/10 rounded-full flex items-center justify-center">
              <Cookie className="text-deep-rose" size={24} />
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Cookie Essenziali
            </h3>
            <p className="text-gray-600 mb-3">
              Questo sito utilizza solo cookie tecnici essenziali per il funzionamento base. 
              Nessun cookie di tracciamento, analytics o marketing.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Shield className="text-green-600 mt-0.5" size={16} />
                <div>
                  <strong className="text-gray-800">Cookie Tecnici Essenziali</strong>
                  <p className="text-gray-600">Sempre attivi per il funzionamento base del sito</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <a
                  href="./privacy-policy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep-rose hover:text-deep-rose/80 text-sm font-medium transition-colors"
                >
                  Leggi la Privacy Policy completa →
                </a>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 lg:ml-auto">
            <button
              onClick={acceptEssential}
              className="px-6 py-2 bg-deep-rose text-white hover:bg-deep-rose/80 font-medium rounded-full transition-colors"
            >
              Accetta Cookie Essenziali
            </button>
          </div>
          
          <button
            onClick={() => setShowConsent(false)}
            className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
