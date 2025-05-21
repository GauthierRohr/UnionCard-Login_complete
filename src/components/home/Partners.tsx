import React from 'react';
import { Link } from 'react-router-dom';
import { Section, SectionTitle } from '../ui/Section';
import Button from '../ui/Button';

const Partners: React.FC = () => {
  const partners = [
    { name: 'Swiss Coffee', logo: 'https://images.pexels.com/photos/1251175/pexels-photo-1251175.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    { name: 'BookShop', logo: 'https://images.pexels.com/photos/904620/pexels-photo-904620.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    { name: 'Urban Fitness', logo: 'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    { name: 'Tech Store', logo: 'https://images.pexels.com/photos/792199/pexels-photo-792199.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    { name: 'Mountain Wear', logo: 'https://images.pexels.com/photos/2422476/pexels-photo-2422476.jpeg?auto=compress&cs=tinysrgb&w=1600' },
    { name: 'Organic Market', logo: 'https://images.pexels.com/photos/3996505/pexels-photo-3996505.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  ];

  return (
    <Section>
      <SectionTitle 
        centered
        //subtitle="Nous avons déjà plus de X partenaires prêts à offrir des réductions aux membres Union."
      >
        Ils sont sur ta carte Union :
      </SectionTitle>
      
      <div className="overflow-x-auto whitespace-nowrap mb-12">
        <div className="flex gap-6 animate-scroll">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="flex-shrink-0 w-40 h-40 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center p-4 border border-gray-200 transition-all hover:shadow-md"
            >
              <img 
                src={partner.logo} 
                alt={partner.name} 
                className="h-full w-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-center">
        <Link to="/partners">
          <Button variant="outline" size="lg">
            Voir tous nos partenaires
          </Button>
        </Link>
      </div>
    </Section>
  );
};

export default Partners;