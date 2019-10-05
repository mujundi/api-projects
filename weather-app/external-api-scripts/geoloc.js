class Geolocator {
  constructor() {
    this.client_key = "0GnAWhGvADUW8WvbF6fwzMLy0GGN5Jo6";
  }

  async getCoords(city) {
    const geocodeResponse = await fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=${this.client_key}&location=${city}`
    );

    const geocode = await geocodeResponse.json();

    return geocode;
  }
}
