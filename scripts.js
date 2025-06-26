document.addEventListener('DOMContentLoaded', () => {

  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  const API_KEY = "dea28b2a2aa73387f65c5c320cb47d79";  

  getWeatherBtn.addEventListener('click', async () => {
    const city = cityInput.value.trim();
    if (city === "") return;


    //case : server may throw an error
    //case : server/database may be in other continent 
    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }


  });

  async function fetchWeatherData(city) {

    //get the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {

    //display the data
    const { name, main, weather } = data;

    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `${main.temp} °C`;
    descriptionDisplay.textContent = weather[0].description;

    weatherInfo.classList.remove('hidden');
    errorMessage.classList.add('hidden');
  }

  function showError() {
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');
  }
});