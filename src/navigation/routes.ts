import type { FeatherIconName } from '@react-native-vector-icons/feather';
export type RootStackParamList = {
  Home: undefined;
  Gender: undefined;
  RandomUser: undefined;
  Universities: undefined;
  Weather: undefined;
  Pokemon: undefined;
  News: undefined;
  About: undefined;
};
export const modules: {
  route: Exclude<keyof RootStackParamList, 'Home'>;
  title: string;
  subtitle: string;
  icon: FeatherIconName;
}[] = [
  {
    route: 'Gender',
    title: 'Predicción de género',
    subtitle: 'Una estimación a partir de un nombre',
    icon: 'users',
  },
  {
    route: 'RandomUser',
    title: 'Persona aleatoria',
    subtitle: 'Descubre un nuevo perfil de prueba',
    icon: 'user',
  },
  {
    route: 'Universities',
    title: 'Universidades del mundo',
    subtitle: 'Encuentra dónde seguir aprendiendo',
    icon: 'globe',
  },
  {
    route: 'Weather',
    title: 'Clima de República Dominicana',
    subtitle: 'Santo Domingo, en tiempo real',
    icon: 'cloud',
  },
  {
    route: 'Pokemon',
    title: 'Buscador Pokémon',
    subtitle: 'Explora habilidades y escucha su sonido',
    icon: 'zap',
  },
  {
    route: 'News',
    title: 'Noticias WordPress',
    subtitle: 'Las últimas novedades de la comunidad',
    icon: 'file-text',
  },
  {
    route: 'About',
    title: 'Acerca de',
    subtitle: 'Conoce al desarrollador',
    icon: 'info',
  },
];
