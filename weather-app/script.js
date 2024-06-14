document.addEventListener("DOMContentLoaded", () => {
    // Replace with your Open Weather API key
    const apiKey = "2582e425d979728f6eb18792e3fecf24";
    const weatherInfo = document.getElementById("weather-info");
    const searchButton = document.getElementById("search-button");
    const locationInput = document.getElementById("location-input");
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    // Function to fetch weather data
    const fetchWeather = (location) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => displayError(error));
    };

    // Function to display weather data
    const displayWeather = (data) => {
        if (data.cod === 200) {
            const { name, main, weather, wind } = data;
            weatherInfo.innerHTML = `
                <h2>${name}</h2>
                <p>Temperature: ${main.temp} °C</p>
                <p>Humidity: ${main.humidity}%</p>
                <p>Weather: ${weather[0].description}</p>
                <p>Wind Speed: ${wind.speed} m/s</p>
                <p>${new Date().toLocaleString()}</p>
            `;
        } else {
            displayError(data.message);
        }
    };

    // Function to display error messages
    const displayError = (message) => {
        weatherInfo.innerHTML = `<p>Error: ${message}</p>`;
    };

    // Event listener for the search button
    searchButton.addEventListener("click", () => {
        const location = locationInput.value;
        if (location) {
            fetchWeather(location);
        } else {
            displayError("Please enter a valid location.");
        }
    });

    // Event listener for the dark mode toggle
    darkModeToggle.addEventListener("change", (event) => {
        if (event.target.checked) {
            document.body.classList.add("dark-mode");
            document.querySelector(".container").classList.add("dark-mode");
            locationInput.classList.add("dark-mode");
            searchButton.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
            document.querySelector(".container").classList.remove("dark-mode");
            locationInput.classList.remove("dark-mode");
            searchButton.classList.remove("dark-mode");
        }
    });
});
