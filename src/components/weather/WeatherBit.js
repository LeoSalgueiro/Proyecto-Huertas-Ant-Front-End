import ReactWeather, { useWeatherBit  } from 'react-open-weather';
import React from 'react';

/*
const data = {
  forecast: [
      {
        date: 'Fri 27 November',
        description: 'Clear',
        icon:'SVG PATH',
        temperature: { min: '-0', max: '6' },
        wind: '2',
        humidity: 60,
      },
      {
        date: 'Sat 28 November',
        description: 'Clouds',
        icon:'SVG PATH',
        temperature: { min: '-1', max: '6' },
        wind: '3',
        humidity: 67,
      },

  ],
  current: {
      date: 'Fri 27 November',
      description: 'Clear',
      icon:'SVG PATH',
      temperature: { current: '-2', min: -3, max: 1 },
      wind: '2',
      humidity: 90,
    },
};
*/

export const WeatherBit = () => {
  const { data, isLoading, errorMessage } = useWeatherBit({
        key: 'a813d6a14ecb43bd8c8ae527c1635e0b',
        lat: '-34.7744',
        lon: '-58.2675',
        lang: 'es',
        unit: 'M', // values are (M,S,I)
      });

  return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="es"
      locationLabel="Florencio Varela"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
      showForecast
    />
  );
};