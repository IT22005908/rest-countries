'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

export default function CountryCard({ country, animate = false }) {
  const population = new Intl.NumberFormat().format(country.population);
  const capital = country.capital ? country.capital[0] : 'N/A';
  
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  const ContentComponent = animate ? motion.div : 'div';
  const CardComponent = animate ? motion.div : 'div';
  
  return (
    <CardComponent
      variants={animate ? cardVariants : undefined}
      className="flag-card overflow-hidden rounded-xl"
    >
      <Link href={`/country/${country.cca3}`} className="block h-full">
        <Card className="border-0 shadow-none h-full overflow-hidden">
          <div className="relative pt-[60%] overflow-hidden">
            <Image
              src={country.flags.svg || country.flags.png}
              alt={`Flag of ${country.name.common}`}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300"
            />
          </div>
          
          <CardContent className="glass p-4 relative">
            <ContentComponent className="space-y-2">
              <h3 className="font-bold truncate text-lg">{country.name.common}</h3>
              
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline" className="text-xs">
                  {country.region}
                </Badge>
                
                {country.subregion && (
                  <Badge variant="outline" className="text-xs">
                    {country.subregion}
                  </Badge>
                )}
              </div>
              
              <div className="pt-2 text-sm">
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground col-span-1">Capital:</span>
                  <span className="col-span-2 truncate">{capital}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-1">
                  <span className="text-muted-foreground col-span-1">Population:</span>
                  <span className="col-span-2">{population}</span>
                </div>
              </div>
            </ContentComponent>
          </CardContent>
        </Card>
      </Link>
    </CardComponent>
  );
}