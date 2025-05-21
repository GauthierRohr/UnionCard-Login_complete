import React, { useEffect } from 'react';
import { Section, SectionTitle } from '../components/ui/Section';
import PartnerCard, { PartnerProps } from '../components/partners/PartnerCard';

const Partners: React.FC = () => {
  useEffect(() => {
    document.title = 'Partenaires | Union';
  }, []);

  const partners: PartnerProps[] = [
    {
      name: "Swiss Coffee",
      category: "Café & Restaurant",
      description: "Chaîne de cafés proposant des boissons de qualité et des pâtisseries maison.",
      logo: "https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=1600",
      discount: "-20%"
    },
    {
      name: "BookShop",
      category: "Librairie",
      description: "Librairie indépendante spécialisée dans les livres universitaires et la littérature.",
      logo: "https://images.pexels.com/photos/904620/pexels-photo-904620.jpeg?auto=compress&cs=tinysrgb&w=1600",
      discount: "-15%"
    },
    {
      name: "Urban Fitness",
      category: "Sport & Bien-être",
      description: "Réseau de salles de sport modernes avec équipements de pointe et cours collectifs.",
      logo: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1600",
      discount: "-25%"
    },
    {
      name: "Tech Store",
      category: "Technologie",
      description: "Magasin d'électronique proposant des produits tech et des accessoires innovants.",
      logo: "https://images.pexels.com/photos/792199/pexels-photo-792199.jpeg?auto=compress&cs=tinysrgb&w=1600",
      discount: "-10%"
    },
    {
      name: "Mountain Wear",
      category: "Mode & Vêtements",
      description: "Marque spécialisée dans les vêtements outdoor et équipements de montagne.",
      logo: "https://images.pexels.com/photos/2422476/pexels-photo-2422476.jpeg?auto=compress&cs=tinysrgb&w=1600",
      discount: "-15%"
    },
    {
      name: "Organic Market",
      category: "Alimentation",
      description: "Épicerie proposant des produits bio, locaux et respectueux de l'environnement.",
      logo: "https://images.pexels.com/photos/3996505/pexels-photo-3996505.jpeg?auto=compress&cs=tinysrgb&w=1600",
      discount: "-10%"
    },
    {
      name: "Study Space",
      category: "Coworking",
      description: "Espaces de travail calmes et confortables pour étudier ou travailler en groupe.",
      logo: "https://images.pexels.com/photos/7070/space-desk-workspace-coworking.jpg?auto=compress&cs=tinysrgb&w=1600",
      discount: "-30%"
    },
    {
      name: "Cinema Central",
      category: "Divertissement",
      description: "Chaîne de cinémas proposant les dernières sorties et des soirées étudiantes.",
      logo: "https://images.pexels.com/photos/275977/pexels-photo-275977.jpeg?auto=compress&cs=tinysrgb&w=1600",
      discount: "-20%"
    },
    {
      name: "Bistro Lausanne",
      category: "Restaurant",
      description: "Restaurant convivial proposant une cuisine de qualité à prix abordable.",
      logo: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=1600",
      discount: "-15%"
    }
  ];

  return (
    <div>
      <Section className="pt-24">
        <SectionTitle 
          centered
          subtitle="Découvre nos partenaires qui offrent des réductions exclusives aux membres Union."
        >
          Nos partenaires
        </SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <PartnerCard key={index} {...partner} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Partners;