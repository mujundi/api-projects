class UI {
  constructor(location) {
    document.getElementById("w-location").textContent = location.city;
  }

  updateLocation(location) {
    document.getElementById("w-location").textContent = location;
  }

  displaySuggestions(citiesList) {
    let suggestions = document.getElementById("suggestions");
    suggestions.innerHTML = "";
    if (citiesList.length > 1) {
      citiesList.forEach(city => {
        suggestions.innerHTML += `
        <button type="button" class="list-group-item list-group-item-action">
          ${city}
        </button>
        `;
      });
      suggestions.style.display = "block";

      if (suggestions.hasChildNodes()) {
        let buttons = suggestions.childNodes;
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].addEventListener("click", e => {
            let selectedCity = e.target.textContent.trim();
            document.getElementById("city").value = selectedCity;
            suggestions.style.display = "none";
          });
        }
      }
    } else {
      suggestions.style.display = "none";
    }
  }

  updateWeatherInfo(weatherInfo) {
    // set description text
    document.getElementById("w-desc").textContent = weatherInfo.weather[0].description;
    // set icon image
    let imgCode = weatherInfo.weather[0].icon;
    document.getElementById("w-icon").src = `http://openweathermap.org/img/wn/${imgCode}@2x.png`;

    // set temperature
    let tempK = weatherInfo.main.temp;
    let tempF = (((tempK - 273.15) * 9) / 5 + 32).toFixed(1);
    let tempC = (tempK - 273.15).toFixed(1);
    document.getElementById("w-temp").textContent = `${tempF} F (${tempC} C)`;

    // set humidity
    let humidity = weatherInfo.main.humidity;
    document.getElementById("w-humidity").textContent = `Relative Humidity: ${humidity}%`;

    // set wind
    let windSpeed = weatherInfo.wind.speed.toFixed(1);
    let windDeg = weatherInfo.wind.deg;
    let windDir = windDeg => {
      let dir = "";
      if (windDeg < 22.5) {
        dir = "N";
      } else if (windDeg < 67.5) {
        dir = "NE";
      } else if (windDeg < 112.5) {
        dir = "E";
      } else if (windDeg < 157.5) {
        dir = "SE";
      } else if (windDeg < 202.5) {
        dir = "S";
      } else if (windDeg < 247.5) {
        dir = "SW";
      } else if (windDeg < 292.5) {
        dir = "W";
      } else if (windDeg < 337.5) {
        dir = "NW";
      } else {
        dir = "N";
      }

      return dir;
    };

    document.getElementById("w-wind").textContent = `Wind: ${windDir(windDeg)} at ${windSpeed} MPH`;

    document.getElementById("spinner").style.display = "inline-block";
    document.getElementById("w-info").style.display = "none";
    setTimeout(function() {
      document.getElementById("spinner").style.display = "none";
      document.getElementById("w-info").style.display = "block";
    }, 400);
  }
}
