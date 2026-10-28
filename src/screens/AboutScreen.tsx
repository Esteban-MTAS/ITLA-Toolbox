import React from 'react';
import { Text } from 'react-native';
import { Button, Card, Page, Picture } from '../components/ui';
import { profile } from '../constants/profile';
import { openLink } from '../utils/links';
import { styles as s } from '../theme';
export default function AboutScreen() {
  return (
    <Page>
      <Text style={s.title}>Construyendo soluciones</Text>
      <Card>
        {profile.photo ? (
          <Picture source={profile.photo} label="Fotografía de Esteban" />
        ) : (
          <Text style={s.big}>EM</Text>
        )}
        <Text style={s.title}>{profile.name}</Text>
        <Text style={s.heading}>{profile.area}</Text>
        <Text style={s.text}>
          Estudiante de desarrollo de software. Este proyecto reúne integración
          de servicios REST, interfaces móviles y herramientas útiles en una
          experiencia Android.
        </Text>
        <Text style={s.muted}>Matrícula: {profile.studentId}</Text>
        <Text style={s.muted}>{profile.institution}</Text>
      </Card>
      <Card>
        <Text style={s.heading}>ITLA Toolbox</Text>
        <Text style={s.text}>
          Herramientas Inteligentes · Proyecto académico
        </Text>
        {[
          [profile.email, 'Enviar correo', 'mailto:' + profile.email],
          [profile.phone, 'Llamar', 'tel:' + profile.phone],
          [profile.github, 'GitHub', profile.github],
          [profile.professional, 'Perfil profesional', profile.professional],
        ]
          .filter(([value]) => !!value)
          .map(([, label, url]) => (
            <Button key={label} title={label!} onPress={() => openLink(url!)} />
          ))}
        {!profile.email &&
          !profile.phone &&
          !profile.github &&
          !profile.professional && (
            <Text style={s.muted}>
              Información de contacto pendiente de configurar.
            </Text>
          )}
      </Card>
    </Page>
  );
}
