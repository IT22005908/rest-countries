"use client";

import { useState, useEffect } from "react";
import { getAllCountries } from "@/lib/countries-api";
import CountrySelector from "@/components/country-selector";
import CountryComparison from "@/components/country-comparison";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function ComparePage() {
  const [countries, setCountries] = useState([]);
  const [country1, setCountry1] = useState(null);
  const [country2, setCountry2] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          console.error("Fetched data is not an array:", data);
          setCountries([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Failed to fetch countries:", error);
        setCountries([]); // Fallback to an empty array
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const swapCountries = () => {
    setCountry1(country2);
    setCountry2(country1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 mb-8"
      >
        <h1 className="text-3xl font-bold mb-6">Compare Countries</h1>
        <p className="text-muted-foreground mb-8">
          Select two countries to compare their key statistics, geography, and
          other information.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <CountrySelector
            countries={Array.isArray(countries) ? countries : []}
            selectedCountry={country1}
            onSelect={setCountry1}
            label="First Country"
          />

          <div className="flex justify-center">
            <Button
              variant="outline"
              className="rounded-full p-3"
              onClick={swapCountries}
              disabled={!country1 || !country2}
            >
              <ArrowRightLeft className="h-6 w-6" />
              <span className="sr-only">Swap Countries</span>
            </Button>
          </div>

          <CountrySelector
            countries={Array.isArray(countries) ? countries : []}
            selectedCountry={country2}
            onSelect={setCountry2}
            label="Second Country"
          />
        </div>
      </motion.div>

      {country1 && country2 ? (
        <CountryComparison country1={country1} country2={country2} />
      ) : (
        <div className="text-center p-12 glass-card">
          <p className="text-xl">Please select two countries to compare</p>
        </div>
      )}
    </div>
  );
}
