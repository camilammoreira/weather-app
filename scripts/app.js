// DOM manipulation

const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector(".time");
const icon = document.querySelector(".icon img");

const updateCity = async (city) => {

    // Get city details
    const cityDets = await getCity(city);
    // Get weather with the city details
    const weather = await getWeather(cityDets);

    console.log(cityDets, weather);
    // Return promise with object data
    return { cityDets, weather };
}

// Update UI 
const updateUI = (data) => {
    // Destructure properties
    const { cityDets, weather } = data;

    details.innerHTML = `
    <h5 class="my-3">${cityDets.LocalizedName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}&deg;C</span>
    </div>
    `;

    icon.setAttribute("src", `assets/${weather.WeatherIcon}.svg`);

    let timeSrc = weather.IsDayTime ? "assets/day.svg" : "assets/night.svg";
    time.setAttribute("src", timeSrc);

    card.classList.remove("d-none");
}

cityForm.addEventListener("submit", e => {
    e.preventDefault();

    // Get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    // Update the UI with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // Set item to local storage
    localStorage.setItem("city", city);
});


// Retrieve city from local storage
if (localStorage.city) {
    updateCity(localStorage.city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}