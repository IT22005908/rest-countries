// API calls to the REST Countries API

/**
 * Fetch all countries basic data
 */
export async function getAllCountries() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error("Failed to fetch countries");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all countries:", error);
    return [];
  }
}

/**
 * Fetch country by name
 */
export async function getCountryByName(name) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${name}?fullText=true`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch country");
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(`Error fetching country by name (${name}):`, error);
    return null;
  }
}

/**
 * Fetch country by 3-letter country code (cca3)
 */
export async function getCountryByCode(code) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch country");
    }
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error(`Error fetching country by code (${code}):`, error);
    return null;
  }
}

/**
 * Fetch countries by region
 */
export async function getCountriesByRegion(region) {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/region/${region}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch countries by region");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching countries by region (${region}):`, error);
    return [];
  }
}

/**
 * Fetch bordering countries
 */
export async function getCountryBorders(borderCodes) {
  if (!borderCodes || borderCodes.length === 0) return [];

  try {
    const codes = borderCodes.join(",");
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha?codes=${codes}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch bordering countries");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bordering countries:", error);
    return [];
  }
}

export async function getAllCountryCodes() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error("Failed to fetch country codes");
    }
    const data = await response.json();
    return data.map((country) => country.cca3);
  } catch (error) {
    console.error("Error fetching all country codes:", error);
    return [];
  }
}

// auth

export const registerUser = async (name, email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    return response;
  } catch (error) {
    alert(error.message || "An error occurred");
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    return response;
  } catch (error) {
    alert(error.message || "An error occurred");
  }
};
