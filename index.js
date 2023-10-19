const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

searchButton.addEventListener('click', async () => {
    const APIKey = '3af0c1cbe5msh648a921ebabf706p16ddc6jsnf5f3ee32b0d8'
    const city = searchInput.value;

    if (city === '') {
        return;
    }

    const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?${city}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': APIKey,
            'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.error) {
            handleError();
        } else {
            handleWeatherData(json);
        }
    } catch (error) {
        console.error(error);
        handleError();
    }
});

function handleError() {
    container.style.height = '400px';
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'block';
    error404.classList.add('fadeIn');
}

function handleWeatherData(data) {
    error404.style.display = 'none';
    error404.classList.remove('fadeIn');

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.weather-details .humidity span');
    const wind = document.querySelector('.weather-details .wind span');

    const weather = data.current;
    switch (weather.condition.text) {
        case 'Clear':
            image.src = 'images/clear.png';
            break;

        case 'Rain':
            image.src = 'images/rain.png';
            break;

        case 'Snow':
            image.src = 'images/snow.png';
            break;

        case 'Cloudy':
            image.src = 'images/cloud.png';
            break;

        default:
            image.src = '';
    }

    temperature.innerHTML = `${weather.temp_c}<span>°C</span>`;
    description.innerHTML = weather.condition.text;
    humidity.innerHTML = `${weather.humidity}%`;
    wind.innerHTML = `${weather.wind_kph}Km/h`;

    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
}
