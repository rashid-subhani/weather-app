const API_KEY = '36ff0932ae27ec3091d2bf1247c2ec3e';

// DOM Elements
const cityInput = document.querySelector("#city");
const getWeatherBtn = document.querySelector("#getWeather");
const errorMessage = document.querySelector("#errorMessage");
const cityNameEl = document.querySelector("#cityName");
const temperatureEl = document.querySelector("#temperature");
const conditionEl = document.querySelector("#condition");
const windSpeedEl = document.querySelector("#windSpeed");
const humidityEl = document.querySelector("#humidity");
const tempMaxEl = document.querySelector("#tempMax");
const tempMinEl = document.querySelector("#tempMin");
const currentDateEl = document.querySelector("#currentDate");
const forecastContainer = document.querySelector("#forecastContainer");

// Event listener
getWeatherBtn.addEventListener("click", fetchWeather);

// Show current date
const today = new Date();
currentDateEl.textContent = today.toDateString();

async function fetchWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }
  clearError(); //clear any previous error

  try {
    // Geo API call
    const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`);

    if(!geoRes.ok){
      showError("Failed to connect. Please try again later.");
      return;
    }
    const geoData = await geoRes.json();

    if (!geoData.length) {
      showError("City not found. Please enter a valid city.");
      return;
    }

    const { lat, lon, name } = geoData[0];
    cityNameEl.textContent = name;

    // weather API call
    const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const weatherData = await weatherRes.json();

    // Display current weather
    temperatureEl.textContent = Math.round(weatherData.main.temp);
    tempMaxEl.textContent = Math.round(weatherData.main.temp_max);
    tempMinEl.textContent = Math.round(weatherData.main.temp_min);
    windSpeedEl.textContent = weatherData.wind.speed;
    humidityEl.textContent = weatherData.main.humidity;

    const weatherDesc = weatherData.weather[0].description;
    conditionEl.textContent = weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1);

    // 3. Fetch 5-day forecast data
    const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    const forecastData = await forecastRes.json();

    displayForecast(forecastData.list);
  } catch (error) {
     showError("Failed to fetch weather data. Please try again.");
  }
}

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function clearError() {
  errorMessage.textContent = "";
  errorMessage.style.display = "none";
}

function displayForecast(list) {
  // Clear previous forecast
  forecastContainer.innerHTML = '';

  // Group forecast by day (date string YYYY-MM-DD)
  const forecastByDay = {};

  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!forecastByDay[date]) {
      forecastByDay[date] = [];
    }
    forecastByDay[date].push(item);
  });

  // We only want next 5 days (including today)
  const days = Object.keys(forecastByDay).slice(0, 5);

  days.forEach(date => {
    const dayData = forecastByDay[date];

    // Get max/min temp, average wind speed & humidity, and weather icon/description (take from midday if possible)
    const temps = dayData.map(d => d.main.temp);
    const tempMax = Math.round(Math.max(...temps));
    const tempMin = Math.round(Math.min(...temps));

    const windSpeeds = dayData.map(d => d.wind.speed);
    const avgWind = (windSpeeds.reduce((a,b) => a+b, 0) / windSpeeds.length).toFixed(1);

    const humidities = dayData.map(d => d.main.humidity);
    const avgHumidity = Math.round(humidities.reduce((a,b) => a+b, 0) / humidities.length);

    // Find entry closest to 12:00 for icon and description
    let middayEntry = dayData.find(d => d.dt_txt.includes("12:00:00"));
    if (!middayEntry) middayEntry = dayData[0];

    const iconCode = middayEntry.weather[0].icon;
    const description = middayEntry.weather[0].description;

    // Get day name from date
    const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });

    // Create forecast day element
    const forecastDay = document.createElement('div');
    forecastDay.classList.add('forecast-day', 'text-center', 'p-2', 'flex-grow-1');

    forecastDay.innerHTML = `
      <div class="day">${dayName}</div>
      <div class="icon mb-2">
        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="${description}" title="${description}" />
      </div>
      <div class="details">
        <div class="temp fw-semibold mb-1">${Math.round(middayEntry.main.temp)}°C</div>
        <div class="small text-muted">MAX: ${tempMax}°C</div>
        <div class="small text-muted">MIN: ${tempMin}°C</div>
        <div class="small text-muted"><i class="fa-solid fa-wind me-1"></i> ${avgWind} km/h</div>
        <div class="small text-muted"><i class="fa-solid fa-droplet me-1"></i> ${avgHumidity}%</div>
      </div>
    `;

    forecastContainer.appendChild(forecastDay);
  });
}



