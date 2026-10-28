import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, Page, SearchInput, Status } from '../components/ui';
import { useRequest } from '../hooks/useRequest';
import { GenderResponse } from '../types/api';
import { getGender } from '../services/genderService';
import { styles as s } from '../theme';
export default function GenderScreen() {
  const [name, setName] = useState('');
  const q = useRequest<GenderResponse>();
  const search = () => q.run(signal => getGender(name, signal));
  return (
    <Page>
      <Text style={s.title}>Un nombre, una estimación</Text>
      <Text style={s.muted}>
        Explora las estadísticas de nombres con Genderize.
      </Text>
      <SearchInput
        label="Nombre"
        value={name}
        onChangeText={setName}
        onSubmit={search}
      />
      <Button title="Predecir género" onPress={search} disabled={q.loading} />
      <Status {...q} />
      {q.data && (
        <View
          style={[
            s.card,
            q.data.gender === 'male'
              ? s.male
              : q.data.gender === 'female'
              ? s.female
              : s.neutral,
          ]}
        >
          <Text style={s.heading}>{q.data.name}</Text>
          <Text style={s.title}>
            {q.data.gender === 'male'
              ? 'Masculino'
              : q.data.gender === 'female'
              ? 'Femenino'
              : 'Información insuficiente'}
          </Text>
          {q.data.probability != null && (
            <Text style={s.text}>
              Probabilidad: {Math.round(q.data.probability * 100)} %
            </Text>
          )}
        </View>
      )}
      <Text style={s.muted}>
        Es una estimación estadística basada en nombres. No identifica ni
        determina el género de una persona.
      </Text>
    </Page>
  );
}
