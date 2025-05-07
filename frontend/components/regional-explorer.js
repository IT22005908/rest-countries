'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const regions = [
  {
    name: 'Europe',
    description: 'Explore the rich history and diverse cultures of European nations.',
    image: 'https://images.pexels.com/photos/532263/pexels-photo-532263.jpeg?auto=compress&cs=tinysrgb&w=1600',
    color: 'from-blue-500/30 to-blue-600/30',
  },
  {
    name: 'Asia',
    description: 'Discover the vibrant traditions and stunning landscapes of Asian countries.',
    image: 'https://images.pexels.com/photos/402028/pexels-photo-402028.jpeg?auto=compress&cs=tinysrgb&w=1600',
    color: 'from-red-500/30 to-red-600/30',
  },
  {
    name: 'Africa',
    description: 'Experience the incredible diversity and natural beauty of African nations.',
    image: 'https://images.pexels.com/photos/4577793/pexels-photo-4577793.jpeg?auto=compress&cs=tinysrgb&w=1600',
    color: 'from-yellow-500/30 to-yellow-600/30',
  },
  {
    name: 'Americas',
    description: 'Journey through the vast landscapes and cultures of North and South America.',
    image: 'https://images.pexels.com/photos/1563256/pexels-photo-1563256.jpeg?auto=compress&cs=tinysrgb&w=1600',
    color: 'from-green-500/30 to-green-600/30',
  },
  {
    name: 'Oceania',
    description: 'Explore the island nations and breathtaking scenery of Oceania.',
    image: 'https://images.pexels.com/photos/421797/pexels-photo-421797.jpeg?auto=compress&cs=tinysrgb&w=1600',
    color: 'from-purple-500/30 to-purple-600/30',
  },
];

export default function RegionalExplorer() {
  const [activeRegion, setActiveRegion] = useState(regions[0]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="my-16"
    >
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Explore by Region
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Region Selector */}
        <div className="glass-card p-6 flex flex-col space-y-3">
          {regions.map((region) => (
            <Button
              key={region.name}
              variant={activeRegion.name === region.name ? "default" : "ghost"}
              className="justify-start"
              onClick={() => setActiveRegion(region)}
            >
              {region.name}
            </Button>
          ))}
        </div>

        {/* Region Preview */}
        <motion.div 
          key={activeRegion.name}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="lg:col-span-2 glass-card overflow-hidden rounded-xl"
        >
          <div className="relative h-64 w-full">
            <div className={`absolute inset-0 bg-gradient-to-br ${activeRegion.color} mix-blend-multiply`}></div>
            <Image
              src={activeRegion.image}
              alt={activeRegion.name}
              fill
              style={{ objectFit: "cover" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">{activeRegion.name}</h3>
              <p className="mb-4">{activeRegion.description}</p>
              <Button asChild>
                <Link href={`/search?region=${activeRegion.name}`}>
                  Explore {activeRegion.name}
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}