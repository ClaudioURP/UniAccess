// src/components/ContenedorPantalla.js
// Componente de Contenedor: Envoltura estándar de pantalla con área segura y scroll
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

export default function ContenedorPantalla({
  children,
  scroll = true,
  style,
  contentContainerStyle,
  edges = ['top'],
}) {
  return (
    <SafeAreaView style={[styles.area, style]} edges={edges}>
      {scroll ? (
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={[styles.contenido, contentContainerStyle]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.scroll, styles.contenidoFlex, contentContainerStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  area: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  contenido: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  contenidoFlex: {
    flex: 1,
    padding: spacing.lg,
  },
});
