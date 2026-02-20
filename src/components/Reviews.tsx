import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useScrollReveal, scrollRevealVariants } from '../hooks/useScrollReveal';

export const Reviews = () => {
  const { ref, controls } = useScrollReveal();

  const reviews = [
    {
      name: "Marzia Lotti",
      rating: 5,
      text: "Ho scelto di far il trucco permanente alle sopracciglia, consigliato da una mia amica che ha fatto lo stesso. Ho fatto molto bene ha farlo perché il risultato è...",
      date: "3 giorni fa"
    },
    {
      name: "Misa Urbano",
      rating: 5,
      text: "Paola è una professionista attenta e scrupolosa, sono molto soddisfatta del suo lavoro su di me e del risultato ottenuto grazie a lei. La consiglio assolutamente.",
      date: "1 mese fa"
    },
    {
      name: "genny meghnagi",
      rating: 5,
      text: "Ho preso appuntamento con Paola qualche giorno fa. Ci siamo sentite tramite wathsapp, avendo visto i suoi lavori su Instagram, si è resa subito disponibile ad...",
      date: "1 mese fa"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <section id="recensioni" className="section-padding bg-white/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={scrollRevealVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Cosa Dicono le <span className="text-deep-rose">Nostre Clienti</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Le recensioni vere di chi ha già provato i nostri trattamenti
          </p>
          
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="flex items-center space-x-2">
              <div className="flex">
                {renderStars(5)}
              </div>
              <span className="text-2xl font-bold text-gray-800">5.0</span>
            </div>
            <div className="text-gray-400">|</div>
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-600">Basato su</span>
              <span className="font-semibold text-gray-800">20 recensioni</span>
              <span className="text-sm text-gray-600">Google</span>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, delay: index * 0.1, ease: 'easeOut' }
                }
              }}
              className="glass-effect rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex">
                  {renderStars(review.rating)}
                </div>
                <Quote className="text-deep-rose/20" size={24} />
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-4">
                "{review.text}"
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { duration: 0.6, delay: 0.4 }
            }
          }}
          className="text-center mt-12"
        >
          <a
            href="https://maps.app.goo.gl/rEtSsQa3kXxMgVRG7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white border-2 border-deep-rose text-deep-rose px-6 py-3 rounded-full font-medium hover:bg-deep-rose hover:text-white transition-all duration-300"
          >
            <span>Leggi tutte le recensioni su Google</span>
            <Star size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
