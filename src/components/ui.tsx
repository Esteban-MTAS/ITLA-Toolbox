import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, styles as s } from '../theme';
export function Page({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={s.page}>
      <KeyboardAvoidingView
        style={s.page}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={s.content}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export function Card({ children }: { children: React.ReactNode }) {
  return <View style={s.card}>{children}</View>;
}
export function Button({
  title,
  onPress,
  disabled = false,
}: {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      onPress={onPress}
      disabled={disabled}
      style={[s.button, disabled && s.disabled]}
    >
      <Text style={s.buttonText}>{title}</Text>
    </Pressable>
  );
}
export function SearchInput({
  value,
  onChangeText,
  label,
  onSubmit,
}: {
  value: string;
  onChangeText: (v: string) => void;
  label: string;
  onSubmit: () => void;
}) {
  return (
    <View style={s.gap8}>
      <Text style={s.muted}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        returnKeyType="search"
        autoCorrect={false}
        maxLength={100}
        style={s.input}
      />
    </View>
  );
}
export function Status({
  loading,
  error,
}: {
  loading: boolean;
  error: string | null;
}) {
  return (
    <>
      {loading && (
        <View accessibilityLiveRegion="polite" style={s.row}>
          <ActivityIndicator color={colors.blue} />
          <Text style={s.muted}>Consultando datos…</Text>
        </View>
      )}
      {!!error && (
        <Text accessibilityRole="alert" style={[s.text, s.error]}>
          {error}
        </Text>
      )}
    </>
  );
}
export function Picture({
  source,
  label,
}: {
  source: ImageSourcePropType | undefined;
  label: string;
}) {
  const [failed, setFailed] = useState(false);
  return source && !failed ? (
    <Image
      source={source}
      accessibilityLabel={label}
      resizeMode="contain"
      onError={() => setFailed(true)}
      style={s.image}
    />
  ) : (
    <Text style={s.muted}>Imagen no disponible</Text>
  );
}
