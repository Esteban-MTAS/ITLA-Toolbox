import { Alert, Linking } from 'react-native';
export async function openLink(url: string) {
  if (!/^(https?:\/\/|mailto:|tel:)/i.test(url)) {
    Alert.alert(
      'Enlace no válido',
      'El servicio no proporcionó una dirección válida.',
    );
    return;
  }
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(
      'No se pudo abrir',
      'No hay una aplicación disponible para abrir este enlace.',
    );
  }
}
