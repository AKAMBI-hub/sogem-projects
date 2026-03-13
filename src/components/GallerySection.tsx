
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Utilisation uniquement des images fournies par l'utilisateur
  const images = [
    {
      src: '/lovable-uploads/ca0f65e5-690b-4077-8cbc-75ccd689500b.png',
      alt: 'Espace coworking SOGEM PALACE',
      title: 'Espace Coworking'
    },
    {
      src: '/lovable-uploads/d754f002-a33f-4198-9cfd-801269e943c9.png',
      alt: 'Salle de réunion SOGEM PALACE',
      title: 'Salle de Réunion'
    },
     {
      src: '/lovable-uploads/location-bureau-prive-calavi-sogem-palace.jpeg',
      alt: 'Bureau Prive SOGEM PALACE',
      title: 'Bureau Prive Calavi Réunion'
    },
    {
      src: '/lovable-uploads/847886f7-b18b-4a0d-aa2a-817e9e621f9e.png',
      alt: 'Espace de fêtes SOGEM PALACE',
      title: 'Espace de Fêtes'
    },
    {
      src: '/lovable-uploads/2bcfc518-217b-4eca-b862-cb0601b49d2a.png',
      alt: 'Salle de conférence SOGEM PALACE',
      title: 'Salle de Conférence'
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const previousImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') previousImage();
    if (e.key === 'ArrowRight') nextImage();
  };

  return (
    <section id="galerie" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Galerie Photos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos espaces modernes et équipés pour votre confort et productivité
          </p>
        </div>

        {/* Grille d'images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group cursor-pointer relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white font-bold text-xl">{image.title}</h3>
                  <p className="text-white/80 text-sm">Cliquez pour agrandir</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
            onKeyDown={handleKeyPress}
            tabIndex={0}
          >
            {/* Bouton fermer */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white hover:text-sogem-orange transition-colors z-10"
            >
              <X size={32} />
            </button>

            {/* Navigation précédente */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                previousImage();
              }}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-sogem-orange transition-colors z-10"
            >
              <ChevronLeft size={48} />
            </button>

            {/* Navigation suivante */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-sogem-orange transition-colors z-10"
            >
              <ChevronRight size={48} />
            </button>

            {/* Image */}
            <div className="max-w-7xl max-h-full w-full h-full flex items-center justify-center">
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* Titre de l'image */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
              <h3 className="text-white font-bold text-2xl mb-2">{images[selectedImage].title}</h3>
              <p className="text-white/80">
                {selectedImage + 1} / {images.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
