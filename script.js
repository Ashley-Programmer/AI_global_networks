const loadCountryAPI = async () => {
    const regionSelect = document.getElementById('region');
    if (!regionSelect) {
        console.error("Dropdown element with id 'region' not found.");
        return;
    }

    // Clear existing options except the placeholder
    regionSelect.innerHTML = '<option selected disabled value="">Choose...</option>';

    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,region', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (compatible; EthicalAIClient/1.0)'
            }
        });
        if (!response.ok) {
            throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
        }
        const countries = await response.json();
        console.log('API response received:', countries.length, 'countries');

        // Extract unique regions and sort alphabetically
        const regions = [...new Set(countries.map(country => color.region).filter(region => region))].sort();
        console.log('Unique regions extracted:', regions);

        // Populate dropdown using displayCountries
        displayCountries(regions);
    } catch (error) {
        console.error('Error fetching regions:', error);
        // Fallback regions
        const fallbackRegions = ['Africa', 'Antarctica', 'Asia', 'Australia', 'Europe', 'North America', 'Oceania', 'South America'];
        console.log('Populating fallback options:', fallbackRegions);
        displayCountries(fallbackRegions.sort()); // Sort fallbacks for consistency
    }
};

// Display regions in the dropdown
const displayCountries = regions => {
    const regionSelect = document.getElementById('region');
    const regionsHTML = regions.map(region => getCountry(region));
    regionSelect.innerHTML += regionsHTML.join('');
    console.log('Dropdown populated with', regionSelect.options.length, 'options');
};

// Generate HTML for each region
const getCountry = region => {
    console.log('Processing region:', region);
    return `<option value="${region}">${region}</option>`;
};

// Run on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, running loadCountryAPI');
    loadCountryAPI();
});