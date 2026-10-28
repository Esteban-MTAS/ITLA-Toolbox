import React, { useState } from 'react';
import { Text } from 'react-native';
import {
  Button,
  Card,
  Page,
  Picture,
  SearchInput,
  Status,
} from '../components/ui';
import { useRequest } from '../hooks/useRequest';
import { usePokemonSound } from '../hooks/usePokemonSound';
import { Pokemon } from '../types/api';
import { getPokemon } from '../services/pokemonService';
import { styles as s } from '../theme';
export default function PokemonScreen() {
  const [name, setName] = useState('pikachu');
  const q = useRequest<Pokemon>();
  const audio = usePokemonSound(q.data?.cries?.latest);
  const search = () => {
    audio.stop();
    q.run(signal => getPokemon(name, signal));
  };
  const image =
    q.data?.sprites.other?.['official-artwork'].front_default ??
    q.data?.sprites.front_default;
  return (
    <Page>
      <Text style={s.title}>Encuentra tu Pokémon</Text>
      <Text style={s.muted}>
        Busca por nombre: pikachu, charizard o bulbasaur.
      </Text>
      <SearchInput
        label="Nombre del Pokémon"
        value={name}
        onChangeText={setName}
        onSubmit={search}
      />
      <Button title="Buscar Pokémon" onPress={search} disabled={q.loading} />
      <Status {...q} />
      {q.data && (
        <Card>
          <Picture
            key={image}
            source={image ? { uri: image } : undefined}
            label={q.data.name}
          />
          <Text style={s.title}>{q.data.name}</Text>
          <Text style={s.text}>
            Experiencia base: {q.data.base_experience ?? 'No disponible'}
          </Text>
          <Text style={s.heading}>Habilidades</Text>
          {q.data.abilities.map(a => (
            <Text key={a.ability.name} style={s.text}>
              • {a.ability.name.replace(/-/g, ' ')}
            </Text>
          ))}
          {q.data.cries?.latest ? (
            <Button
              title={audio.playing ? 'Reproduciendo…' : 'Reproducir sonido'}
              onPress={audio.play}
              disabled={audio.playing}
            />
          ) : (
            <Text style={s.muted}>Sonido no disponible</Text>
          )}
          <Status loading={false} error={audio.error} />
        </Card>
      )}
      <Text style={s.muted}>
        Datos de PokéAPI. Pokémon pertenece a sus respectivos titulares.
      </Text>
    </Page>
  );
}
