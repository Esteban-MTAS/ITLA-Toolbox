import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { Feather as Icon } from '@react-native-vector-icons/feather/static';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Page } from '../components/ui';
import { styles as s, colors } from '../theme';
import { modules, RootStackParamList } from '../navigation/routes';
export default function HomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) {
  return (
    <Page>
      <View style={s.hero}>
        <Text style={[s.muted, s.white]}>APRENDE · EXPLORA · CONECTA</Text>
        <Text style={[s.title, s.white]}>Herramientas inteligentes</Text>
        <Text style={[s.text, s.white]}>
          Bienvenido a tu espacio de descubrimiento.
        </Text>
        <Image
          source={require('../../assets/images/toolbox.png')}
          accessibilityLabel="Ilustración de una caja de herramientas"
          style={s.heroImage}
          resizeMode="contain"
        />
      </View>
      <Text style={s.heading}>¿Qué quieres explorar hoy?</Text>
      {modules.map(item => (
        <Pressable
          key={item.route}
          accessibilityRole="button"
          accessibilityLabel={item.title}
          onPress={() => navigation.navigate(item.route)}
          style={[s.card, s.row]}
        >
          <Icon name={item.icon} size={25} color={colors.blue} />
          <View style={s.cardBody}>
            <Text style={s.heading}>{item.title}</Text>
            <Text style={s.muted}>{item.subtitle}</Text>
          </View>
          <Icon name="chevron-right" size={20} color={colors.muted} />
        </Pressable>
      ))}
      <Text style={s.muted}>ITLA Toolbox · Ingeniería con propósito</Text>
    </Page>
  );
}
