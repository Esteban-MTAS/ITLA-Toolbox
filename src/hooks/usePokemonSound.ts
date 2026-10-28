import { useCallback, useEffect, useRef, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AppState } from 'react-native';
import Sound from 'react-native-sound';
export function usePokemonSound(url: string | null | undefined) {
  const sound = useRef<Sound | null>(null);
  const generation = useRef(0);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const stop = useCallback(() => {
    generation.current++;
    sound.current?.release();
    sound.current = null;
    setPlaying(false);
  }, []);
  useEffect(() => {
    setError(null);
    stop();
    return stop;
  }, [url, stop]);
  useFocusEffect(useCallback(() => () => stop(), [stop]));
  useEffect(() => {
    const sub = AppState.addEventListener('change', state => {
      if (state !== 'active') {
        stop();
      }
    });
    return () => sub.remove();
  }, [stop]);
  const play = () => {
    if (!url) {
      return;
    }
    stop();
    const id = generation.current;
    setPlaying(true);
    setError(null);
    const clip = new Sound(url, '', err => {
      if (id !== generation.current) {
        clip.release();
        return;
      }
      if (err) {
        setError('No se pudo cargar el sonido. Comprueba la conexión.');
        stop();
        return;
      }
      clip.play(success => {
        if (id !== generation.current) {
          return;
        }
        if (!success) {
          setError('No se pudo reproducir el sonido.');
        }
        stop();
      });
    });
    sound.current = clip;
  };
  return { play, stop, playing, error };
}
