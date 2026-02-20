import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Servizi', 'Studio', 'Come Lavoro', 'Gallery', 'Recensioni', 'FAQ', 'Contatti'];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass-effect shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-serif font-bold text-deep-rose">
            <div>Trucco Permanente by</div>
            <div className="text-lg">Paola Benchea</div>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item === 'Come Lavoro' ? 'chi-sono' : item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-700 hover:text-deep-rose transition-colors duration-300 font-medium"
              >
                {item}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <a
              href="tel:+393514260868"
              className="flex items-center space-x-2 text-deep-rose hover:text-deep-rose/80 transition-colors"
            >
              <Phone size={20} />
              <span className="font-medium">Chiama Ora</span>
            </a>
          </div>

          <button
            className="md:hidden text-deep-rose"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="text-2xl font-serif font-bold text-deep-rose mb-4">
              <div>Trucco Permanente by</div>
              <div className="text-lg">Paola Benchea</div>
            </div>
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item === 'Come Lavoro' ? 'chi-sono' : item.toLowerCase().replace(' ', '-')}`}
                className="block py-2 text-gray-700 hover:text-deep-rose transition-colors duration-300 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <a
              href="tel:+393514260868"
              className="flex items-center space-x-2 text-deep-rose hover:text-deep-rose/80 transition-colors mt-4"
            >
              <Phone size={20} />
              <span className="font-medium">Chiama Ora</span>
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};
