import { motion } from 'framer-motion';
import { MapPin, Heart, Award, Clock, Users, Sparkles } from 'lucide-react';
import { useScrollReveal, scrollRevealVariants } from '../hooks/useScrollReveal';

export const Studio = () => {
  const { ref, controls } = useScrollReveal();

  const features = [
    {
      icon: MapPin,
      title: 'Posizione Comoda',
      description: 'Con ampio parcheggio gratis facilmente raggiungibile'
    },
    {
      icon: Heart,
      title: 'Ambiente Accogliente',
      description: 'Atmosfera rilassante e professionale per trattamenti sicuri'
    },
    {
      icon: Award,
      title: 'Certificazioni',
      description: 'Formazione continua e certificazioni internazionali'
    },
    {
      icon: Clock,
      title: 'Puntualità',
      description: 'Rispetto degli orari e organizzazione impeccabile'
    },
    {
      icon: Users,
      title: 'Esperienza',
      description: 'Anni di esperienza e centinaia di clienti soddisfatte'
    },
    {
      icon: Sparkles,
      title: 'Qualità Premium',
      description: 'Prodotti di altissima qualità e strumentazione all\'avanguardia'
    }
  ];

  return (
    <section id="studio" className="section-padding bg-white/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={scrollRevealVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Il Nostro <span className="text-deep-rose">Studio</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Un ambiente professionale e accogliente dove la bellezza incontra l'arte
          </p>
        </motion.div>

        {/* Paola Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-rose-gold/10 px-4 py-2 rounded-full">
              <Sparkles className="text-deep-rose" size={20} />
              <span className="text-deep-rose font-medium">Paola Benchea</span>
            </div>
            
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-800">
              La Tua <span className="text-deep-rose">Dermopigmentista</span>
            </h3>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              Con anni di esperienza nel settore della dermopigmentazione, Paola combina 
              tecnica avanzata e sensibilità artistica per creare risultati naturali e duraturi. 
              Specializzata in trucco permanente, microblading e trattamenti correttivi, 
              segue ogni cliente con professionalità e dedizione.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-rose-gold/10 px-4 py-2 rounded-full">
                <span className="text-deep-rose font-medium">Certificata Internazionale</span>
              </div>
              <div className="bg-champagne/20 px-4 py-2 rounded-full">
                <span className="text-gray-700 font-medium">+500 Clienti</span>
              </div>
              <div className="bg-soft-pink/20 px-4 py-2 rounded-full">
                <span className="text-gray-700 font-medium">10+ Anni Esperienza</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-96 bg-gradient-to-br from-rose-gold/20 to-champagne/20 rounded-2xl overflow-hidden">
              <img 
                src="/images/studio/dermopigmentista_professionista.jpeg" 
                alt="Paola Benchea - Dermopigmentista professionista a Roma specializzata in trucco permanente e microblading"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                width="600"
                height="384"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-sm font-semibold text-deep-rose">Founder</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Studio Images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-bold text-center text-gray-800 mb-12">
            Gli Spazi del <span className="text-deep-rose">Nostro Studio</span>
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img 
                src="/images/studio/negozio_trucco_permanente_1.png" 
                alt="Reception studio trucco permanente Paola Benchea - Area accoglienza professionale a Roma"
                className="w-full h-full object-cover"
                loading="lazy"
                width="400"
                height="256"
              />
            </div>
            
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img 
                src="/images/studio/negozio_trucco_permanente_2.png" 
                alt="Sala trattamenti dermopigmentazione - Ambiente sterile e professionale per trucco permanente"
                className="w-full h-full object-cover"
                loading="lazy"
                width="400"
                height="256"
              />
            </div>
            
            <div className="relative h-64 rounded-xl overflow-hidden">
              <img 
                src="/images/studio/negozio_trucco_permanente_3.png" 
                alt="Area relax post-trattamento - Zona confortevole dopo trucco permanente e microblading"
                className="w-full h-full object-cover"
                loading="lazy"
                width="400"
                height="256"
              />
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-deep-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-deep-rose" size={32} />
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-rose-gold to-champagne rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">
              Vieni a Trovarci
            </h3>
            <p className="text-gray-600 mb-6">
              Scopri il nostro studio e prenota una consulenza gratuita. 
              Saremo felici di mostrarti i nostri spazi e illustrarti i trattamenti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contatti"
                className="btn-primary text-center"
              >
                Prenota Visita
              </a>
              <a
                href="tel:+393514260868"
                className="btn-secondary text-center"
              >
                Chiama Ora
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
