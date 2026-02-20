import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { useScrollReveal, scrollRevealVariants } from '../hooks/useScrollReveal';

export const Contact = () => {
  const { ref, controls } = useScrollReveal();

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Indirizzo',
      content: 'Ildebrando della Giovanna 83B, 00166 Roma, Italia',
      action: 'Apri in Maps'
    },
    {
      icon: Phone,
      title: 'Telefono',
      content: '+39 351 426 0868',
      action: 'Chiama Ora'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@pmuroma.it',
      action: 'Invia Email'
    },
    {
      icon: Clock,
      title: 'Orari',
      content: 'Lun-Ven: 9:00-19:00\nSab: 9:00-16:00',
      action: ''
    }
  ];

  return (
    <section id="contatti" className="section-padding bg-gradient-to-br from-soft-pink/30 to-champagne/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={scrollRevealVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Contattami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Prenota la tua consulenza gratuita e scopri come posso valorizzare la tua bellezza naturale
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 0.8, ease: 'easeOut' }
              }
            }}
          >
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                Informazioni Contatto
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: { duration: 0.6, delay: index * 0.1, ease: 'easeOut' }
                      }
                    }}
                    className="flex items-start space-x-4"
                  >
                    <div className="w-12 h-12 bg-deep-rose/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <info.icon className="text-deep-rose" size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{info.title}</h4>
                      <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                      {info.action && (
                        <button className="text-deep-rose hover:text-deep-rose/80 font-medium mt-2 transition-colors">
                          {info.action}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
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
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                Prenota la Tua Consulenza
              </h3>
              
              <p className="text-gray-600 mb-6">
                La prima consulenza è completamente gratuita. Durante l'incontro valuteremo insieme 
                le tue esigenze e ti mostrerò come posso aiutarti a ottenere il look che desideri.
              </p>

              <div className="space-y-4">
                <div className="bg-champagne/20 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Cosa include la consulenza:</h4>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Analisi del tuo tipo di pelle e lineamenti</li>
                    <li>• Studio della forma ideale per il tuo viso</li>
                    <li>• Simulazione del risultato finale</li>
                    <li>• Preventivo personalizzato</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <a
                  href="https://wa.me/393514260868?text=Ciao! Vorrei prenotare una consulenza gratuita per trucco permanente."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 btn-primary"
                >
                  <MessageCircle size={20} />
                  <span>Prenota su WhatsApp</span>
                </a>
                
                <a
                  href="tel:+393514260868"
                  className="w-full btn-secondary text-center"
                >
                  Chiama Ora
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
