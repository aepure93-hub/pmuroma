import { motion } from 'framer-motion';
import { Eye, Star, ArrowRight } from 'lucide-react';
import { useScrollReveal, scrollRevealVariants } from '../hooks/useScrollReveal';

export const Gallery = () => {
  const { ref, controls } = useScrollReveal();

  const beforeAfter = [
    {
      id: 1,
      service: "Labbra",
      before: "Labbra sottili e poco definite",
      after: "Labbra piene e colorate naturalmente",
      rating: 5,
      client: "Cliente 1",
      duration: "3 ore",
      images: {
        before: ["/images/gallery/labbra 1/labbra_prima_1_foto_1.jpeg"],
        after: ["/images/gallery/labbra 1/labbra_dopo_1_foto_1.jpeg", "/images/gallery/labbra 1/labbra_dopo_1_foto_2.jpeg",
                "/images/gallery/labbra 1/labbra_dopo_2_foto_1.jpeg"]
      }
    },
    {
      id: 2,
      service: "Sopracciglia Powder",
      before: "Sopracciglia rade e asimmetriche",
      after: "Sopracciglia definite e naturali",
      rating: 5,
      client: "Cliente 2",
      duration: "2 ore",
      images: {
        before: ["/images/gallery/sopracciglia 1/sopracciglia_sfumate_prima.jpeg",
                "/images/gallery/sopracciglia 1/sopracciglia_sfumate_prima_2.jpeg"],
        after: ["/images/gallery/sopracciglia 1/sopracciglia_progetto_4_dopo_foto_1.jpeg",
               "/images/gallery/sopracciglia 1/sopracciglia_sfumate_prima_dopo.jpeg",
               "/images/gallery/sopracciglia 1/sopracciglia_sfumate_prima_dopo_2.jpeg"]
      }
    },
    {
      id: 3,
      service: "Pelo Realistico",
      before: "Sopracciglia assenti e diradate",
      after: "Effetto pelo realistico",
      rating: 5,
      client: "Cliente 3",
      duration: "3 ore",
      images: {
        before: ["/images/gallery/sopracciglia 2/sopracciglia_progetto_1_foto_1.jpeg",
                "/images/gallery/sopracciglia 2/sopracciglia_progetto_1_foto_2.jpeg"],
        after: ["/images/gallery/sopracciglia 2/sopracciglia_progetto_1_dopo_foto_1.jpeg",
               "/images/gallery/sopracciglia 2/sopracciglia_progetto_1_dopo_foto_2.jpeg"]
      }
    },
    {
      id: 4,
      service: "Sopracciglia Combo",
      before: "Sopracciglia rade con buchi",
      after: "Effetto ombreggiato naturale",
      rating: 5,
      client: "Cliente 4",
      duration: "2.5 ore",
      images: {
        before: [],
        after: ["/images/gallery/sopracciglia_combo_after_1.jpeg",
               "/images/gallery/sopracciglia_combo_after_2.jpeg"]
      }
    },
    {
      id: 5,
      service: "Sopracciglia Dettaglio",
      before: "Sopracciglia poco definite",
      after: "Sopracciglia perfettamente definite",
      rating: 5,
      client: "Cliente 5",
      duration: "2 ore",
      images: {
        before: [],
        after: ["/images/gallery/sopracciglia_sfumate_dettaglio.jpeg",
               "/images/gallery/sopracciglia_sfumate_dettaglio (2).jpeg",
               "/images/gallery/sopracciglia_sfumate_dopo.jpeg"]
      }
    },
    {
      id: 6,
      service: "Sopracciglia Progetto",
      before: "Sopracciglia diradate",
      after: "Sopracciglia piene e naturali",
      rating: 5,
      client: "Cliente 6",
      duration: "2.5 ore",
      images: {
        before: [],
        after: ["/images/gallery/sopracciglia_progetto_2_dopo_foto_1.jpeg",
               "/images/gallery/sopracciglia_progetto_3_dopo_foto_1.jpeg"]
      }
    }
  ];

  return (
    <section id="gallery" className="section-padding bg-white/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={scrollRevealVariants}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-deep-rose/10 px-4 py-2 rounded-full mb-6">
            <Eye className="text-deep-rose" size={20} />
            <span className="text-deep-rose font-medium">Risultati Reali</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Prima e <span className="text-deep-rose">Dopo</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Scopri la trasformazione reale delle mie clienti. Trattamenti professionali per valorizzare la tua bellezza naturale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beforeAfter.map((item, index) => (
            <motion.div
              key={item.id}
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
              className="group cursor-pointer"
            >
              <div className="glass-effect rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                {/* Before/After Container */}
                <div className="relative h-80 bg-gradient-to-br from-rose-gold/20 to-champagne/20">
                  {/* Image Slider */}
                  <div className="relative h-full group">
                    {/* Show Before Images */}
                    {item.images.before && item.images.before.length > 0 && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <img 
                          src={item.images.before[0]} 
                          alt={`Prima - ${item.service}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-sm font-semibold text-gray-800">Prima</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Show After Images */}
                    <div className="h-full">
                      <img 
                        src={item.images.after[0]} 
                        alt={`Dopo - ${item.service}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-semibold text-deep-rose">Dopo</span>
                      </div>
                    </div>
                    
                    {/* Multiple Images Indicator */}
                    {item.images.after.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <span className="text-xs font-medium text-gray-700">+{item.images.after.length - 1} foto</span>
                      </div>
                    )}
                    
                    {/* Hover Instruction */}
                    {item.images.before && item.images.before.length > 0 && (
                      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-xs font-medium text-gray-700">Hover per Prima</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Service Badge */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-semibold text-gray-800">{item.service}</span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{item.duration}</span>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start space-x-2">
                      <ArrowRight size={16} className="text-gray-400 mt-1" />
                      <p className="text-sm text-gray-600 line-clamp-2">{item.before}</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <ArrowRight size={16} className="text-deep-rose mt-1" />
                      <p className="text-sm text-gray-800 font-medium line-clamp-2">{item.after}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <p className="font-semibold text-gray-800">{item.client}</p>
                      <p className="text-xs text-gray-500">Trattamento verificato</p>
                    </div>
                    <a
                      href="#contatti"
                      className="text-deep-rose hover:text-deep-rose/80 font-medium text-sm transition-colors group-hover:translate-x-1 inline-block"
                    >
                      Ottieni lo stesso →
                    </a>
                  </div>
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
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-rose-gold/20 to-champagne/20 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif font-bold text-gray-800 mb-4">
              Vuoi vedere altri risultati?
            </h3>
            <p className="text-gray-600 mb-6">
              Seguimi su Instagram per vedere daily transformation e aggiornamenti sui trattamenti.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.instagram.com/paola.pmu"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 bg-white border-2 border-deep-rose text-deep-rose px-6 py-3 rounded-full font-medium hover:bg-deep-rose hover:text-white transition-all duration-300"
              >
                <span>Segui su Instagram</span>
                <Star size={16} />
              </a>
              <a
                href="#contatti"
                className="btn-primary"
              >
                Prenota Consulenza
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
