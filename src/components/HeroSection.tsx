import React from 'react';
import { ArrowRight, MapPin, Wifi, Clock, Star, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Le composant a été ajusté pour une meilleure adaptabilité et un alignement centralisé.
const HeroSection = () => {
  const scrollToReservation = () => {
    const element = document.getElementById('reservation');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <section id="accueil" className="relative min-h-screen flex items-center bg-white text-gray-800 overflow-hidden">
      {/* Contenu principal de la section */}
      <div className="relative container mx-auto px-4 py-20 pt-24 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Colonne texte : centrée sur mobile et PC */}
          <div className="flex flex-col items-center text-center animate-fade-in-up">
            
            {/* Badge localisation */}
            <div className="inline-flex items-center bg-gray-100 text-gray-700 rounded-full px-6 py-3 mb-8 border border-gray-200 shadow-sm">
              <MapPin size={16} className="mr-2 text-orange-500" />
              <span className="text-sm font-medium tracking-wide">
                Tankpè, Abomey-Calavi - Bénin
              </span>
            </div>

            {/* Titre et sous-titre : La taille du titre a été réduite sur mobile pour qu'il tienne sur une seule ligne. */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-4">
                <Crown size={28} className="text-sogem-gold mr-3 sm:mr-4 animate-bounce-slow" />
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-none text-gray-900 drop-shadow-sm whitespace-nowrap">
                  SOGEM PALACE
                </h1>
                <Crown size={28} className="text-sogem-gold ml-3 sm:ml-4 animate-bounce-slow" />
              </div>
              <p className="text-xl md:text-2xl font-light text-gray-600 leading-relaxed max-w-lg">
                Louez l'espace prestigieux qui vous ressemble : Coworking, Bureaux et Salles évènementielles pour toutes vos ambitions.       
              </p>
            </div>

            {/* Offre accessible */}
            <div className="bg-sogem-orange text-white rounded-3xl p-6 md:p-8 mb-12 max-w-lg w-full transform transition duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex flex-col items-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center text-3xl">
                  <Crown size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 drop-shadow-sm">Offre Accessible</h3>
              <p className="text-base md:text-lg mb-2 leading-relaxed">
                Le cadre idéal pour vos projets             
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Wifi size={16} className="mr-2 text-sogem-gold" /> Fibre Optique  
                </div>
                <div className="flex items-center bg-white/20 rounded-full px-4 py-2">
                  <Clock size={16} className="mr-2 text-sogem-gold" /> Ouvert 7j/7
                </div>
              </div>
            </div>
          </div>

          {/* Colonne image */}
          <div className="flex justify-center md:justify-end">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl w-full max-w-lg transform transition duration-300 hover:scale-[1.02]">
              <img src="/lovable-uploads/sogempalace-building.jpg" alt="Sogem Palace" className="w-full h-auto max-h-[500px] object-cover"
            // Placeholder pour une meilleure expérience
            onError={e => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = "https://placehold.co/500x500/fff/363636?text=SOGEM+PALACE";
            }} />
            </div>
          </div>
        </div>

        {/* Boutons centrés en bas de la section */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
          <Button onClick={scrollToReservation} size="lg" className="bg-sogem-gold hover:bg-sogem-gold/90 text-white font-bold text-lg px-10 py-5 rounded-full shadow-lg border-2 border-sogem-gold transform transition duration-300 hover:-translate-y-1 glow-effect">
            Réserver maintenant
            <ArrowRight size={24} className="ml-3" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('services')?.scrollIntoView({
          behavior: 'smooth'
        })} className="border-2 border-sogem-orange text-sogem-orange hover:bg-sogem-orange hover:text-white font-bold text-lg px-10 py-5 rounded-full transform transition duration-300 hover:-translate-y-1 glow-effect-outline">
            Découvrir nos services
          </Button>
        </div>
      </div>
    </section>;
};
export default HeroSection;