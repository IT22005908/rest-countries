'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { BarChart, PieChart, ResponsiveContainer, Bar, Pie, Cell, Tooltip, Legend, XAxis, YAxis } from 'recharts';
import { motion } from 'framer-motion';

function formatNumber(num) {
  return new Intl.NumberFormat().format(num);
}

export default function CountryComparison({ country1, country2 }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Format data for population chart
  const populationData = [
    { name: country1.name.common, value: country1.population },
    { name: country2.name.common, value: country2.population },
  ];

  // Format data for area chart
  const areaData = [
    { name: country1.name.common, value: country1.area },
    { name: country2.name.common, value: country2.area },
  ];

  // Colors for charts
  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-card overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Country Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="text-center">
              <Link href={`/country/${country1.cca3}`} className="block">
                <div className="relative h-32 w-full overflow-hidden rounded-lg mb-4">
                  <Image
                    src={country1.flags.svg || country1.flags.png}
                    alt={`Flag of ${country1.name.common}`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h3 className="text-xl font-bold">{country1.name.common}</h3>
                <p className="text-muted-foreground">{country1.region} - {country1.subregion || ''}</p>
              </Link>
            </div>
            
            <div className="text-center">
              <Link href={`/country/${country2.cca3}`} className="block">
                <div className="relative h-32 w-full overflow-hidden rounded-lg mb-4">
                  <Image
                    src={country2.flags.svg || country2.flags.png}
                    alt={`Flag of ${country2.name.common}`}
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <h3 className="text-xl font-bold">{country2.name.common}</h3>
                <p className="text-muted-foreground">{country2.region} - {country2.subregion || ''}</p>
              </Link>
            </div>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="data">Data</TabsTrigger>
              <TabsTrigger value="charts">Charts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Basic Information</h4>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Capital</div>
                    <div>{country1.capital ? country1.capital[0] : 'N/A'}</div>
                    <div>{country2.capital ? country2.capital[0] : 'N/A'}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Population</div>
                    <div>{formatNumber(country1.population)}</div>
                    <div>{formatNumber(country2.population)}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Area</div>
                    <div>{formatNumber(country1.area)} km²</div>
                    <div>{formatNumber(country2.area)} km²</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Region</div>
                    <div>{country1.region}</div>
                    <div>{country2.region}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Subregion</div>
                    <div>{country1.subregion || 'N/A'}</div>
                    <div>{country2.subregion || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Additional Details</h4>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Currencies</div>
                    <div>{country1.currencies ? Object.keys(country1.currencies).join(', ') : 'N/A'}</div>
                    <div>{country2.currencies ? Object.keys(country2.currencies).join(', ') : 'N/A'}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Languages</div>
                    <div>{country1.languages ? Object.values(country1.languages).join(', ') : 'N/A'}</div>
                    <div>{country2.languages ? Object.values(country2.languages).join(', ') : 'N/A'}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Timezones</div>
                    <div>{country1.timezones ? country1.timezones.length : 'N/A'}</div>
                    <div>{country2.timezones ? country2.timezones.length : 'N/A'}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">Driving Side</div>
                    <div>{country1.car?.side || 'N/A'}</div>
                    <div>{country2.car?.side || 'N/A'}</div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div className="font-medium">UN Member</div>
                    <div>{country1.unMember ? 'Yes' : 'No'}</div>
                    <div>{country2.unMember ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="data">
              <div className="space-y-8">
                <div>
                  <h4 className="font-semibold text-lg mb-4">Population Comparison</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-2">{formatNumber(country1.population)}</div>
                      <div className="text-muted-foreground">{country1.name.common}</div>
                    </div>
                    <div className="glass p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-2">{formatNumber(country2.population)}</div>
                      <div className="text-muted-foreground">{country2.name.common}</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      {country1.population > country2.population 
                        ? `${country1.name.common} has ${formatNumber(country1.population - country2.population)} more people than ${country2.name.common}.`
                        : country2.population > country1.population
                          ? `${country2.name.common} has ${formatNumber(country2.population - country1.population)} more people than ${country1.name.common}.`
                          : `Both countries have the same population.`
                      }
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold text-lg mb-4">Area Comparison</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-2">{formatNumber(country1.area)} km²</div>
                      <div className="text-muted-foreground">{country1.name.common}</div>
                    </div>
                    <div className="glass p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-2">{formatNumber(country2.area)} km²</div>
                      <div className="text-muted-foreground">{country2.name.common}</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">
                      {country1.area > country2.area 
                        ? `${country1.name.common} is ${(country1.area / country2.area).toFixed(1)}x larger than ${country2.name.common}.`
                        : country2.area > country1.area
                          ? `${country2.name.common} is ${(country2.area / country1.area).toFixed(1)}x larger than ${country1.name.common}.`
                          : `Both countries have the same area.`
                      }
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-semibold text-lg mb-4">Population Density</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-2">
                        {(country1.population / country1.area).toFixed(1)} people/km²
                      </div>
                      <div className="text-muted-foreground">{country1.name.common}</div>
                    </div>
                    <div className="glass p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold mb-2">
                        {(country2.population / country2.area).toFixed(1)} people/km²
                      </div>
                      <div className="text-muted-foreground">{country2.name.common}</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="charts">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-center">Population Comparison</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={populationData}>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => formatNumber(value)}
                        labelFormatter={(label) => `${label}'s Population`}
                      />
                      <Bar dataKey="value" fill="hsl(var(--primary))">
                        {populationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div>
                  <h4 className="font-semibold text-lg mb-4 text-center">Area Comparison</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={areaData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {areaData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${formatNumber(value)} km²`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  );
}