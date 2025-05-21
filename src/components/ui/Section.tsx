import React from 'react';

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  bgColor?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  id, 
  children, 
  className = '', 
  bgColor = 'bg-white'
}) => {
  return (
    <section id={id} className={`py-16 ${bgColor} ${className}`}>
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
};

interface SectionTitleProps {
  children: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  subtitle,
  centered = false,
  className = '',
}) => {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        {children}
      </h2>
      {subtitle && <p className="text-lg text-gray-600 max-w-3xl">{subtitle}</p>}
    </div>
  );
};