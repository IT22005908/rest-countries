"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Command } from "cmdk";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CountrySelector({
  countries = [],
  selectedCountry,
  onSelect,
  label = "Select a country",
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(countries);

  useEffect(() => {
    setFilteredCountries(countries || []);
  }, [countries]);

  const handleSelect = (country) => {
    onSelect(country);
    setOpen(false);
    setValue("");
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onSelect(null);
  };

  const handleSearch = (search) => {
    setValue(search);

    if (!countries) return;

    if (search === "") {
      setFilteredCountries(countries);
      return;
    }

    const filtered = countries.filter(
      (country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase()) ||
        (country.capital &&
          country.capital.some((cap) =>
            cap.toLowerCase().includes(search.toLowerCase())
          ))
    );
    setFilteredCountries(filtered);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-auto min-h-12"
          >
            {selectedCountry ? (
              <div className="flex items-center space-x-2 w-full pr-4">
                <div className="relative h-6 w-8 overflow-hidden rounded-sm shadow-sm">
                  <Image
                    src={selectedCountry.flags.svg || selectedCountry.flags.png}
                    alt={`Flag of ${selectedCountry.name.common}`}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <span className="truncate flex-1 text-left">
                  {selectedCountry.name.common}
                </span>
                {selectedCountry && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={clearSelection}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Clear selection</span>
                  </Button>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground">Select a country...</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-full min-w-[300px]">
          <Command value={value} onValueChange={handleSearch}>
            <div className="flex items-center border-b px-3">
              <input
                placeholder="Search countries..."
                value={value}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            {filteredCountries.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No countries found.
              </div>
            ) : (
              <div className="max-h-[300px] overflow-y-auto">
                {filteredCountries.map((country) => (
                  <div
                    key={country.cca3}
                    onSelect={() => handleSelect(country)}
                    onClick={() => handleSelect(country)}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                      selectedCountry?.cca3 === country.cca3 && "bg-accent"
                    )}
                  >
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="relative h-5 w-7 overflow-hidden rounded-sm shadow-sm">
                        <Image
                          src={country.flags.svg || country.flags.png}
                          alt={`Flag of ${country.name.common}`}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <span className="truncate">{country.name.common}</span>
                    </div>
                    {selectedCountry?.cca3 === country.cca3 && (
                      <Check className="ml-auto h-4 w-4 opacity-100" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
