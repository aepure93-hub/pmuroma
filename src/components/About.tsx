import { motion } from 'framer-motion';
import { Heart, Award, Users } from 'lucide-react';
import { useScrollReveal, scrollRevealVariants } from '../hooks/useScrollReveal';

export const About = () => {
  const { ref, controls } = useScrollReveal();

  const values = [
    {
      icon: Heart,
      title: 'Passione',
      description: 'Amo il mio lavoro e mi dedico con passione a ogni cliente per garantire risultati eccellenti.'
    },
    {
      icon: Award,
      title: 'Professionalità',
      description: 'Formazione continua e aggiornamento costante per offrire sempre i migliori trattamenti.'
    },
    {
      icon: Users,
      title: 'Personalizzazione',
      description: 'Ogni trattamento è studiato su misura per valorizzare la bellezza unica di ogni persona.'
    }
  ];

  return (
    <section id="chi-sono" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={scrollRevealVariants}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-6">
              Come <span className="text-deep-rose">Lavoro?</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Eseguo un lavoro artistico studiato su misura per ogni esigenza del cliente. 
              Prima di procedere al trattamento, avviene una fase conoscitiva per capire al meglio 
              i desideri e le necessità di ogni persona garantendo il risultato desiderato.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Con anni di esperienza nel settore della dermopigmentazione, ho aiutato centinaia di 
              donne a ritrovare la fiducia in sé stesse attraverso trattamenti sicuri, professionali 
              e completamente personalizzati.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="bg-rose-gold/10 px-4 py-2 rounded-full">
                <span className="text-deep-rose font-medium">Certificata Internazionale</span>
              </div>
              <div className="bg-champagne/20 px-4 py-2 rounded-full">
                <span className="text-gray-700 font-medium">Prodotti Premium</span>
              </div>
              <div className="bg-soft-pink/20 px-4 py-2 rounded-full">
                <span className="text-gray-700 font-medium">Garanzia di Risultato</span>
              </div>
            </div>
            
            <blockquote className="border-l-4 border-deep-rose pl-6 italic text-gray-600">
              "La bellezza inizia quando decidi di essere te stessa. Il mio compito è valorizzare 
              ciò che già sei, rendendola ancora più splendente."
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: 50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: 'easeOut' }
              }
            }}
            className="space-y-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={controls}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: { duration: 0.6, delay: index * 0.2, ease: 'easeOut' }
                  }
                }}
                className="glass-effect rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-deep-rose/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <value.icon className="text-deep-rose" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
