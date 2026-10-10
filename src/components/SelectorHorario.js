// src/components/SelectorHorario.js
// Componente de Entrada / Selector: Selección de bloque de horario disponible
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

export default function SelectorHorario({
  horarios = [],
  horarioSeleccionado,
  onChange,
  style,
}) {
  return (
    <View style={[styles.contenedor, style]}>
      <View style={styles.cuadricula}>
        {horarios.map((item) => {
          const estaSeleccionado = horarioSeleccionado === item.hora;
          const estaOcupado = !item.disponible;

          return (
            <Pressable
              key={item.hora}
              disabled={estaOcupado}
              onPress={() => onChange && onChange(item.hora)}
              accessibilityRole="button"
              accessibilityState={{ selected: estaSeleccionado, disabled: estaOcupado }}
              style={({ pressed }) => [
                styles.celda,
                estaSeleccionado && styles.celdaSeleccionada,
                estaOcupado && styles.celdaOcupada,
                pressed && !estaOcupado && styles.celdaPresionada,
              ]}
            >
              <Text
                style={[
                  styles.textoHora,
                  estaSeleccionado && styles.textoHoraSeleccionada,
                  estaOcupado && styles.textoHoraOcupada,
                ]}
              >
                {item.hora}
              </Text>
              <Text
                style={[
                  styles.textoEstado,
                  estaSeleccionado && styles.textoEstadoSeleccionado,
                  estaOcupado && styles.textoEstadoOcupado,
                ]}
              >
                {estaOcupado ? 'Ocupado' : 'Disponible'}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
  },
  cuadricula: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  celda: {
    flexBasis: '30%',
    flexGrow: 1,
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  celdaSeleccionada: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  celdaOcupada: {
    backgroundColor: colors.surfaceSubtle,
    borderColor: colors.borderSubtle,
    opacity: 0.55,
  },
  celdaPresionada: {
    opacity: 0.8,
  },
  textoHora: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
  textoHoraSeleccionada: {
    color: colors.textInverted,
  },
  textoHoraOcupada: {
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  textoEstado: {
    fontSize: fontSize.xs,
    color: colors.availableText,
    fontWeight: fontWeight.medium,
    marginTop: 2,
  },
  textoEstadoSeleccionado: {
    color: colors.textInverted,
  },
  textoEstadoOcupado: {
    color: colors.textMuted,
  },
});
