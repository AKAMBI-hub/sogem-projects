import React, { useState, useEffect } from 'react';
import { Pause, Play, X, ChevronLeft, ChevronRight } from 'lucide-react';

const GallerySlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Images selon l'ordre spécifié par l'utilisateur
  const images = [
    {
      src: '/lovable-uploads/coworking-espace-2.jpeg',
      alt: 'Espace coworking moderne SOGEM PALACE',
      title: 'Espace Coworking'
    },
    {
      src: '/lovable-uploads/coworking-espace.jpeg',
      alt: 'Zone de travail collaboratif SOGEM PALACE',
      title: 'Zone Collaborative'
    },
    {
      src: '/lovable-uploads/salle-de-conference-nouvelle.jpeg',
      alt: 'Salle de conférence équipée SOGEM PALACE',
      title: 'Salle de Conférence'
    },
    {
      src: '/lovable-uploads/salle-de-fete.jpeg',
      alt: 'Salle de fête événements SOGEM PALACE',
      title: 'Salle de Fête'
    },
    {
      src: '/lovable-uploads/espace-coworking.jpeg',
      alt: 'Espace de travail partagé SOGEM PALACE',
      title: 'Espace Partagé'
    },
     {
      src: '/lovable-uploads/location-bureau-prive-calavi-sogem-palace.jpeg',
      alt: 'Bureau Prive SOGEM PALACE',
      title: 'Bureau Prive Calavi Réunion'
    },
    {
      src: '/lovable-uploads/sogem-building-2.jpeg',
      alt: 'Bâtiment SOGEM PALACE vue extérieure',
      title: 'Vue Extérieure'
    },
    {
      src: '/lovable-uploads/sogem-building.jpeg',
      alt: 'Façade principale SOGEM PALACE',
      title: 'Façade Principale'
    },
    {
      src: '/lovable-uploads/conference-salle-1.jpeg',
      alt: 'Salle de conférence principale SOGEM PALACE',
      title: 'Conférence Principale'
    },
    {
      src: '/lovable-uploads/conference-salle.jpeg',
      alt: 'Salle de conférence équipée SOGEM PALACE',
      title: 'Salle Équipée'
    }
  ];

  // Auto-play avec 3 secondes par image
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPlaying, images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const openModal = (index) => {
    setShowModal(true);
    setModalImageIndex(index);
    setIsPlaying(false); // Mettre en pause le diaporama
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const nextModalImage = () => {
    setModalImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevModalImage = () => {
    setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <section id="galerie" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Galerie Photos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos espaces modernes et équipés pour votre confort et productivité
            </p>
          </div>

          {/* Slider principal */}
          <div className="relative max-w-7xl mx-auto">
            <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl cursor-pointer" onClick={() => openModal(currentSlide)}>
              {/* Image principale */}
              <img
                src={images[currentSlide].src}
                alt={images[currentSlide].alt}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                {/* Titre de l'image */}
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-white font-bold text-3xl mb-2">{images[currentSlide].title}</h3>
                  <p className="text-white/80 text-lg">
                    {currentSlide + 1} / {images.length}
                  </p>
                </div>
              </div>

              {/* Bouton play/pause */}
              <button
                onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-3 transition-all duration-300"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </button>
            </div>

            {/* Indicateurs/miniatures */}
            <div className="flex justify-center mt-8 gap-2 overflow-x-auto pb-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative flex-shrink-0 w-24 h-16 md:w-28 md:h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentSlide
                      ? 'ring-4 ring-sogem-orange scale-110'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  {index === currentSlide && (
                    <div className="absolute inset-0 bg-sogem-orange/20"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Barre de progression */}
            <div className="mt-6 bg-gray-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full bg-sogem-orange transition-all duration-300 ease-linear"
                style={{
                  width: `${((currentSlide + 1) / images.length) * 100}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Plein Écran */}
      {showModal && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="relative max-w-screen-xl w-full h-full md:h-auto">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors p-2 rounded-full bg-black/50"
              aria-label="Fermer la vue plein écran"
            >
              <X size={28} />
            </button>

            <img
              src={images[modalImageIndex].src}
              alt={images[modalImageIndex].alt}
              className="max-w-full max-h-[90vh] mx-auto object-contain rounded-lg"
            />
            
            <button
              onClick={prevModalImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 rounded-full bg-black/50"
              aria-label="Image précédente"
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={nextModalImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors p-2 rounded-full bg-black/50"
              aria-label="Image suivante"
            >
              <ChevronRight size={28} />
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default GallerySlider;
