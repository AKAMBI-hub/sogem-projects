import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, Bed, Bath, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const ApartmentSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const apartments = [
    '/lovable-uploads/appartement-sogempalace-1.jpeg',
    '/lovable-uploads/appartement-sogempalace-2.jpeg',
    '/lovable-uploads/appartement-sogempalace-3.jpeg',
    '/lovable-uploads/appartement-sogempalace-4.jpeg',
    '/lovable-uploads/appartement-sogempalace-5.jpeg',
    '/lovable-uploads/appartement-sogempalace-6.jpeg',
    '/lovable-uploads/appartement-sogempalace-7.jpeg',
    '/lovable-uploads/appartement-sogempalace-8.jpeg',
    '/lovable-uploads/appartement-sogempalace-9.jpeg',
    '/lovable-uploads/appartement-sogempalace-10.jpeg',
    '/lovable-uploads/appartement-sogempalace-11.jpeg',
    '/lovable-uploads/appartement-sogempalace-12.jpeg'
  ];

  // Auto-slide every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % apartments.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [apartments.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % apartments.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + apartments.length) % apartments.length);
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Bonjour, je suis intéressé(e) par la location d'appartements meublés chez SOGEM PALACE. Pouvez-vous me donner plus d'informations ?");
    window.open(`https://wa.me/2290195957142?text=${message}`, '_blank');
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Autres Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Location d'appartements meublés de haut standing et de véhicules pour vos séjours d'affaires ou de loisirs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Galerie d'images */}
          <div className="relative">
            <Card className="overflow-hidden shadow-2xl">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={apartments[currentSlide]}
                  alt={`Appartement SOGEM PALACE ${currentSlide + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/600x450/f0f0f0/333333?text=Appartement+SOGEM+PALACE";
                  }}
                />
                
                {/* Navigation */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Indicateurs */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {apartments.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Informations */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Appartements Meublés</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Bed className="text-sogem-orange" size={20} />
                  <span>Appartements entièrement meublés et équipés</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Bath className="text-sogem-orange" size={20} />
                  <span>Salles de bain modernes avec eau chaude</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <MapPin className="text-sogem-orange" size={20} />
                  <span>Emplacement privilégié au cœur de Cotonou et de Calavi</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Prestations incluses :</h4>
              <ul className="text-gray-600 space-y-2">
                <li>• Mobilier complet et moderne</li>
                <li>• Électroménager (réfrigérateur, cuisinière, etc.)</li>
                <li>• Connexion Wi-Fi haut débit</li>
                <li>• Climatisation dans toutes les pièces</li>
                <li>• Service de ménage disponible</li>
                <li>• Sécurité 24h/24</li>
              </ul>
            </div>

            {/* Bouton de contact */}
            <button
              onClick={handleWhatsAppContact}
              className="w-full bg-sogem-orange hover:bg-sogem-orange/90 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-3 transition-all shadow-lg hover:shadow-xl"
            >
              <MessageCircle size={20} />
              <span>Contactez-nous pour plus d'infos</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApartmentSection;
