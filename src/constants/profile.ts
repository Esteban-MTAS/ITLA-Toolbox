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
  email: '20241860@itla.edu.do',
  phone: '809-888-9621',
  github: 'Esteban-MATS',
  professional: 'Desarrollador de software',
  photo:require('../../assets/images/profile.jpg'),
};
// npm run profile:icon asigna automáticamente assets/images/profile.jpg cuando exista.
