// DOM manipulation

const cityForm = document.querySelector("form");

const updateCity = async (city) => {

    // Get city details
    const cityDets = await getCity(city);
    // Get weather with the city details
    const weather = await getWeather(cityDets);

    // Return promise with object data
    return {
        cityDets: cityDets,
        weather: weather
    };
}

cityForm.addEventListener("submit", e => {
    e.preventDefault();

    // Get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update the UI with new city
    updateCity(city)
        .then(data => console.log(data))
        .catch(err => console.log(err));
})