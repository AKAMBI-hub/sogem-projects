
import React, { useState } from 'react';
import { Menu, X, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/logo_sogem-palace.png" 
                alt="SOGEM PALACE Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SOGEM PALACE</h1>
              <p className="text-xs text-gray-500">Centre d'affaires & Coworking</p>
            </div>
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#accueil" onClick={() => scrollToSection('accueil')} className="text-gray-700 hover:text-sogem-orange transition-colors cursor-pointer">Accueil</a>
            <a href="#services" onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-sogem-orange transition-colors cursor-pointer">Services</a>
            <a href="#reservation" onClick={() => scrollToSection('reservation')} className="text-gray-700 hover:text-sogem-orange transition-colors cursor-pointer">Réservation</a>
            <a href="#galerie" onClick={() => scrollToSection('galerie')} className="text-gray-700 hover:text-sogem-orange transition-colors cursor-pointer">Galerie</a>
            <a href="#localisation" onClick={() => scrollToSection('localisation')} className="text-gray-700 hover:text-sogem-orange transition-colors cursor-pointer">Localisation</a>
          </nav>

          {/* Contact Info Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <Phone size={16} />
              <a href="tel:+2290195957142" className="hover:text-sogem-orange transition-colors">
                +229 01 95 95 71 42
              </a>
            </div>
            <Button 
              onClick={() => scrollToSection('reservation')}
              className="bg-sogem-orange hover:bg-sogem-orange-dark text-white"
            >
              Réserver
            </Button>
          </div>

          {/* Menu Mobile */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile Ouvert */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="py-4 space-y-4">
              <a href="#accueil" onClick={() => scrollToSection('accueil')} className="block text-gray-700 hover:text-sogem-orange transition-colors px-4">Accueil</a>
              <a href="#services" onClick={() => scrollToSection('services')} className="block text-gray-700 hover:text-sogem-orange transition-colors px-4">Services</a>
              <a href="#reservation" onClick={() => scrollToSection('reservation')} className="block text-gray-700 hover:text-sogem-orange transition-colors px-4">Réservation</a>
              <a href="#galerie" onClick={() => scrollToSection('galerie')} className="block text-gray-700 hover:text-sogem-orange transition-colors px-4">Galerie</a>
              <a href="#localisation" onClick={() => scrollToSection('localisation')} className="block text-gray-700 hover:text-sogem-orange transition-colors px-4">Localisation</a>
              <div className="px-4 pt-4 border-t">
                <div className="flex items-center space-x-2 mb-3">
                  <Phone size={16} />
                  <a href="tel:+2290195957142" className="text-sogem-orange">
                    +229 01 95 95 71 42
                  </a>
                </div>
                <Button 
                  onClick={() => scrollToSection('reservation')}
                  className="w-full bg-sogem-orange hover:bg-sogem-orange-dark text-white"
                >
                  Réserver maintenant
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
