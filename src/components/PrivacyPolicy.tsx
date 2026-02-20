import { motion } from 'framer-motion';
import { Shield, Eye, Cookie, Mail, Phone, MapPin } from 'lucide-react';
import { useScrollReveal, scrollRevealVariants } from '../hooks/useScrollReveal';

export const PrivacyPolicy = () => {
  const { ref, controls } = useScrollReveal();

  return (
    <section className="section-padding bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={scrollRevealVariants}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-deep-rose/10 px-4 py-2 rounded-full mb-6">
            <Shield className="text-deep-rose" size={20} />
            <span className="text-deep-rose font-medium">Privacy & Sicurezza</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-800 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Informativa sul trattamento dei dati personali - GDPR compliant
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Ultimo aggiornamento: 18 Novembre 2024
          </p>
        </motion.div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={scrollRevealVariants}
            className="glass-effect rounded-xl p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4 flex items-center">
              <Eye className="text-deep-rose mr-3" size={24} />
              Titolare del Trattamento
            </h2>
            <div className="space-y-3 text-gray-600">
              <p><strong>Trucco permanente by Paola Benchea</strong></p>
              <div className="flex items-center space-x-2">
                <MapPin size={16} />
                <span>Ildebrando della Giovanna 83B, 00166 Roma, Italia</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={16} />
                <span>+39 351 426 0868</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} />
                <span>info@pmuroma.it</span>
              </div>
              <p><strong>P.IVA:</strong> 17536931003</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ ...scrollRevealVariants, visible: { ...scrollRevealVariants.visible, transition: { ...scrollRevealVariants.visible, delay: 0.1 } } }}
            className="glass-effect rounded-xl p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4 flex items-center">
              <Cookie className="text-deep-rose mr-3" size={24} />
              Tipologie di Cookie Utilizzati
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Cookie Tecnici (Essenziali)</h3>
                <p className="text-gray-600 mb-2">
                  Cookie necessari per il funzionamento del sito e per fornire i servizi richiesti.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Sessione utente e autenticazione</li>
                  <li>Preferenze di navigazione</li>
                  <li>Carrello e prenotazioni</li>
                  <li>Misure di sicurezza anti-spam</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Cookie Analitici</h3>
                <p className="text-gray-600 mb-2">
                  Per analizzare come gli utenti utilizzano il sito e migliorare le performance.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Google Analytics (con anonimizzazione IP)</li>
                  <li>Statistiche di accesso e visite</li>
                  <li>Tempo di permanenza e pagine visitate</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Cookie di Marketing</h3>
                <p className="text-gray-600 mb-2">
                  Per personalizzare contenuti e mostrare pubblicità pertinente.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Pixel di social media (Facebook, Instagram)</li>
                  <li>Google Ads e remarketing</li>
                  <li>Personalizzazione contenuti</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ ...scrollRevealVariants, visible: { ...scrollRevealVariants.visible, transition: { ...scrollRevealVariants.visible, delay: 0.2 } } }}
            className="glass-effect rounded-xl p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
              Dati Personali Raccolti
            </h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Dati di Navigazione</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Indirizzo IP (anonimizzato)</li>
                  <li>Browser e dispositivo utilizzato</li>
                  <li>Orario e durata della visita</li>
                  <li>Pagine visitate e azioni compiute</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Dati di Contatto</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Nome, cognome e email (modulo contatto)</li>
                  <li>Numero di telefono (WhatsApp)</li>
                  <li>Messaggi e richieste di consulenza</li>
                  <li>Preferenze di trattamento</li>
                </ul>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ ...scrollRevealVariants, visible: { ...scrollRevealVariants.visible, transition: { ...scrollRevealVariants.visible, delay: 0.3 } } }}
            className="glass-effect rounded-xl p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
              Diritti dell'Interessato (GDPR Art. 15-22)
            </h2>
            
            <div className="space-y-3 text-gray-600">
              <p><strong>Diritto di accesso:</strong> Richiedere copia dei tuoi dati personali.</p>
              <p><strong>Diritto di rettifica:</strong> Correggere dati inesatti o incompleti.</p>
              <p><strong>Diritto alla cancellazione:</strong> Richiedere la rimozione dei dati non più necessari.</p>
              <p><strong>Diritto di limitazione:</strong> Limitare il trattamento dei dati in determinate circostanze.</p>
              <p><strong>Diritto alla portabilità:</strong> Ricevere i dati in formato strutturato e leggibile.</p>
              <p><strong>Diritto di opposizione:</strong> Opporsi al trattamento per motivi legittimi.</p>
              <p><strong>Diritto di revoca:</strong> Revocare il consenso in qualsiasi momento.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ ...scrollRevealVariants, visible: { ...scrollRevealVariants.visible, transition: { ...scrollRevealVariants.visible, delay: 0.4 } } }}
            className="glass-effect rounded-xl p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
              Sicurezza e Conservazione
            </h2>
            
            <div className="space-y-3 text-gray-600">
              <p><strong>Misure di sicurezza:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4 mb-4">
                <li>Crittografia SSL/TLS per tutte le comunicazioni</li>
                <li>Server sicuri con firewall e antivirus</li>
                <li>Accessi limitati e autenticati</li>
                <li>Backup regolari e disaster recovery</li>
              </ul>
              
              <p><strong>Periodo di conservazione:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Dati di navigazione: 24 mesi (anonimizzati)</li>
                <li>Dati contatto: 36 mesi o fino a revoca consenso</li>
                <li>Dati prenotazioni: 10 anni (obblighi fiscali)</li>
                <li>Cookie di sessione: durata della sessione</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ ...scrollRevealVariants, visible: { ...scrollRevealVariants.visible, transition: { ...scrollRevealVariants.visible, delay: 0.5 } } }}
            className="glass-effect rounded-xl p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
              Contatti per Esercizio dei Diritti
            </h2>

            <p className="text-gray-600">
              Per esercitare i tuoi diritti o per qualsiasi domanda sulla privacy, puoi contattarci:
            </p>
            
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Email: privacy@paolabenchea.it</li>
              <li>Telefono: +39 351 426 0868</li>
              <li>Indirizzo: Via del tuo studio, Roma</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{ ...scrollRevealVariants, visible: { ...scrollRevealVariants.visible, transition: { ...scrollRevealVariants.visible, delay: 0.6 } } }}
            className="glass-effect rounded-xl p-8"
          >
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
              Modifiche alla Privacy Policy
            </h2>
            
            <p className="text-gray-600">
              Ci riserviamo il diritto di modificare questa privacy policy per adeguarla a cambiamenti normativi 
              o operativi. Le modifiche saranno pubblicate su questa pagina con data di aggiornamento. 
              Ti invitiamo a controllare periodicamente questa pagina per rimanere informato.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, delay: 0.7 } } }}
          className="text-center mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-500 text-sm">
            Questa privacy policy è conforme al Regolamento (UE) 2016/679 (GDPR) 
            e al D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
