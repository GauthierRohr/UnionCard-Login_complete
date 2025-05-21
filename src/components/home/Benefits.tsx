import React from 'react';
import { CreditCard, Percent, ShoppingBag } from 'lucide-react';
import { Section, SectionTitle } from '../ui/Section';

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const BenefitItem: React.FC<BenefitProps> = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-xl bg-white shadow-sm border border-gray-100 transition-all hover:shadow-md text-center">
      <div className="p-3 bg-blue-50 rounded-lg inline-flex items-center justify-center text-blue-600 mb-4 mx-auto">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: "Offres de bienvenue",
      description: "Plus de x CHF offerts lors de ta première visite, pour amortir ta carte dès l’achat !"
    },
    {
      icon: <Percent className="h-6 w-6" />,
      title: "Réductions permanentes",
      description: "Des offres négociées spécialement pour les étudiants auprès de partenaires locaux."
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Carte physique",
      description: "Ton pass pour profiter de nos réductions, garde-la toujours à portée de main !"
    }
  ];

  return (
    <Section bgColor="bg-gray-50">
      <SectionTitle centered>Découvre les avantages Union :</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <BenefitItem
            key={index}
            icon={benefit.icon}
            title={benefit.title}
            description={benefit.description}
          />
        ))}
      </div>
    </Section>
  );
};

export default Benefits;