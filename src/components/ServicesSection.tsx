import React, { useState } from 'react';
import { Crown, Wifi, Car, Zap, MessageSquare, MonitorCheck, HardDrive, Fan, Snowflake, Users, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

const ServicesSection = () => {
  const [isClimatise, setIsClimatise] = useState(false);

  const services = [
    {
      id: 'coworking',
      title: "Espace Coworking",
      subtitle: "Espace Ouvert",
      description: "L'énergie d'une communauté pour booster votre productivité au quotidien.",
      image: "/lovable-uploads/coworking-espace.jpeg",
      hasClimateOption: false,
      pricing: {
        heure: { jour: "1 000F", jourLabel: "(08h-17h)", soir: "1 500F", soirLabel: "(17h-22h)" },
        semaine: { jour: "5 000F", soir: "7 500F" },
        mois: { jour: "25 000F", soir: "30 000F" }
      }
    },
    {
      id: 'bureau-prive',
      title: "Bureaux Privés",
      subtitle: "Cadre confidentiel",
      description: "Un cadre calme et confidentiel pour vos rendez-vous d'affaires.",
      image: "/lovable-uploads/location-bureau-prive-sogem-palace.jpeg",
      hasClimateOption: true,
      pricing: {
        ventile: { heure: "5 000F", jour: "25 000F" },
        climatise: { heure: "7 500F", jour: "35 000F" },
        negociation: "Semaine & Mois"
      }
    },
    {
      id: 'salle-reunion',
      title: "Salle de Réunion",
      subtitle: "2 à 15 places",
      description: "Parfaite pour les petits comités, entretiens ou ateliers restreints.",
      image: "/lovable-uploads/salle-reunion.jpeg",
      hasClimateOption: true,
      capacity: "2 à 15 places",
      pricing: {
        ventile: { heure: "5 000F", jour: "25 000F", semaine: "100 000F" },
        climatise: { heure: "10 000F", jour: "40 000F", semaine: "200 000F" },
        negociation: "Mois"
      }
    },
    {
      id: 'salle-formation',
      title: "Salle de Formation",
      subtitle: "15 à 50 places",
      description: "Un environnement spacieux pour vos séminaires et présentations collectives.",
      image: "/lovable-uploads/salle-de-conference-services.jpeg",
      hasClimateOption: true,
      capacity: "15 à 50 places",
      pricing: {
        ventile: { heure: "15 000F", jour: "75 000F" },
        climatise: { heure: "20 000F", jour: "100 000F" },
        negociation: "Semaine & Mois"
      }
    },
    {
      id: 'salle-conference',
      title: "Salle de Conférence & Fête",
      subtitle: "50 à 120 places",
      description: "Le plus grand espace pour vos conférences, mariages ou ateliers de masse.",
      image: "/lovable-uploads/sogempalace-salle-de-fetes.jpeg",
      hasClimateOption: true,
      capacity: "50 à 120 places",
      pricing: {
        ventile: { heure: "20 000F", jour: "100 000F" },
        climatise: { heure: "25 000F", jour: "175 000F" },
        negociation: "Semaine & Mois"
      }
    }
  ];

  const amenities = [
    { name: "Wi-Fi haut débit", icon: Wifi },
    { name: "Projecteur", icon: HardDrive, extra: "+5 000F/jour" },
    { name: "Secrétariat disponible", icon: MessageSquare },
    { name: "Parking gratuit", icon: Car },
    { name: "Tableau blanc", icon: MonitorCheck },
    { name: "Groupe électrogène", icon: Zap }
  ];

  const scrollToReservation = () => {
    const element = document.getElementById('reservation');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderPricing = (service: typeof services[0]) => {
    if (!service.hasClimateOption) {
      // Coworking pricing
      const p = service.pricing as {
        heure: { jour: string; jourLabel: string; soir: string; soirLabel: string };
        semaine: { jour: string; soir: string };
        mois: { jour: string; soir: string };
      };
      return (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-muted-foreground text-xs mb-1">Heure/Jour</p>
              <p className="font-bold text-sogem-gold">{p.heure.jour}</p>
              <p className="text-xs text-muted-foreground">{p.heure.jourLabel}</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-muted-foreground text-xs mb-1">Heure/Soir</p>
              <p className="font-bold text-sogem-gold">{p.heure.soir}</p>
              <p className="text-xs text-muted-foreground">{p.heure.soirLabel}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-muted-foreground text-xs mb-1">Forfait Semaine</p>
              <p className="font-semibold text-foreground">{p.semaine.jour} <span className="text-muted-foreground font-normal">(Jour)</span></p>
              <p className="font-semibold text-foreground">{p.semaine.soir} <span className="text-muted-foreground font-normal">(Soir)</span></p>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <p className="text-muted-foreground text-xs mb-1">Abonnement Mois</p>
              <p className="font-semibold text-foreground">{p.mois.jour} <span className="text-muted-foreground font-normal">(Jour)</span></p>
              <p className="font-semibold text-foreground">{p.mois.soir} <span className="text-muted-foreground font-normal">(Soir)</span></p>
            </div>
          </div>
        </div>
      );
    }

    // Climate-based pricing
    const p = service.pricing as {
      ventile: { heure: string; jour: string; semaine?: string };
      climatise: { heure: string; jour: string; semaine?: string };
      negociation: string;
    };
    const currentPricing = isClimatise ? p.climatise : p.ventile;

    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-muted-foreground text-xs mb-1">Par heure</p>
            <p className="font-bold text-sogem-gold text-lg">{currentPricing.heure}</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <p className="text-muted-foreground text-xs mb-1">Par jour</p>
            <p className="font-bold text-sogem-gold text-lg">{currentPricing.jour}</p>
          </div>
        </div>
        {currentPricing.semaine && (
          <div className="bg-muted/50 rounded-lg p-3 text-sm">
            <p className="text-muted-foreground text-xs mb-1">Par semaine</p>
            <p className="font-bold text-sogem-gold">{currentPricing.semaine}</p>
          </div>
        )}
        <p className="text-xs text-muted-foreground italic">
          {p.negociation} : Sur négociation
        </p>
      </div>
    );
  };

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Espaces de Travail & Événements</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Des Solutions Flexibles pour Freelances, Entreprises et Organisateurs d'événements à Abomey-Calavi.
          </p>

          {/* Switch Ventilé / Climatisé */}
          <div className="inline-flex items-center gap-4 bg-card rounded-full px-6 py-3 shadow-lg border">
            <div className={`flex items-center gap-2 transition-opacity ${!isClimatise ? 'opacity-100' : 'opacity-50'}`}>
              <Fan className="w-5 h-5 text-sogem-orange" />
              <span className="font-medium text-foreground">Ventilé</span>
            </div>
            <Switch
              checked={isClimatise}
              onCheckedChange={setIsClimatise}
              className="data-[state=checked]:bg-sogem-gold data-[state=unchecked]:bg-sogem-orange"
            />
            <div className={`flex items-center gap-2 transition-opacity ${isClimatise ? 'opacity-100' : 'opacity-50'}`}>
              <Snowflake className="w-5 h-5 text-sogem-gold" />
              <span className="font-medium text-foreground">Climatisé</span>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={service.id} 
              className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-card overflow-hidden group"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/400x300/f0f0f0/333333?text=SOGEM+PALACE";
                  }} 
                />
                {service.hasClimateOption && (
                  <Badge 
                    className={`absolute top-3 right-3 ${isClimatise ? 'bg-sogem-gold' : 'bg-sogem-orange'} text-white`}
                  >
                    {isClimatise ? <Snowflake className="w-3 h-3 mr-1" /> : <Fan className="w-3 h-3 mr-1" />}
                    {isClimatise ? 'Climatisé' : 'Ventilé'}
                  </Badge>
                )}
                {service.capacity && (
                  <Badge className="absolute top-3 left-3 bg-foreground/80 text-background">
                    <Users className="w-3 h-3 mr-1" />
                    {service.capacity}
                  </Badge>
                )}
              </div>

              <CardHeader className="pb-2">
                <div className="w-10 h-10 bg-sogem-gold rounded-lg flex items-center justify-center mb-3">
                  <Crown className="text-white" size={20} />
                </div>
                <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                <p className="text-sm text-sogem-orange font-medium">{service.subtitle}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{service.description}</p>
                
                {renderPricing(service)}

                <button 
                  onClick={scrollToReservation}
                  className="w-full bg-sogem-orange hover:bg-sogem-orange/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                >
                  Réserver
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Équipements inclus */}
        <div className="bg-card rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center text-foreground mb-8">Équipements & Services Disponibles</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenities.map((amenity, index) => {
              const IconComponent = amenity.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-sogem-gold rounded-full flex items-center justify-center mx-auto mb-3 transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="text-white" size={28} />
                  </div>
                  <p className="text-sm font-medium text-foreground">{amenity.name}</p>
                  {amenity.extra && (
                    <p className="text-xs text-sogem-orange font-semibold mt-1">{amenity.extra}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
