import { motion } from 'framer-motion';
import { Eye, Heart, ChevronRight } from 'lucide-react';
import { useScrollReveal, scrollRevealVariants } from '../hooks/useScrollReveal';

export const Services = () => {
  const { ref, controls } = useScrollReveal();

  const services = [
    {
      icon: Eye,
      title: 'Sopracciglia',
      description: 'Pelo realistico, sfumato e microblading per sopracciglia perfette e naturali.',
      price: '250€',
      features: ['Pelo realistico', 'Sfumato powder', 'Microblading', 'Laminazione']
    },
    {
      icon: Heart,
      title: 'Labbra',
      description: 'Colorazione labbra permanente per un look sempre perfetto e naturale.',
      price: '250€',
      features: ['Contorno labbra', 'Riempimento full', 'Effetto 3D', 'Correzione asimmetrie']
    },
    {
      icon: Eye,
      title: 'Eyeliner',
      description: 'Eyeliner infracigliare per uno sguardo intenso e sempre definito.',
      price: '150€',
      features: ['Infracigliare', 'Classico', 'Wing effect', 'Lash line enhancement']
    }
  ];

  return (
    <section id="servizi" className="section-padding bg-white/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={scrollRevealVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            I Miei Servizi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trattamenti professionali di dermopigmentazione per valorizzare la tua bellezza naturale
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={controls}
              variants={{
                ...scrollRevealVariants,
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.6, delay: index * 0.1, ease: 'easeOut' }
                }
              }}
              className="group"
            >
              <div className="glass-effect rounded-2xl p-8 h-full hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 bg-deep-rose/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-deep-rose/20 transition-colors">
                  <service.icon className="text-deep-rose" size={32} />
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                
                <div className="text-3xl font-serif font-bold text-deep-rose mb-6">
                  {service.price}
                </div>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center text-gray-600">
                      <ChevronRight size={16} className="text-deep-rose mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <a
                  href="#contatti"
                  className="w-full btn-secondary group-hover:bg-deep-rose group-hover:text-white"
                >
                  Prenota subito
                </a>
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
          <div className="inline-flex items-center space-x-2 bg-champagne/20 px-6 py-3 rounded-full">
            <span className="text-gray-700 font-medium">Consulenza gratuita</span>
            <span className="text-deep-rose font-bold">•</span>
            <span className="text-gray-700 font-medium">Trattamenti personalizzati</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
