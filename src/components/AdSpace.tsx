import { motion } from 'motion/react';
import { useAds } from '../lib/hooks';

interface AdSpaceProps {
  format?: 'horizontal' | 'vertical' | 'square' | 'in-article';
  location?: string;
  className?: string;
}

export function AdSpace({ format = 'horizontal', location, className = '' }: AdSpaceProps) {
  const { ads, loading } = useAds(location, format);
  
  const dimensions = {
    horizontal: 'w-full h-24 md:h-32',
    vertical: 'w-full md:w-64 h-full min-h-[300px]',
    square: 'w-full aspect-square',
    'in-article': 'w-full md:w-3/4 mx-auto h-32 my-8',
  };

  if (!loading && ads.length > 0) {
    const ad = ads[0]; // Select the first matched ad
    return (
      <a href={ad.targetUrl} target="_blank" rel="noopener noreferrer" className={`block overflow-hidden relative group z-20 ${dimensions[format]} ${className}`}>
        <img src={ad.imageUrl} alt={ad.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        <span className="absolute top-0 right-0 bg-black/50 text-white text-[8px] uppercase px-1 m-1 rounded-sm backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">Publicité</span>
      </a>
    );
  }

  return (
    <div className={`bg-gray-50 border border-gray-200 flex flex-col items-center justify-center text-gray-400 overflow-hidden relative group z-20 ${dimensions[format]} ${className}`}>
      <span className="text-xs uppercase tracking-widest font-bold mb-2 z-10 relative">Espace Publicitaire</span>
      <span className="text-[10px] uppercase z-10 relative">Présentez votre activité</span>
      <div className="absolute inset-0 bg-brand-red/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}
