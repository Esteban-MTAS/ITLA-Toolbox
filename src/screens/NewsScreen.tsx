import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Button, Card, Page, Picture, Status } from '../components/ui';
import { useRequest } from '../hooks/useRequest';
import { Post } from '../types/api';
import { getPosts, NEWS } from '../services/wordpressService';
import { plainText, dateES } from '../utils/format';
import { openLink } from '../utils/links';
import { styles as s } from '../theme';
export default function NewsScreen() {
  const q = useRequest<Post[]>();
  const { run } = q;
  useEffect(() => {
    run(getPosts);
  }, [run]);
  return (
    <Page>
      <Picture source={{ uri: NEWS.logo }} label="Logo oficial de WordPress" />
      <Text style={s.title}>{NEWS.name}</Text>
      <Text style={s.muted}>
        Las tres publicaciones más recientes. Contenido original en inglés.
      </Text>
      <Status {...q} />
      {q.data?.length === 0 && (
        <Text style={s.text}>No hay noticias disponibles.</Text>
      )}
      {q.data?.map(post => (
        <Card key={post.id}>
          <Text style={s.muted}>{dateES(post.date_gmt + 'Z')}</Text>
          <Text style={s.heading}>{plainText(post.title.rendered)}</Text>
          <Text style={s.text}>{plainText(post.excerpt.rendered)}</Text>
          <Button title="Visitar noticia" onPress={() => openLink(post.link)} />
        </Card>
      ))}
      <Button
        title="Actualizar noticias"
        onPress={() => run(getPosts)}
        disabled={q.loading}
      />
    </Page>
  );
}
