// src/components/CampoBusqueda.js
// Componente de Entrada: Buscador de texto controlado para servicios e instalaciones
import React from 'react';
import { TextInput, View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

export default function CampoBusqueda({
  valor,
  onChangeText,
  placeholder = 'Buscar canchas, salas, laboratorios...',
  onLimpiar,
  onSubmit,
  style,
}) {
  const manejarLimpieza = () => {
    if (onLimpiar) {
      onLimpiar();
    } else if (onChangeText) {
      onChangeText('');
    }
  };

  const manejarEnvio = () => {
    if (onSubmit) {
      onSubmit(valor);
    }
  };

  return (
    <View style={[styles.contenedor, style]}>
      <Text style={styles.iconoBuscar}>🔍</Text>
      <TextInput
        value={valor}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        returnKeyType="search"
        onSubmitEditing={manejarEnvio}
        style={styles.input}
      />
      {Boolean(valor && valor.length > 0) && (
        <Pressable
          onPress={manejarLimpieza}
          hitSlop={8}
          accessibilityLabel="Limpiar búsqueda"
          style={({ pressed }) => [styles.botonLimpiar, pressed && styles.botonLimpiarPresionado]}
        >
          <Text style={styles.textoLimpiar}>✕</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  iconoBuscar: {
    fontSize: fontSize.md,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: fontSize.md,
    color: colors.text,
    paddingVertical: 0,
  },
  botonLimpiar: {
    width: 22,
    height: 22,
    borderRadius: radius.full,
    backgroundColor: colors.surfaceSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs,
  },
  botonLimpiarPresionado: {
    opacity: 0.6,
  },
  textoLimpiar: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: fontWeight.bold,
  },
});
