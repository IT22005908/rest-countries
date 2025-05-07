'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, ArrowRight } from 'lucide-react';
import { getAllCountries } from '@/lib/countries-api';

export default function HeroSection() {
  const [featuredFlags, setFeaturedFlags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedFlags = async () => {
      try {
        const data = await getAllCountries();
        // Get 5 random countries for the featured flags
        const randomFlags = [...data]
          .sort(() => 0.5 - Math.random())
          .slice(0, 5)
          .map(country => ({
            code: country.cca3,
            name: country.name.common,
            flag: country.flags.svg
          }));
        
        setFeaturedFlags(randomFlags);
      } catch (error) {
        console.error('Error fetching featured flags:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedFlags();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const flagVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-8 pb-16 text-center"
    >
      <motion.h1 
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
      >
        Explore the World with <span className="text-primary">Flagify</span>
      </motion.h1>
      
      <motion.p 
        variants={itemVariants}
        className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
      >
        Discover countries, cultures, and flags from around the globe. 
        Compare nations, learn about geography, and explore the diverse world we live in.
      </motion.p>
      
      <motion.div 
        variants={itemVariants}
        className="flex flex-wrap justify-center gap-4 mb-12"
      >
        <Button asChild size="lg">
          <Link href="/search">
            <Search className="mr-2 h-5 w-5" />
            Explore Countries
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/compare">
            Compare Countries
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="relative h-24 sm:h-32 md:h-40 mb-8"
      >
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-4 md:gap-8">
          {isLoading ? (
            <div className="flex justify-center items-center space-x-4">
              {[...Array(5)].map((_, index) => (
                <div 
                  key={index} 
                  className="w-16 h-10 md:w-24 md:h-16 bg-muted animate-pulse rounded"
                ></div>
              ))}
            </div>
          ) : (
            featuredFlags.map((country, index) => (
              <motion.div
                key={country.code}
                variants={flagVariants}
                className="relative w-16 h-10 md:w-24 md:h-16 overflow-hidden rounded-md shadow-lg transform transition-all duration-300 hover:scale-110 hover:z-10"
                style={{
                  zIndex: index,
                  transform: `rotate(${index % 2 === 0 ? -5 : 5}deg)`
                }}
              >
                <Link href={`/country/${country.code}`}>
                  <Image
                    src={country.flag}
                    alt={`Flag of ${country.name}`}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
      
      <motion.p 
        variants={itemVariants}
        className="text-sm text-muted-foreground"
      >
        Featuring {featuredFlags.length > 0 ? featuredFlags.map(f => f.name).join(', ') : 'countries'} and many more
      </motion.p>
    </motion.div>
  );
}