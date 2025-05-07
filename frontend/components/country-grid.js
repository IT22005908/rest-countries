export default function CountryGrid({ countries, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(12)].map((_, index) => (
          <div 
            key={index} 
            className="rounded-xl bg-muted h-72 animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl">No countries match your search criteria</p>
      </div>
    );
  }

  // Import inside the component to avoid server/client mismatch
  const CountryCard = require('./country-card').default;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {countries.map((country) => (
        <CountryCard key={country.cca3} country={country} animate />
      ))}
    </div>
  );
}