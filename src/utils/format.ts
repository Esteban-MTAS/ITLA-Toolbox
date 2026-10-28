import type { FeatherIconName } from '@react-native-vector-icons/feather';
import { decode } from 'html-entities';
export function plainText(html: string) {
  return decode(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();
}
export function dateES(value: string) {
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? 'Fecha no disponible'
    : d.toLocaleDateString('es-DO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'America/Santo_Domingo',
      });
}
export function weatherLabel(code: number): [string, FeatherIconName] {
  if (code === 0) {
    return ['Cielo despejado', 'sun'];
  }
  if (code <= 3) {
    return ['Parcialmente nublado', 'cloud'];
  }
  if ([45, 48].includes(code)) {
    return ['Niebla', 'cloud'];
  }
  if ([51, 53, 55, 56, 57].includes(code)) {
    return ['Llovizna', 'cloud-drizzle'];
  }
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return ['Lluvia', 'cloud-rain'];
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return ['Nieve', 'cloud-snow'];
  }
  if ([95, 96, 99].includes(code)) {
    return ['Tormenta eléctrica', 'cloud-lightning'];
  }
  return ['Condición no disponible', 'cloud'];
}
export const metric = (value: number | null | undefined, unit: string) =>
  value == null ? 'No disponible' : value + ' ' + unit;
