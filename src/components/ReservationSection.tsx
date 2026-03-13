import React, { useState, useMemo } from 'react';
import { Calendar, Clock, Users, MessageCircle, Projector, Fan, Snowflake, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

// Pricing data structure
const pricingData = {
  'coworking-jour': {
    label: 'Espace Coworking (Jour 8h-17h)',
    hasClimate: false,
    prices: { '1h': 1000, '3h': 1000, 'jour': 1000 }
  },
  'coworking-soir': {
    label: 'Espace Coworking (Soir 17h-22h)',
    hasClimate: false,
    prices: { '1h': 1500, '3h': 1500, 'jour': 1500 }
  },
  'bureau-prive': {
    label: 'Bureau privé',
    hasClimate: true,
    prices: {
      ventile: { '1h': 5000, '3h': 15000, 'jour': 25000 },
      climatise: { '1h': 7500, '3h': 22500, 'jour': 35000 }
    }
  },
  'salle-reunion': {
    label: 'Salle de Réunion (2-15 places)',
    hasClimate: true,
    prices: {
      ventile: { '1h': 5000, '3h': 15000, 'jour': 25000 },
      climatise: { '1h': 10000, '3h': 30000, 'jour': 40000 }
    }
  },
  'salle-formation': {
    label: 'Salle de Formation (15-50 places)',
    hasClimate: true,
    prices: {
      ventile: { '1h': 15000, '3h': 45000, 'jour': 75000 },
      climatise: { '1h': 20000, '3h': 60000, 'jour': 100000 }
    }
  },
  'salle-conference': {
    label: 'Salle de Conférence & Fête (50-120 places)',
    hasClimate: true,
    prices: {
      ventile: { '1h': 20000, '3h': 60000, 'jour': 100000 },
      climatise: { '1h': 25000, '3h': 75000, 'jour': 175000 }
    }
  }
};

const PROJECTOR_PRICE = 5000;

const ReservationSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    typeEspace: '',
    typeClimat: '',
    nombrePersonnes: '',
    date: '',
    heure: '',
    duree: '',
    notes: ''
  });
  const [addProjector, setAddProjector] = useState(false);

  const espaces = Object.entries(pricingData).map(([value, data]) => ({
    value,
    label: data.label
  }));

  const typeClimat = [
    { value: 'ventile', label: 'Ventilé', icon: Fan },
    { value: 'climatise', label: 'Climatisé', icon: Snowflake }
  ];

  const durees = [
    { value: '1h', label: '1 heure' },
    { value: '3h', label: '3 heures' },
    { value: 'jour', label: 'Journée complète' }
  ];

  const selectedSpace = formData.typeEspace ? pricingData[formData.typeEspace as keyof typeof pricingData] : null;
  const requiresClimate = selectedSpace?.hasClimate ?? false;

  // Calculate total price
  const totalPrice = useMemo(() => {
    if (!formData.typeEspace || !formData.duree) return 0;
    
    const space = pricingData[formData.typeEspace as keyof typeof pricingData];
    if (!space) return 0;

    let price = 0;
    
    if (space.hasClimate) {
      if (!formData.typeClimat) return 0;
      const climatePrices = space.prices as { ventile: Record<string, number>; climatise: Record<string, number> };
      const climateKey = formData.typeClimat as 'ventile' | 'climatise';
      price = climatePrices[climateKey]?.[formData.duree] || 0;
    } else {
      const simplePrices = space.prices as Record<string, number>;
      price = simplePrices[formData.duree] || 0;
    }

    // Add projector if selected (only for full day)
    if (addProjector) {
      price += PROJECTOR_PRICE;
    }

    return price;
  }, [formData.typeEspace, formData.duree, formData.typeClimat, addProjector]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' F CFA';
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Reset climate type when changing space if new space doesn't require it
    if (field === 'typeEspace') {
      const newSpace = pricingData[value as keyof typeof pricingData];
      if (!newSpace?.hasClimate) {
        setFormData(prev => ({ ...prev, [field]: value, typeClimat: '' }));
      }
    }
  };

  const handleWhatsAppReservation = () => {
    // Validation
    if (!formData.nom || !formData.telephone || !formData.typeEspace || !formData.date || !formData.duree) {
      toast({
        title: "Champs obligatoires manquants",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    if (requiresClimate && !formData.typeClimat) {
      toast({
        title: "Type de climatisation requis",
        description: "Veuillez choisir entre Ventilé ou Climatisé pour cet espace.",
        variant: "destructive",
      });
      return;
    }

    const espaceLabel = espaces.find(e => e.value === formData.typeEspace)?.label || formData.typeEspace;
    const climatLabel = typeClimat.find(c => c.value === formData.typeClimat)?.label || '';
    const dureeLabel = durees.find(d => d.value === formData.duree)?.label || formData.duree;
    
    const message = `Bonjour, je souhaite réserver un espace chez SOGEM PALACE :

📋 *DÉTAILS DE MA RÉSERVATION :*
━━━━━━━━━━━━━━━━━━━━━
👤 *Nom :* ${formData.nom}
📞 *Téléphone :* ${formData.telephone}
🏢 *Type d'espace :* ${espaceLabel}
${requiresClimate ? `🌡️ *Climatisation :* ${climatLabel}` : ''}
👥 *Nombre de personnes :* ${formData.nombrePersonnes || 'Non spécifié'}
📅 *Date :* ${formData.date}
⏰ *Heure :* ${formData.heure || 'À convenir'}
⏱️ *Durée :* ${dureeLabel}
${addProjector ? '📽️ *Option :* Vidéo projecteur inclus' : ''}
${formData.notes ? `📝 *Notes :* ${formData.notes}` : ''}
━━━━━━━━━━━━━━━━━━━━━
💰 *MONTANT TOTAL ESTIMÉ : ${formatPrice(totalPrice)}*

Merci de me confirmer la disponibilité.`;

    const whatsappUrl = `https://wa.me/2290195957142?text=${encodeURIComponent(message)}`;
    
    // Show success toast with amount
    toast({
      title: "Réservation prête !",
      description: `Montant total : ${formatPrice(totalPrice)}. Vous allez être redirigé vers WhatsApp.`,
    });

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 500);
  };

  return (
    <section id="reservation" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Réservation</h2>
            <p className="text-xl text-muted-foreground">
              Réservez votre espace en quelques clics via WhatsApp
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire */}
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-sogem-gold text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Calendar className="mr-3" size={24} />
                  Formulaire de réservation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* Informations personnelles */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground border-b pb-2">Vos informations</h3>
                  
                  <div>
                    <Label htmlFor="nom" className="text-sm font-medium text-foreground">
                      Nom complet *
                    </Label>
                    <Input
                      id="nom"
                      type="text"
                      placeholder="Votre nom et prénom"
                      value={formData.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telephone" className="text-sm font-medium text-foreground">
                      Téléphone *
                    </Label>
                    <Input
                      id="telephone"
                      type="tel"
                      inputMode="tel"
                      placeholder="+229 XX XX XX XX"
                      value={formData.telephone}
                      onChange={(e) => {
                        // Only allow numbers, +, and spaces
                        const value = e.target.value.replace(/[^\d+\s]/g, '');
                        handleInputChange('telephone', value);
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>

                {/* Détails de la réservation */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground border-b pb-2">Détails de votre réservation</h3>
                  
                  <div>
                    <Label htmlFor="typeEspace" className="text-sm font-medium text-foreground">
                      Type d'espace souhaité *
                    </Label>
                    <Select value={formData.typeEspace} onValueChange={(value) => handleInputChange('typeEspace', value)}>
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Sélectionnez un espace" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        {espaces.map((espace) => (
                          <SelectItem key={espace.value} value={espace.value} className="text-sm">
                            {espace.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Climate selection - only show if required */}
                  {requiresClimate && (
                    <div>
                      <Label className="text-sm font-medium text-foreground">
                        Type de climatisation *
                      </Label>
                      <div className="grid grid-cols-2 gap-3 mt-2">
                        {typeClimat.map((type) => {
                          const IconComponent = type.icon;
                          const isSelected = formData.typeClimat === type.value;
                          return (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => handleInputChange('typeClimat', type.value)}
                              className={`flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
                                isSelected 
                                  ? type.value === 'climatise' 
                                    ? 'border-sogem-gold bg-sogem-gold/10 text-sogem-gold' 
                                    : 'border-sogem-orange bg-sogem-orange/10 text-sogem-orange'
                                  : 'border-border hover:border-muted-foreground'
                              }`}
                            >
                              <IconComponent className="w-5 h-5" />
                              <span className="font-medium">{type.label}</span>
                              {isSelected && <Check className="w-4 h-4" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="duree" className="text-sm font-medium text-foreground">
                      Durée souhaitée *
                    </Label>
                    <Select value={formData.duree} onValueChange={(value) => handleInputChange('duree', value)}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Choisir la durée" />
                      </SelectTrigger>
                      <SelectContent>
                        {durees.map((duree) => (
                          <SelectItem key={duree.value} value={duree.value}>
                            {duree.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nombrePersonnes" className="text-sm font-medium text-foreground">
                        Nombre de personnes
                      </Label>
                      <Input
                        id="nombrePersonnes"
                        type="number"
                        placeholder="Ex: 5"
                        min="1"
                        value={formData.nombrePersonnes}
                        onChange={(e) => handleInputChange('nombrePersonnes', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="date" className="text-sm font-medium text-foreground">
                        Date souhaitée *
                      </Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="heure" className="text-sm font-medium text-foreground">
                      Heure souhaitée
                    </Label>
                    <Input
                      id="heure"
                      type="time"
                      value={formData.heure}
                      onChange={(e) => handleInputChange('heure', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Projector option */}
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-sogem-gold rounded-lg flex items-center justify-center">
                          <Projector className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Vidéo projecteur</p>
                          <p className="text-sm text-muted-foreground">+5 000 F CFA / jour</p>
                        </div>
                      </div>
                      <Switch
                        checked={addProjector}
                        onCheckedChange={setAddProjector}
                        className="data-[state=checked]:bg-sogem-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="text-sm font-medium text-foreground">
                      Notes ou demandes spéciales
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Précisez vos besoins spécifiques..."
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Total Price Display - Responsive for mobile */}
                {totalPrice > 0 && (
                  <div className="bg-sogem-gold/10 border-2 border-sogem-gold rounded-lg p-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-base sm:text-lg font-medium text-foreground">Montant total estimé</span>
                      <span className="text-xl sm:text-2xl font-bold text-sogem-gold">{formatPrice(totalPrice)}</span>
                    </div>
                    {addProjector && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Inclut le vidéo projecteur (+5 000 F)
                      </p>
                    )}
                  </div>
                )}

                {/* Bouton de réservation - Responsive for mobile */}
                <Button
                  onClick={handleWhatsAppReservation}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex flex-col sm:flex-row items-center justify-center gap-2"
                  size="lg"
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    <span>Réserver Maintenant</span>
                  </div>
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  *Champs obligatoires. En cliquant, vous serez redirigé vers notre support Whatsapp pour confirmation et validation.
                </p>
              </CardContent>
            </Card>

            {/* Informations complémentaires */}
            <div className="space-y-8">
              {/* Horaires */}
              <Card className="shadow-lg">
                <CardHeader className="bg-muted">
                  <CardTitle className="flex items-center text-foreground">
                    <Clock className="mr-2" size={20} />
                    Horaires d'ouverture
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Lundi - Dimanche</span>
                      <span className="text-sogem-gold font-semibold">8h - 22h</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>• Coworking jour : 8h - 17h</p>
                      <p>• Coworking soir : 17h - 22h</p>
                      <p>• Salles de réunion : sur réservation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Processus de réservation */}
              <Card className="shadow-lg">
                <CardHeader className="bg-muted">
                  <CardTitle className="flex items-center text-foreground">
                    <Users className="mr-2" size={20} />
                    Comment ça marche ?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-sogem-gold text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <h4 className="font-medium text-foreground">Remplissez le formulaire</h4>
                        <p className="text-sm text-muted-foreground">Indiquez vos besoins et préférences</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-sogem-gold text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <h4 className="font-medium text-foreground">Envoi via WhatsApp</h4>
                        <p className="text-sm text-muted-foreground">Votre demande nous parvient instantanément</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-sogem-gold text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <h4 className="font-medium text-foreground">Confirmation rapide</h4>
                        <p className="text-sm text-muted-foreground">Nous confirmons la disponibilité sous 30 minutes</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact direct */}
              <Card className="shadow-lg border-sogem-gold border-2">
                <CardContent className="p-6 text-center">
                  <h3 className="font-bold text-foreground mb-4">Besoin d'aide ?</h3>
                  <p className="text-muted-foreground mb-4">Contactez-nous directement</p>
                  <Button 
                    onClick={() => window.open('https://wa.me/2290195957142', '_blank')}
                    className="w-full bg-green-600 hover:bg-green-700 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <MessageCircle className="mr-2" size={16} />
                    WhatsApp : +229 01 95 95 71 42
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationSection;
