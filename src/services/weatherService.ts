import { request } from './apiClient';
import { WeatherSchema } from '../types/api';
export const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=18.4861&longitude=-69.9312&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSanto_Domingo&forecast_days=1';
export const getWeather = (signal: AbortSignal) =>
  request(WEATHER_URL, WeatherSchema, signal);
