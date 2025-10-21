// DOM Elements - Tab Navigation
const tabBtns = document.querySelectorAll('.tab-btn');
const planetsControls = document.getElementById('planetsControls');
const peopleControls = document.getElementById('peopleControls');

// DOM Elements - Planets
const planetIdInput = document.getElementById('planetId');
const fetchBtn = document.getElementById('fetchBtn');
const randomBtn = document.getElementById('randomBtn');
const planetCard = document.getElementById('planetCard');

// DOM Elements - People
const personIdInput = document.getElementById('personId');
const fetchPersonBtn = document.getElementById('fetchPersonBtn');
const randomPersonBtn = document.getElementById('randomPersonBtn');
const characterCard = document.getElementById('characterCard');

// DOM Elements - Shared
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');

// Planet Data Elements
const planetName = document.getElementById('planetName');
const climate = document.getElementById('climate');
const terrain = document.getElementById('terrain');
const population = document.getElementById('population');
const diameter = document.getElementById('diameter');
const gravity = document.getElementById('gravity');
const orbitalPeriod = document.getElementById('orbitalPeriod');
const rotationPeriod = document.getElementById('rotationPeriod');
const surfaceWater = document.getElementById('surfaceWater');

// Character Data Elements
const characterName = document.getElementById('characterName');
const height = document.getElementById('height');
const mass = document.getElementById('mass');
const hairColor = document.getElementById('hairColor');
const skinColor = document.getElementById('skinColor');
const eyeColor = document.getElementById('eyeColor');
const birthYear = document.getElementById('birthYear');
const gender = document.getElementById('gender');

// Current active tab
let activeTab = 'planets';

// Tab switching functionality
function switchTab(tabName) {
    activeTab = tabName;
    
    // Update tab buttons
    tabBtns.forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Hide all cards and controls
    planetCard.classList.add('hidden');
    characterCard.classList.add('hidden');
    planetsControls.classList.add('hidden');
    peopleControls.classList.add('hidden');
    errorDiv.classList.add('hidden');
    
    // Show appropriate controls
    if (tabName === 'planets') {
        planetsControls.classList.remove('hidden');
    } else if (tabName === 'people') {
        peopleControls.classList.remove('hidden');
    }
}

// Fetch planet data from SWAPI
async function fetchPlanetData(planetId) {
    // Hide previous results and errors
    planetCard.classList.add('hidden');
    characterCard.classList.add('hidden');
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

// Fetch character data from SWAPI
async function fetchPersonData(personId) {
    // Hide previous results and errors
    planetCard.classList.add('hidden');
    characterCard.classList.add('hidden');
    errorDiv.classList.add('hidden');
    loadingDiv.classList.remove('hidden');

    try {
        const response = await fetch(`https://www.swapi.tech/api/people/${personId}/`);
        
        if (!response.ok) {
            throw new Error(`Character not found (ID: ${personId})`);
        }

        const data = await response.json();
        
        // Check if data exists
        if (!data.result || !data.result.properties) {
            throw new Error('Invalid character data received');
        }

        displayCharacterData(data.result.properties);
    } catch (error) {
        showError(error.message);
        console.error('Error fetching character data:', error);
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

// Display character data on the page
function displayCharacterData(character) {
    // Format height
    const formattedHeight = character.height !== 'unknown' 
        ? `${character.height} cm` 
        : 'Unknown';

    // Format mass
    const formattedMass = character.mass !== 'unknown' 
        ? `${character.mass} kg` 
        : 'Unknown';

    // Update DOM elements
    characterName.textContent = character.name;
    height.textContent = formattedHeight;
    mass.textContent = formattedMass;
    hairColor.textContent = capitalize(character.hair_color);
    skinColor.textContent = capitalize(character.skin_color);
    eyeColor.textContent = capitalize(character.eye_color);
    birthYear.textContent = character.birth_year;
    gender.textContent = capitalize(character.gender);

    // Show character card
    characterCard.classList.remove('hidden');
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

// Get random person ID
function getRandomPersonId() {
    return Math.floor(Math.random() * 83) + 1;
}

// Event Listeners - Tab Navigation
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        switchTab(btn.dataset.tab);
    });
});

// Event Listeners - Planets
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

planetIdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchBtn.click();
    }
});

// Event Listeners - People
fetchPersonBtn.addEventListener('click', () => {
    const personId = personIdInput.value;
    if (personId && personId >= 1 && personId <= 83) {
        fetchPersonData(personId);
    } else {
        showError('Please enter a valid character ID (1-83)');
    }
});

randomPersonBtn.addEventListener('click', () => {
    const randomId = getRandomPersonId();
    personIdInput.value = randomId;
    fetchPersonData(randomId);
});

personIdInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchPersonBtn.click();
    }
});

// Load initial planet (Tatooine - Planet ID 1) on page load
window.addEventListener('load', () => {
    fetchPlanetData(1);
});

