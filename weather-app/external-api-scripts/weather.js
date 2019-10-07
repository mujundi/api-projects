class Weather {
  constructor() {
    this.client_key = "7e87bafd9e882f6bb27f336bdc4261b0";
  }

  async getWeatherInfo(coords) {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${this.client_key}`
    );

    const weatherInfo = await weatherResponse.json();

    return weatherInfo;
  }
}
