'use client';

import { useState, useEffect } from 'react';
import { getAllCountries } from '@/lib/countries-api';
import CountryCard from '@/components/country-card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FeaturedCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const allCountries = await getAllCountries();
        
        // Sort by population to get popular countries
        const popularCountries = [...allCountries]
          .sort((a, b) => b.population - a.population)
          .slice(0, 8);
        
        setCountries(popularCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === Math.max(0, countries.length - 4) ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, countries.length - 4) : prevIndex - 1
    );
  };

  // Calculate the items to display in the current slide
  const visibleCountries = countries.slice(activeIndex, activeIndex + 4);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="my-16"
    >
      <div className="flex items-center justify-between mb-6">
        <motion.h2 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold"
        >
          Featured Countries
        </motion.h2>
        
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevSlide}
            disabled={loading || countries.length <= 4}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextSlide}
            disabled={loading || countries.length <= 4}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div 
                key={index} 
                className="rounded-xl bg-muted h-72 animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -200px 0px" }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {visibleCountries.map((country) => (
              <CountryCard 
                key={country.cca3} 
                country={country}
                animate
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  );
}