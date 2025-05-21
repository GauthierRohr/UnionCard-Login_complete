import React from 'react';

interface TestimonialProps {
  quote: string;
  author: string;
  role?: string;
  imageSrc?: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  /*
  quote,
  author,
  role,
  imageSrc,
  */
}) => {
  /*
  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <div className="mb-4">
        <svg
          className="h-8 w-8 text-blue-500 mb-2"
          fill="currentColor"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
        </svg>
        <p className="text-lg text-gray-700">{quote}</p>
      </div>
      <div className="flex items-center">
        {imageSrc && (
          <div className="flex-shrink-0 mr-3">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={imageSrc}
              alt={author}
            />
          </div>
        )}
        <div>
          <p className="font-medium text-gray-900">{author}</p>
          {role && <p className="text-sm text-gray-500">{role}</p>}
        </div>
      </div>
    </div>
  );
  */

  // Composant ne rend rien tant que c’est commenté
  return null;
};

export default Testimonial;