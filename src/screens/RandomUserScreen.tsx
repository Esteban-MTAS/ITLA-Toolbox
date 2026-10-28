import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Button, Card, Page, Picture, Status } from '../components/ui';
import { useRequest } from '../hooks/useRequest';
import { Person } from '../types/api';
import { getPerson } from '../services/randomUserService';
import { dateES } from '../utils/format';
import { styles as s } from '../theme';
export default function RandomUserScreen() {
  const q = useRequest<Person>();
  const { run } = q;
  useEffect(() => {
    run(getPerson);
  }, [run]);
  return (
    <Page>
      <Text style={s.title}>Conoce un nuevo perfil</Text>
      <Text style={s.muted}>Personas de prueba generadas por Random User.</Text>
      <Status {...q} />
      {q.data && (
        <Card>
          <Picture
            key={q.data.picture?.large}
            source={q.data.picture ? { uri: q.data.picture.large } : undefined}
            label="Fotografía de la persona aleatoria"
          />
          <Text style={s.title}>
            {q.data.name.first} {q.data.name.last}
          </Text>
          <Text style={s.text}>Nacimiento: {dateES(q.data.dob.date)}</Text>
          <Text style={s.text}>Edad: {q.data.dob.age} años</Text>
        </Card>
      )}
      <Button
        title="Generar otra persona"
        onPress={() => run(getPerson)}
        disabled={q.loading}
      />
    </Page>
  );
}
