import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Studio } from './components/Studio';
import { About } from './components/About';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { InstagramButton } from './components/InstagramButton';
import { CookieConsent } from './components/CookieConsent';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink via-white to-champagne">
      <Navbar />
      <Hero />
      <Services />
      <Studio />
      <About />
      <Gallery />
      <Reviews />
      <FAQ />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <InstagramButton />
      <CookieConsent />
    </div>
  );
}

export default App;
