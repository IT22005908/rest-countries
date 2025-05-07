import CountryDetail from "@/components/country-detail";
import {
  getCountryByCode,
  getCountryBorders,
  getAllCountryCodes,
} from "@/lib/countries-api";

export async function generateStaticParams() {
  // Fetch all country codes to generate static paths
  const countryCodes = await getAllCountryCodes(); // Ensure this function exists in your API
  return countryCodes.map((code) => ({ id: code }));
}

export default async function CountryPage({ params }) {
  const country = await getCountryByCode(params.id);
  let borders = [];

  if (country && country.borders && country.borders.length > 0) {
    borders = await getCountryBorders(country.borders);
  }

  if (!country) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Country not found</h1>
        <p>
          The country you're looking for doesn't exist or couldn't be loaded.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CountryDetail country={country} borders={borders} />
    </div>
  );
}
