// API interaction

class Forecast {
    constructor() {
        this.key = "3SdAkGeF8Cr1LsknVQcLYgvlmN86TDXe";
        this.weatherURI = "https://dataservice.accuweather.com/currentconditions/v1/";
        this.cityURI = "https://dataservice.accuweather.com/locations/v1/cities/search";
    }
    async updateCity(city) {
        // Get city details
        const cityDets = await this.getCity(city);
        // Get weather with the city details
        const weather = await this.getWeather(cityDets);
        // Return promise with object data
        return { cityDets, weather };
    }
    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
        return data[0];
    }
    async getWeather(city) {
        const query = `${city.Key}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI + query);
        const data = await response.json();
        return data[0];
    }
}