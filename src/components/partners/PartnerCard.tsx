import React from 'react';
import Card, { CardContent, CardImage, CardTitle, CardDescription } from '../ui/Card';

export interface PartnerProps {
  name: string;
  category: string;
  description: string;
  logo: string;
  discount?: string;
}

const PartnerCard: React.FC<PartnerProps> = ({
  name,
  category,
  description,
  logo,
  discount,
}) => {
  return (
    <Card className="h-full transition-all hover:shadow-lg">
      <div className="relative p-4 bg-gray-50 flex items-center justify-center h-40">
        <img 
          src={logo} 
          alt={name} 
          className="max-h-32 max-w-full object-contain"
        />
        {discount && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            {discount}
          </div>
        )}
      </div>
      <CardContent>
        <p className="text-sm text-gray-500 mb-1">{category}</p>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default PartnerCard;