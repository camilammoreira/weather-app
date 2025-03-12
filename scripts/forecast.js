// API interaction

const key = "w9x7m0YW2zutav9wDw54AvGeoABVOJbg"


// Get city info
const getCity = async (city) => {

    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

// Get weather info
const getWeather = async (location) => {

    const base = "http://dataservice.accuweather.com/currentconditions/v1/";
    const query = `${location.Key}?apikey=${key}`

    response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};

getCity("salinas")
    .then(data => getWeather(data))
    .then(data => console.log(data))
    .catch((err) => console.log(err));