// src/app/catalogo.js
// Ruta: Biblioteca de componentes core de UniAccess (LAB-02)
// Expone cada componente con una demostración interactiva para revisiones de UI.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { colors, fontSize, fontWeight, radius, spacing, shadows } from '../theme';
import { CATALOGO } from '../viewer/catalog';
import ContenedorPantalla from '../components/ContenedorPantalla';
import EncabezadoPantalla from '../components/EncabezadoPantalla';

export default function PantallaCatalogo() {
  return (
    <ContenedorPantalla edges={['top']}>
      <EncabezadoPantalla
        titulo="Biblioteca de componentes"
        subtitulo="LAB-02 · Elementos reutilizables de UniAccess"
        mostrarVolver
        onVolver={() => router.back()}
      />

      <Text style={styles.intro}>
        Cada tarjeta muestra un componente del sistema de diseño con su demostración interactiva.
        Forman la base de las vistas de reserva de ambientes del CESPAR.
      </Text>

      {CATALOGO.map((entrada) => (
        <View key={entrada.id} style={[styles.tarjeta, shadows.sm]}>
          <View style={styles.encabezadoTarjeta}>
            <Text style={styles.nombre}>{entrada.name}</Text>
            <Text style={styles.categoria}>{entrada.category}</Text>
          </View>
          <Text style={styles.descripcion}>{entrada.description}</Text>
          <View style={styles.demo}>
            <entrada.Demo />
          </View>
        </View>
      ))}

      <Text style={styles.pie}>
        UniAccess · Universidad Ricardo Palma{'\n'}
        Ambientes administrados por el CESPAR
      </Text>
    </ContenedorPantalla>
  );
}

const styles = StyleSheet.create({
  intro: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 19,
    marginBottom: spacing.xl,
  },
  tarjeta: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  encabezadoTarjeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  nombre: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    flexShrink: 1,
  },
  categoria: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.full,
    marginLeft: spacing.sm,
    overflow: 'hidden',
  },
  descripcion: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 19,
    marginBottom: spacing.lg,
  },
  demo: {
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingTop: spacing.lg,
  },
  pie: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
    lineHeight: 17,
  },
});
