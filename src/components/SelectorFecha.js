// src/components/SelectorFecha.js
// Componente de Entrada: Tira horizontal de días para elegir la fecha de reserva
import React from 'react';
import { ScrollView, Pressable, Text, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

export default function SelectorFecha({ dias = [], fechaSeleccionada, onChange, style }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.fila, style]}
    >
      {dias.map((dia) => {
        const activo = dia.iso === fechaSeleccionada;

        return (
          <Pressable
            key={dia.iso}
            onPress={() => onChange && onChange(dia.iso)}
            accessibilityRole="button"
            accessibilityState={{ selected: activo }}
            style={({ pressed }) => [
              styles.dia,
              activo && styles.diaActivo,
              pressed && !activo && styles.diaPresionado,
            ]}
          >
            <Text style={[styles.diaSemana, activo && styles.textoActivo]}>
              {dia.esHoy ? 'Hoy' : dia.diaSemana}
            </Text>
            <Text style={[styles.diaNumero, activo && styles.textoActivo]}>{dia.diaNumero}</Text>
            <Text style={[styles.mes, activo && styles.textoActivo]}>{dia.mesCorto}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fila: {
    gap: spacing.sm,
    paddingVertical: spacing.xs,
  },
  dia: {
    width: 62,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: 'center',
  },
  diaActivo: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  diaPresionado: {
    backgroundColor: colors.primaryLight,
  },
  diaSemana: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
    color: colors.textSecondary,
  },
  diaNumero: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginVertical: 1,
  },
  mes: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  textoActivo: {
    color: colors.textInverted,
  },
});
