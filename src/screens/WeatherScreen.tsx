import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Feather as Icon } from '@react-native-vector-icons/feather/static';
import { Button, Card, Page, Status } from '../components/ui';
import { useRequest } from '../hooks/useRequest';
import { Weather } from '../types/api';
import { getWeather } from '../services/weatherService';
import { dateES, metric, weatherLabel } from '../utils/format';
import { openLink } from '../utils/links';
import { colors, styles as s } from '../theme';
export default function WeatherScreen() {
  const q = useRequest<Weather>();
  const { run } = q;
  useEffect(() => {
    run(getWeather);
  }, [run]);
  const c = q.data?.current;
  return (
    <Page>
      <Text style={s.title}>Santo Domingo</Text>
      <Text style={s.muted}>
        {dateES(new Date().toISOString())} · República Dominicana
      </Text>
      <Status {...q} />
      {c && q.data && (
        <>
          <Card>
            <Icon
              name={weatherLabel(c.weather_code)[1]}
              size={52}
              color={colors.blue}
            />
            <Text style={s.big}>{c.temperature_2m}°</Text>
            <Text style={s.heading}>{weatherLabel(c.weather_code)[0]}</Text>
            <Text style={s.muted}>
              Observación: {c.time.replace('T', ' ')} (hora dominicana)
            </Text>
          </Card>
          <Card>
            {[
              ['Sensación térmica', metric(c.apparent_temperature, '°C')],
              ['Humedad', metric(c.relative_humidity_2m, '%')],
              ['Viento', metric(c.wind_speed_10m, 'km/h')],
              [
                'Máxima de hoy',
                metric(q.data.daily.temperature_2m_max[0], '°C'),
              ],
              [
                'Mínima de hoy',
                metric(q.data.daily.temperature_2m_min[0], '°C'),
              ],
              [
                'Probabilidad máxima de lluvia',
                metric(q.data.daily.precipitation_probability_max?.[0], '%'),
              ],
            ].map(([label, value]) => (
              <View key={label}>
                <Text style={s.muted}>{label}</Text>
                <Text style={s.heading}>{value}</Text>
              </View>
            ))}
          </Card>
        </>
      )}
      <Button
        title="Actualizar clima"
        onPress={() => run(getWeather)}
        disabled={q.loading}
      />
      <Button
        title="Datos meteorológicos: Open-Meteo"
        onPress={() => openLink('https://open-meteo.com/')}
      />
    </Page>
  );
}
