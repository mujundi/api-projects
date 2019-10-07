const storageObj = new Storage();
const geoloc = new Geolocator();
const weather = new Weather();
const ui = new UI(storageObj.getLocation());

// Pulls weather info on load for location (specified in storage)
let coords = storageObj.getLocation().coordinates;
weather.getWeatherInfo(coords).then(weatherInfo => ui.updateWeatherInfo(weatherInfo));

// debounce fn
const debounce = (fn, time) => {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

// Save button on modal retrieves city coordinates and stores location info in storage
document.getElementById("w-save-btn").addEventListener("click", saveLocationChange);

// Pulls suggestions from API and displays them while user types input in form
document.getElementById("city").addEventListener(
  "keyup",
  debounce(e => {
    const input = e.target.value;
    if (input.length > 2) {
      geoloc.getSuggestedCities(input).then(list => {
        let citiesList = [];
        list.results.forEach(result => {
          if (result.recordType == "city") {
            let city = result.place.properties.city + ", " + result.place.properties.stateCode;
            citiesList.push(city);
          }
        });
        ui.displaySuggestions(citiesList);
      });
    }
  }, 400)
);

// Save location changes to storage
function saveLocationChange() {
  let place = document.getElementById("city").value;
  geoloc.getCoords(place).then(geocode => {
    let coords = geocode.results[0].locations[0].latLng;
    let location = {
      city: place,
      coordinates: coords
    };

    storageObj.setLocation(location);
    ui.updateLocation(place);
    weather.getWeatherInfo(coords).then(weatherInfo => ui.updateWeatherInfo(weatherInfo));
  });
}
