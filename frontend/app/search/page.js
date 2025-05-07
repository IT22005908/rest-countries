"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getAllCountries } from "@/lib/countries-api";
import CountryGrid from "@/components/country-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const regionParam = searchParams.get("region") || "";
  const allowedRegions = [
    "all",
    "Africa",
    "Americas",
    "Asia",
    "Europe",
    "Oceania",
  ];
  const initialRegion = allowedRegions.includes(regionParam)
    ? regionParam
    : "all";

  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [populationRange, setPopulationRange] = useState([0, 1500000000]);
  const [maxPopulation, setMaxPopulation] = useState(1500000000);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountries(data);

        const maxPop = Math.max(
          ...data.map((country) => country.population || 0)
        );
        setMaxPopulation(maxPop);
        setPopulationRange([0, maxPop]);

        setFilteredCountries(
          filterCountries(data, searchQuery, selectedRegion, [0, maxPop])
        );
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, [initialQuery, initialRegion]);

  const filterCountries = (countriesData, query, region, popRange) => {
    return countriesData.filter((country) => {
      const matchesQuery =
        query === "" ||
        country.name.common.toLowerCase().includes(query.toLowerCase()) ||
        country.name.official.toLowerCase().includes(query.toLowerCase()) ||
        (country.capital &&
          country.capital.some((cap) =>
            cap.toLowerCase().includes(query.toLowerCase())
          ));

      const matchesRegion = region === "all" || country.region === region;

      const population = country.population || 0;
      const matchesPopulation =
        population >= popRange[0] && population <= popRange[1];

      return matchesQuery && matchesRegion && matchesPopulation;
    });
  };

  const handleSearch = () => {
    setFilteredCountries(
      filterCountries(countries, searchQuery, selectedRegion, populationRange)
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedRegion("all");
    setPopulationRange([0, maxPopulation]);
    setFilteredCountries(countries);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const formatPopulation = (value) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(1)}B`;
    }
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toString();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 mb-8"
      >
        <h1 className="text-3xl font-bold mb-6">Search Countries</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="col-span-full md:col-span-1">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            </div>
          </div>

          <div>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="Africa">Africa</SelectItem>
                <SelectItem value="Americas">Americas</SelectItem>
                <SelectItem value="Asia">Asia</SelectItem>
                <SelectItem value="Europe">Europe</SelectItem>
                <SelectItem value="Oceania">Oceania</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <Button onClick={handleSearch} className="flex-shrink-0">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            <Button
              onClick={clearFilters}
              variant="outline"
              className="flex-shrink-0"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-2">
            Population Range: {formatPopulation(populationRange[0])} -{" "}
            {formatPopulation(populationRange[1])}
          </p>
          <Slider
            value={populationRange}
            min={0}
            max={maxPopulation}
            step={1000000}
            onValueChange={setPopulationRange}
            className="mt-6"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="africa">Africa</TabsTrigger>
            <TabsTrigger value="americas">Americas</TabsTrigger>
            <TabsTrigger value="asia">Asia</TabsTrigger>
            <TabsTrigger value="europe">Europe</TabsTrigger>
            <TabsTrigger value="oceania">Oceania</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <CountryGrid countries={filteredCountries} loading={isLoading} />
          </TabsContent>

          <TabsContent value="africa">
            <CountryGrid
              countries={countries.filter((c) => c.region === "Africa")}
              loading={isLoading}
            />
          </TabsContent>

          <TabsContent value="americas">
            <CountryGrid
              countries={countries.filter((c) => c.region === "Americas")}
              loading={isLoading}
            />
          </TabsContent>

          <TabsContent value="asia">
            <CountryGrid
              countries={countries.filter((c) => c.region === "Asia")}
              loading={isLoading}
            />
          </TabsContent>

          <TabsContent value="europe">
            <CountryGrid
              countries={countries.filter((c) => c.region === "Europe")}
              loading={isLoading}
            />
          </TabsContent>

          <TabsContent value="oceania">
            <CountryGrid
              countries={countries.filter((c) => c.region === "Oceania")}
              loading={isLoading}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
