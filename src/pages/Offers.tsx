import React, { useEffect } from 'react';
import { Section, SectionTitle } from '../components/ui/Section';
import OfferCard, { OfferProps } from '../components/offers/OfferCard';

const Offers: React.FC = () => {
  useEffect(() => {
    document.title = 'Offres | Union';
  }, []);

  const welcomeOffers: OfferProps[] = [
    {
      title: "Café offert",
      description: "Un café gratuit à l'achat d'une pâtisserie",
      discount: "GRATUIT",
      imageSrc: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=1600",
      partnerName: "Swiss Coffee",
      isNew: true
    },
    {
      title: "Livre de poche",
      description: "Un livre de poche gratuit pour toute inscription à notre newsletter",
      discount: "GRATUIT",
      imageSrc: "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=1600",
      partnerName: "BookShop"
    },
    {
      title: "Séance d'essai",
      description: "Une séance d'entraînement gratuite dans notre salle de sport",
      discount: "GRATUIT",
      imageSrc: "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=1600",
      partnerName: "Urban Fitness"
    }
  ];

  const permanentOffers: OfferProps[] = [
    {
      title: "Réduction sur les cafés",
      description: "Économise sur tous tes cafés, tous les jours",
      discount: "-20%",
      imageSrc: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=1600",
      partnerName: "Swiss Coffee"
    },
    {
      title: "Livres universitaires",
      description: "Réduction sur tous les livres académiques et universitaires",
      discount: "-15%",
      imageSrc: "https://images.pexels.com/photos/2908984/pexels-photo-2908984.jpeg?auto=compress&cs=tinysrgb&w=1600",
      partnerName: "BookShop"
    },
    {
      title: "Abonnement mensuel",
      description: "Réduction sur l'abonnement mensuel sans engagement",
      discount: "-25%",
      imageSrc: "https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg?auto=compress&cs=tinysrgb&w=1600",
      partnerName: "Urban Fitness"
    },
    {
      title: "Accessoires tech",
      description: "Réduction sur tous les accessoires pour smartphones et ordinateurs",
      discount: "-10%",
      imageSrc: "https://images.pexels.com/photos/1337753/pexels-photo-1337753.jpeg?auto=compress&cs=tinysrgb&w=1600",
      partnerName: "Tech Store",
      isNew: true
    },
    {
      title: "Vêtements outdoor",
      description: "Réduction sur la collection de vêtements outdoor",
      discount: "-15%",
      imageSrc: "https://images.pexels.com/photos/2897531/pexels-photo-2897531.jpeg?auto=compress&cs=tinysrgb&w=1600",
      partnerName: "Mountain Wear"
    },
    {
      title: "Produits bio",
      description: "Réduction sur tous les produits bio et locaux",
      discount: "-10%",
      imageSrc: "https://images.pexels.com/photos/3758755/pexels-photo-3758755.jpeg?auto=compress&cs=tinysrgb&w=1600",
      partnerName: "Organic Market"
    }
  ];

  return (
    <div>
      <Section className="pt-24">
        <SectionTitle centered>
          Profite d'offres exclusives avec ta carte Union
        </SectionTitle>
        
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-blue-600">Offres de bienvenue</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {welcomeOffers.map((offer, index) => (
              <OfferCard key={index} {...offer} />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-blue-600">Réductions permanentes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {permanentOffers.map((offer, index) => (
              <OfferCard key={index} {...offer} />
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default Offers;