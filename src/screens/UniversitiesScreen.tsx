import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, SearchInput, Status } from '../components/ui';
import { useRequest } from '../hooks/useRequest';
import { University } from '../types/api';
import { getUniversities } from '../services/universityService';
import { openLink } from '../utils/links';
import { styles as s } from '../theme';
export default function UniversitiesScreen() {
  const [country, setCountry] = useState('Dominican Republic');
  const q = useRequest<University[]>();
  const search = () => q.run(signal => getUniversities(country, signal));
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={s.page}>
      <FlatList
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={s.content}
        data={q.data ?? []}
        keyExtractor={(item, index) => item.name + index}
        ListHeaderComponent={
          <View style={s.gap16}>
            <Text style={s.title}>Tu próximo destino</Text>
            <Text style={s.muted}>
              Escribe el país en inglés: Dominican Republic, United States,
              Canada o Spain.
            </Text>
            <SearchInput
              label="País en inglés"
              value={country}
              onChangeText={setCountry}
              onSubmit={search}
            />
            <Button
              title="Buscar universidades"
              onPress={search}
              disabled={q.loading}
            />
            <Status {...q} />
            {q.data && (
              <Text style={s.muted}>
                {q.data.length} universidades encontradas
              </Text>
            )}
          </View>
        }
        ListEmptyComponent={
          q.data && !q.loading ? (
            <Text style={s.text}>
              No encontramos universidades para ese país.
            </Text>
          ) : undefined
        }
        renderItem={({ item }) => (
          <Card>
            <Text style={s.heading}>{item.name}</Text>
            <Text style={s.muted}>
              {item.domains.join(' · ') || 'Dominio no disponible'}
            </Text>
            {item.web_pages.map((url, index) => (
              <Button
                key={url + index}
                title={'Visitar ' + (item.domains[index] ?? 'sitio web')}
                onPress={() => openLink(url)}
              />
            ))}
          </Card>
        )}
      />
    </SafeAreaView>
  );
}
