document.getElementById('searchButton').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value;
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const apiKey = '613fa98c2ceffa9e2b527858139bafdf' ; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.cod === 200) {
            updateWeather(data);
        } else {
            alert('City not found');
        }
    } catch (error) {
        alert('Failed to fetch weather data');
    }
}

function updateWeather(data) {
    const weatherCondition = data.weather[0].main.toLowerCase();
    const temp = data.main.temp;
    const cityName = data.name;
    const weatherInfo = `Weather in ${cityName}: ${temp}°C, ${data.weather[0].description}`;

    document.getElementById('weatherInfo').textContent = weatherInfo;
    updateBackground(weatherCondition);
}

function updateBackground(condition) {
    let imageUrl =  'url("default.jpg")';

    switch (condition) {
        case 'temp>=30':
            imageUrl = 'url("cloudy.jpg")';
            break;
        case 'temp>20&&temp<30':
            imageUrl = 'url("rain.jpg")';
            break;
        case 'snow':
            imageUrl = 'url("snow.jpg")';
            break;
        case 'thunderstorm':
            imageUrl = 'url("thunderstorm.jpg")';
            break;
        default:
            imageUrl = 'url("default.jpg")';
    }

    document.body.style.backgroundImage = imageUrl;
}
