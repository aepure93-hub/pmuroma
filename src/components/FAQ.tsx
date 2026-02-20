import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useScrollReveal, scrollRevealVariants } from '../hooks/useScrollReveal';

export const FAQ = () => {
  const { ref, controls } = useScrollReveal();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Quanto dura il trucco permanente?",
      answer: "Il trucco permanente dura dai 6 mesi ai 2 anni a seconda del trattamento, del tipo di pelle e dello stile di vita. Le sopracciglia generalmente durano 12-18 mesi, le labbra 6-12 mesi, l'eyeliner 2-3 anni."
    },
    {
      question: "È doloroso il trattamento?",
      answer: "No, viene utilizzata un'anestesia locale topica per minimizzare il disagio durante il trattamento. La maggior parte delle clienti descrive la sensazione come un leggero fastidio piuttosto che dolore."
    },
    {
      question: "Quanto costa una consulenza?",
      answer: "La prima consulenza è completamente gratuita e senza impegno. Durante l'incontro valuteremo insieme le tue esigenze e ti fornirò un preventivo personalizzato per il trattamento desiderato."
    },
    {
      question: "Come ci si prepara al trattamento?",
      answer: "È consigliato evitare alcol e caffeina 24 ore prima, non esporre la zona al sole o lampade UV per 7 giorni, e sospendere l'uso di retinoidi o acidi 1 settimana prima."
    },
    {
      question: "Quali sono le controindicazioni?",
      answer: "Il trattamento non è indicato per donne in gravidanza o allattamento, persone con diabete non controllato, malattie autoimmuni, o in terapia con anticoagulanti."
    },
    {
      question: "Come avviene la guarigione?",
      answer: "La guarigione completa richiede circa 28 giorni. Le prime 2 settimane sono cruciali: seguirai le istruzioni post-trattamento per un risultato ottimale. Il colore apparirà più scuro inizialmente e poi si stabilizzerà."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding bg-white/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={scrollRevealVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Domande <span className="text-deep-rose">Frequenti</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Risposte alle domande più comuni sul trucco permanente e dermopigmentazione
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
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
              className="glass-effect rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-deep-rose/5 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="text-deep-rose" size={20} />
                  ) : (
                    <ChevronDown className="text-deep-rose" size={20} />
                  )}
                </div>
              </button>
              
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
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
          <div className="bg-champagne/20 rounded-xl p-6">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              Altre domande?
            </h4>
            <p className="text-gray-600 mb-4">
              Contattami direttamente per una consulenza personalizzata
            </p>
            <a
              href="#contatti"
              className="btn-primary"
            >
              Prenota Consulenza Gratuita
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
