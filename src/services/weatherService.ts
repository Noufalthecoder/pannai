export interface WeatherData {
  location: string;
  temperatureC: number;
  humidityPercent: number;
  windSpeedKmh: number;
  evaporationRateMmDay: number;
  condition: string;
  isDemo: boolean;
}

export const weatherService = {
  async getCurrentWeather(location: string = 'Thoothukudi Coast'): Promise<WeatherData> {
    return {
      location,
      temperatureC: 33.2,
      humidityPercent: 62,
      windSpeedKmh: 14,
      evaporationRateMmDay: 8.5,
      condition: 'Sunny · High Evaporation Rate',
      isDemo: true,
    };
  },
};
