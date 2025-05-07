'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Globe, MapPin, Users, BarChart, Mail, Phone, Clock, Languages, DollarSign, MusicIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// Dynamic import for the map component to avoid SSR issues
const CountryMap = dynamic(() => import('@/components/country-map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-muted animate-pulse rounded-xl flex items-center justify-center">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
});

export default function CountryDetail({ country, borders }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Format large numbers with commas
  const formatNumber = (num) => {
    return num ? new Intl.NumberFormat().format(num) : 'N/A';
  };
  
  // Get language names
  const languages = country.languages 
    ? Object.values(country.languages)
    : [];
  
  // Get currency info
  const currencies = country.currencies
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol || ''})`)
    : [];
  
  // Format time zones
  const timezones = country.timezones || [];
  
  // Format country area
  const area = country.area 
    ? `${formatNumber(country.area)} km²`
    : 'N/A';
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  // National anthem URL - for demo purposes
  const anthemUrl = `https://upload.wikimedia.org/wikipedia/commons/1/19/United_States_Navy_Band_-_${country.name.common.replace(/ /g, '_')}.ogg`;
  const anthemExists = false; // In a real app, check if anthem exists

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pb-12"
    >
      <motion.div variants={itemVariants} className="mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </motion.div>
      
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card className="glass-card md:col-span-1 overflow-hidden">
          <div className="relative pt-[60%] rounded-t-xl overflow-hidden">
            <Image
              src={country.flags.svg || country.flags.png}
              alt={`Flag of ${country.name.common}`}
              fill
              style={{ objectFit: 'cover' }}
              priority
              className="shadow-inner"
            />
          </div>
          <CardContent className="p-6">
            <h1 className="text-3xl font-bold mb-2">{country.name.common}</h1>
            <p className="text-muted-foreground mb-4">{country.name.official}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="secondary">
                {country.region}
              </Badge>
              {country.subregion && (
                <Badge variant="outline">
                  {country.subregion}
                </Badge>
              )}
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Capital</p>
                  <p>{country.capital ? country.capital.join(', ') : 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Population</p>
                  <p>{formatNumber(country.population)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Globe className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Region</p>
                  <p>{country.region} - {country.subregion || 'N/A'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card md:col-span-2">
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="media">Media</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <BarChart className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Area</p>
                          <p>{area}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Globe className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Top Level Domain</p>
                          <p>{country.tld ? country.tld.join(', ') : 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <DollarSign className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Currencies</p>
                          <p>{currencies.length ? currencies.join(', ') : 'N/A'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <Languages className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Languages</p>
                          <p>{languages.length ? languages.join(', ') : 'N/A'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {borders && borders.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Bordering Countries</h3>
                    <div className="flex flex-wrap gap-2">
                      {borders.map(border => (
                        <Link key={border.cca3} href={`/country/${border.cca3}`}>
                          <Badge className="cursor-pointer">
                            {border.name.common}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h3 className="text-xl font-semibold mb-4">Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {country.idd && country.idd.root && (
                      <div className="flex items-start">
                        <Phone className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Calling Code</p>
                          <p>{country.idd.root}{country.idd.suffixes ? country.idd.suffixes[0] : ''}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Postal Format</p>
                        <p>{country.postalCode ? `${country.postalCode.format} (${country.postalCode.regex})` : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="map">
                <h3 className="text-xl font-semibold mb-4">Location Map</h3>
                {country.latlng && (
                  <CountryMap 
                    latitude={country.latlng[0]} 
                    longitude={country.latlng[1]} 
                    countryName={country.name.common}
                    countryCode={country.cca3}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="details" className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <Clock className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Timezones</p>
                          <div className="max-h-32 overflow-y-auto">
                            {timezones.length ? (
                              <ul className="list-disc list-inside">
                                {timezones.map((tz, index) => (
                                  <li key={index}>{tz}</li>
                                ))}
                              </ul>
                            ) : 'N/A'}
                          </div>
                        </div>
                      </div>
                      
                      {country.car && (
                        <div className="flex items-start">
                          <div className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground">🚗</div>
                          <div>
                            <p className="font-medium">Driving Side</p>
                            <p>{country.car.side || 'N/A'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      {country.gini && Object.keys(country.gini).length > 0 && (
                        <div className="flex items-start">
                          <div className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground">📊</div>
                          <div>
                            <p className="font-medium">Gini Index</p>
                            {Object.entries(country.gini).map(([year, value]) => (
                              <p key={year}>{year}: {value}</p>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {country.unMember !== undefined && (
                        <div className="flex items-start">
                          <div className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground">🇺🇳</div>
                          <div>
                            <p className="font-medium">UN Member</p>
                            <p>{country.unMember ? 'Yes' : 'No'}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {country.demonyms && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Demonyms</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {country.demonyms.eng && (
                        <div>
                          <p className="font-medium">English</p>
                          <p>Male: {country.demonyms.eng.m}</p>
                          <p>Female: {country.demonyms.eng.f}</p>
                        </div>
                      )}
                      {country.demonyms.fra && (
                        <div>
                          <p className="font-medium">French</p>
                          <p>Male: {country.demonyms.fra.m}</p>
                          <p>Female: {country.demonyms.fra.f}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="media">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Flag</h3>
                    <div className="aspect-video relative max-w-xl mx-auto">
                      <Image
                        src={country.flags.svg || country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    {country.flags.alt && (
                      <p className="mt-4 text-center text-muted-foreground">
                        {country.flags.alt}
                      </p>
                    )}
                  </div>
                  
                  {country.coatOfArms && (country.coatOfArms.svg || country.coatOfArms.png) && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Coat of Arms</h3>
                      <div className="aspect-square relative h-64 max-w-xs mx-auto">
                        <Image
                          src={country.coatOfArms.svg || country.coatOfArms.png}
                          alt={`Coat of Arms of ${country.name.common}`}
                          fill
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* National Anthem - for demo purposes */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <h3 className="text-xl font-semibold">National Anthem</h3>
                      <MusicIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    {anthemExists ? (
                      <audio controls className="w-full">
                        <source src={anthemUrl} type="audio/ogg" />
                        Your browser does not support the audio element.
                      </audio>
                    ) : (
                      <p className="text-muted-foreground">
                        National anthem not available in our database.
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <div className="flex justify-center my-8">
          <Button asChild>
            <Link href={`/compare?country1=${country.cca3}`}>
              Compare with another country
            </Link>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}