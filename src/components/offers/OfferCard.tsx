import React from 'react';
import Card, { CardContent, CardImage, CardTitle, CardDescription } from '../ui/Card';

export interface OfferProps {
  title: string;
  description: string;
  discount: string;
  imageSrc: string;
  partnerName: string;
  isNew?: boolean;
}

const OfferCard: React.FC<OfferProps> = ({
  title,
  description,
  discount,
  imageSrc,
  partnerName,
  isNew = false,
}) => {
  return (
    <Card className="h-full transition-all hover:shadow-lg">
      <div className="relative">
        <CardImage 
          src={imageSrc} 
          alt={title} 
          className="h-48"
        />
        <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          {discount}
        </div>
        {isNew && (
          <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            Nouveau
          </div>
        )}
      </div>
      <CardContent>
        <p className="text-sm text-gray-500 mb-1">{partnerName}</p>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default OfferCard;