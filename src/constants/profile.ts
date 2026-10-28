import { ImageSourcePropType } from 'react-native';
export const profile: {
  name: string;
  studentId: string;
  institution: string;
  area: string;
  email: string;
  phone: string;
  github: string;
  professional: string;
  photo: ImageSourcePropType | undefined;
} = {
  name: 'Esteban Josué Mata Acosta',
  studentId: '20241860',
  institution: 'Instituto Tecnológico de las Américas (ITLA)',
  area: 'Desarrollo de software y aplicaciones móviles',
  email: '',
  phone: '',
  github: '',
  professional: '',
  photo: undefined,
};
// npm run profile:icon asigna automáticamente assets/images/profile.jpg cuando exista.
