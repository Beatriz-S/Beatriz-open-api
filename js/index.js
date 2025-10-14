// DOM Elements
const planetIdInput = document.getElementById('planetId');
const fetchBtn = document.getElementById('fetchBtn');
const randomBtn = document.getElementById('randomBtn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const planetCard = document.getElementById('planetCard');

// Data elements
const planetName = document.getElementById('planetName');
const climate = document.getElementById('climate');
const terrain = document.getElementById('terrain');
const population = document.getElementById('population');
const diameter = document.getElementById('diameter');
const gravity = document.getElementById('gravity');
const orbitalPeriod = document.getElementById('orbitalPeriod');
const rotationPeriod = document.getElementById('rotationPeriod');
const surfaceWater = document.getElementById('surfaceWater');

// Fetch planet data from SWAPI
async function fetchPlanetData(planetId) {
    // Hide previous results and errors
    planetCard.classList.add('hidden');
    errorDiv.classList.add('hidden');
    loadingDiv.classList.remove('hidden');

    try {
        const response = await fetch(`https://www.swapi.tech/api/planets/${planetId}/`);
        
        if (!response.ok) {
            throw new Error(`Planet not found (ID: ${planetId})`);
        }

        const data = await response.json();
        
        // Check if data exists
        if (!data.result || !data.result.properties) {
            throw new Error('Invalid planet data received');
        }

        displayPlanetData(data.result.properties);
    } catch (error) {
        showError(error.message);
        console.error('Error fetching planet data:', error);
    } finally {
        loadingDiv.classList.add('hidden');
    }
}

// Display planet data on the page
function displayPlanetData(planet) {
    // Format population with commas
    const formattedPopulation = planet.population !== 'unknown' 
        ? parseInt(planet.population).toLocaleString() 
        : 'Unknown';

    // Format diameter
    const formattedDiameter = planet.diameter !== 'unknown' 
        ? `${parseInt(planet.diameter).toLocaleString()} km` 
        : 'Unknown';

    // Format surface water
    const formattedSurfaceWater = planet.surface_water !== 'unknown' 
        ? `${planet.surface_water}%` 
        : 'Unknown';

    // Format orbital period
    const formattedOrbitalPeriod = planet.orbital_period !== 'unknown' 
        ? `${planet.orbital_period} days` 
        : 'Unknown';

    // Format rotation period
    const formattedRotationPeriod = planet.rotation_period !== 'unknown' 
        ? `${planet.rotation_period} hours` 
        : 'Unknown';

    // Update DOM elements
    planetName.textContent = planet.name;
    climate.textContent = capitalize(planet.climate);
    terrain.textContent = capitalize(planet.terrain);
    population.textContent = formattedPopulation;
    diameter.textContent = formattedDiameter;
    gravity.textContent = planet.gravity;
    orbitalPeriod.textContent = formattedOrbitalPeriod;
    rotationPeriod.textContent = formattedRotationPeriod;
    surfaceWater.textContent = formattedSurfaceWater;

    // Show planet card
    planetCard.classList.remove('hidden');
}

// Show error message
function showError(message) {
    errorDiv.textContent = `⚠️ Error: ${message}`;
    errorDiv.classList.remove('hidden');
}

// Capitalize first letter of each word
function capitalize(str) {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

// Get random planet ID
function getRandomPlanetId() {
    return Math.floor(Math.random() * 60) + 1;
}

// Event Listeners
fetchBtn.addEventListener('click', () => {
    const planetId = planetIdInput.value;
    if (planetId && planetId >= 1 && planetId <= 60) {
        fetchPlanetData(planetId);
    } else {
        showError('Please enter a valid planet ID (1-60)');
    }
});

randomBtn.addEventListener('click', () => {
    const randomId = getRandomPlanetId();
    planetIdInput.value = randomId;
    fetchPlanetData(randomId);
});

// Allow Enter key to trigger fetch
planetIdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchBtn.click();
    }
});

// Load initial planet (Tatooine - Planet ID 1) on page load
window.addEventListener('load', () => {
    fetchPlanetData(1);
});

