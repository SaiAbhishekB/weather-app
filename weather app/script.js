const apiKey = 'f478ac6763f3be52491728605c5623db'; // Replace with your new OpenWeatherMap API key
let isCelsius = true;

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) return;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById('errorMessage').innerText = "City not found!";
            document.getElementById('errorMessage').classList.remove('hidden');
            document.getElementById('weatherResult').classList.add('hidden');
            return;
        }

        document.getElementById('errorMessage').classList.add('hidden');
        document.getElementById('weatherResult').classList.remove('hidden');

        // Update Weather Details
        document.getElementById('cityName').innerText = data.name;
        document.getElementById('temperature').innerText = `${data.main.temp} °C`;
        document.getElementById('humidity').innerText = data.main.humidity;
        document.getElementById('windSpeed').innerText = data.wind.speed;
        document.getElementById('description').innerText = data.weather[0].description;
        document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

        // 🌦️ Change background based on weather
        changeBackground(data.weather[0].description);

    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

// 🌍 Change Background Function
function changeBackground(weatherDescription) {
    let bgImage = "";

    if (weatherDescription.toLowerCase().includes("clear") || weatherDescription.toLowerCase().includes("sunny")) {
        bgImage = "images/sunny.jpg"; 
    } else if (weatherDescription.toLowerCase().includes("cloud")) {
        bgImage = "images/cloudy.jpg"; 
    } else if (weatherDescription.toLowerCase().includes("rain")) {
        bgImage = "images/rainy.jpg"; 
    } else if (weatherDescription.toLowerCase().includes("snow")) {
        bgImage = "images/snow.jpg"; 
    } else if (weatherDescription.toLowerCase().includes("thunderstorm")) {
        bgImage = "images/thunder.jpg"; 
    } else if (weatherDescription.toLowerCase().includes("haze") || weatherDescription.toLowerCase().includes("smoke")) {
        bgImage = "images/smoke.jpg"; 
    } else {
        bgImage = "images/default.jpg"; 
    }

    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.transition = "background-image 0.5s ease-in-out";
}

// 🌡️ Toggle Temperature
function toggleTemperature() {
    let tempElement = document.getElementById('temperature');
    let toggleButton = document.getElementById('toggleButton');
    let temp = parseFloat(tempElement.innerText);

    if (isCelsius) {
        temp = (temp * 9/5) + 32;
        tempElement.innerText = `${temp.toFixed(2)} °F`;
        toggleButton.innerText = "Switch to °C";
        isCelsius = false;
    } else {
        temp = (temp - 32) * 5/9;
        tempElement.innerText = `${temp.toFixed(2)} °C`;
        toggleButton.innerText = "Switch to °F";
        isCelsius = true;
    }
}
