import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TARGET_DATE = new Date('2026-04-05T23:59:59');

const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calculate = () => {
      const diff = TARGET_DATE.getTime() - new Date().getTime();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);
  return timeLeft;
};

const HeroSection = () => {
  const timeLeft = useCountdown();

  const scrollToReservation = () => {
    const element = document.getElementById('reservation');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="accueil" className="relative min-h-screen flex items-center bg-white text-gray-800 overflow-hidden">
      <div className="relative container mx-auto px-4 py-20 pt-24 z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          <div className="flex flex-col items-center text-center animate-fade-in-up">

            <div className="inline-flex items-center bg-gray-100 text-gray-700 rounded-full px-6 py-3 mb-8 border border-gray-200 shadow-sm">
              <MapPin size={16} className="mr-2 text-orange-500" />
              <span className="text-sm font-medium tracking-wide">Tankpè, Abomey-Calavi - Bénin</span>
            </div>

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

            {/* Carré orange avec compte à rebours Pâques */}
            <div className="bg-sogem-orange text-white rounded-3xl p-6 md:p-8 mb-12 max-w-lg w-full transform transition duration-300 hover:scale-105 shadow-xl hover:shadow-2xl flex flex-col items-center">

              <div className="text-xs font-bold tracking-widest uppercase text-white/70 mb-1">🐣 Offre Spéciale</div>
              <h3 className="text-2xl md:text-3xl font-black mb-2 drop-shadow-sm">PÂQUES</h3>

              <div className="bg-white/20 border border-white/40 rounded-full px-5 py-1 mb-3">
                <span className="text-xl font-black">-20% sur nos tarifs</span>
              </div>

              <p className="text-sm text-white/80 italic mb-5">Vivez ce temps pascal dans la productivité</p>

              <div className="flex items-center gap-3 mb-5">
                {[
                  { value: timeLeft.days, label: 'Jours' },
                  { value: timeLeft.hours, label: 'Heures' },
                  { value: timeLeft.minutes, label: 'Min' },
                  { value: timeLeft.seconds, label: 'Sec' },
                ].map((item, i) => (
                  <React.Fragment key={item.label}>
                    <div className="text-center">
                      <div className="bg-white/20 border border-white/40 rounded-xl px-3 py-2 min-w-[52px]">
                        <div className="text-2xl font-black leading-none" style={{ fontVariantNumeric: 'tabular-nums' }}>
                          {String(item.value).padStart(2, '0')}
                        </div>
                      </div>
                      <div className="text-[10px] text-white/70 mt-1 font-semibold uppercase tracking-wide">{item.label}</div>
                    </div>
                    {i < 3 && <div className="text-2xl font-black text-white/60 mb-4">:</div>}
                  </React.Fragment>
                ))}
              </div>

              <button
                onClick={scrollToReservation}
                className="bg-white text-sogem-orange font-bold text-sm px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform"
              >
                Consulter l'offre →
              </button>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl w-full max-w-lg transform transition duration-300 hover:scale-[1.02]">
              <img
                src="/lovable-uploads/sogempalace-building.jpg"
                alt="Sogem Palace"
                className="w-full h-auto max-h-[500px] object-cover"
                onError={e => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = "https://placehold.co/500x500/fff/363636?text=SOGEM+PALACE";
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
          <Button onClick={scrollToReservation} size="lg" className="bg-sogem-gold hover:bg-sogem-gold/90 text-white font-bold text-lg px-10 py-5 rounded-full shadow-lg border-2 border-sogem-gold transform transition duration-300 hover:-translate-y-1 glow-effect">
            Réserver maintenant
            <ArrowRight size={24} className="ml-3" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="border-2 border-sogem-orange text-sogem-orange hover:bg-sogem-orange hover:text-white font-bold text-lg px-10 py-5 rounded-full transform transition duration-300 hover:-translate-y-1 glow-effect-outline">
            Découvrir nos services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
