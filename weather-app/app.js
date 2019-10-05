const storageObj = new Storage();
const geoloc = new Geolocator();

document.getElementById("w-save-btn").addEventListener("click", () => {
  let city = document.getElementById("city").value;
  geoloc.getCoords(city).then(geocode => {
    let coord = geocode.results[0].locations[0].latLng;
    let location = {
      place: city,
      coordinates: coords
    };

    storageObj.setLocation(JSON.stringify(location));
  });
});
