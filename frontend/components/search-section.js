"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchSection() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (region && region !== "all") params.set("region", region);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="glass-card p-8 my-12 max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6">Find Your Country</h2>

      <form onSubmit={handleSearch} className="space-y-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by country name or capital..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={region} onValueChange={setRegion}>
            <SelectTrigger>
              <SelectValue placeholder="Select a region" />
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

          <div className="md:col-span-2">
            <Button type="submit" className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Search Countries
            </Button>
          </div>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <Button
          variant="link"
          size="sm"
          onClick={() => router.push("/search?region=Europe")}
        >
          Europe
        </Button>
        <Button
          variant="link"
          size="sm"
          onClick={() => router.push("/search?region=Asia")}
        >
          Asia
        </Button>
        <Button
          variant="link"
          size="sm"
          onClick={() => router.push("/search?region=Africa")}
        >
          Africa
        </Button>
        <Button
          variant="link"
          size="sm"
          onClick={() => router.push("/search?region=Americas")}
        >
          Americas
        </Button>
        <Button
          variant="link"
          size="sm"
          onClick={() => router.push("/search?region=Oceania")}
        >
          Oceania
        </Button>
      </div>
    </motion.div>
  );
}
