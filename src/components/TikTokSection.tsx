import React, { useEffect } from 'react';

const TikTokSection = () => {
  useEffect(() => {
    // Charger le script TikTok s'il n'est pas déjà présent
    const existingScript = document.querySelector('script[src="https://www.tiktok.com/embed.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Découvrez SOGEM PALACE</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Suivez-nous sur nos réseaux sociaux pour découvrir nos espaces en action
          </p>
        </div>

        {/* TikTok Embed */}
        <div className="flex justify-center">
          <blockquote 
            className="tiktok-embed" 
            cite="https://www.tiktok.com/@sogem.palace/video/7552254138176867596" 
            data-video-id="7552254138176867596" 
            style={{ maxWidth: '605px', minWidth: '325px' }}
          > 
            <section> 
              <a 
                target="_blank" 
                title="@sogem.palace" 
                href="https://www.tiktok.com/@sogem.palace?refer=embed"
                rel="noopener noreferrer"
              >
                @sogem.palace
              </a> 
              <a 
                title="salledeconference" 
                target="_blank" 
                href="https://www.tiktok.com/tag/salledeconference?refer=embed"
                rel="noopener noreferrer"
              >
                #salledeconference
              </a> 
              <a 
                title="masterclass" 
                target="_blank" 
                href="https://www.tiktok.com/tag/masterclass?refer=embed"
                rel="noopener noreferrer"
              >
                #masterclass
              </a> 
              <a 
                title="rencontre" 
                target="_blank" 
                href="https://www.tiktok.com/tag/rencontre?refer=embed"
                rel="noopener noreferrer"
              >
                #rencontre
              </a> 
              <a 
                title="coworking" 
                target="_blank" 
                href="https://www.tiktok.com/tag/coworking?refer=embed"
                rel="noopener noreferrer"
              >
                #coworking
              </a> 
              <a 
                title="espace" 
                target="_blank" 
                href="https://www.tiktok.com/tag/espace?refer=embed"
                rel="noopener noreferrer"
              >
                #espace
              </a> 
              <a 
                target="_blank" 
                title="♬ son original - SOGEM PALACE" 
                href="https://www.tiktok.com/music/son-original-7552254155898538763?refer=embed"
                rel="noopener noreferrer"
              >
                ♬ son original - SOGEM PALACE
              </a> 
            </section> 
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default TikTokSection;