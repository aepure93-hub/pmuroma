import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Hero = () => {
  const { ref, controls } = useScrollReveal();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-soft-pink/20 via-white to-champagne/20"></div>
      
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center space-x-2 bg-rose-gold/10 px-4 py-2 rounded-full mb-6"
        >
          <Sparkles className="text-deep-rose" size={20} />
          <span className="text-deep-rose font-medium">Paola Benchea - Dermopigmentista</span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-serif font-bold text-gray-800 mb-6 leading-tight"
        >
          Bellezza
          <span className="block text-deep-rose">Naturale</span>
          <span className="block text-3xl md:text-5xl mt-2">e Duratura</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          Specializzata in trucco permanente, dermopigmentazione e microblading a Roma.
          Valorizzo la tua bellezza naturale con trattamenti personalizzati e sicuri.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#servizi"
            className="btn-primary text-center"
          >
            Scopri i Servizi
          </a>
          <a
            href="#recensioni"
            className="btn-secondary text-center"
          >
            Leggi Recensioni
          </a>
        </div>

        <motion.div
          variants={itemVariants}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.a
            href="#servizi"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-deep-rose hover:text-deep-rose/80 transition-colors"
          >
            <ArrowDown size={24} />
          </motion.a>
        </motion.div>
      </motion.div>

      <div className="absolute top-20 left-10 w-20 h-20 bg-rose-gold/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-champagne/20 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-soft-pink/20 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};
