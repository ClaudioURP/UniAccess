// src/components/SelectorCantidad.js
// Componente de Entrada: Contador numérico para número de jugadores
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

export default function SelectorCantidad({
  etiqueta = 'Cantidad',
  valor,
  onChange,
  minimo = 1,
  maximo = 30,
  sufijo = '',
  style,
}) {
  const puedeRestar = valor > minimo;
  const puedeSumar = valor < maximo;

  return (
    <View style={[styles.contenedor, style]}>
      <View style={styles.textos}>
        <Text style={styles.etiqueta}>{etiqueta}</Text>
        <Text style={styles.rango}>
          Entre {minimo} y {maximo} {sufijo}
        </Text>
      </View>

      <View style={styles.control}>
        <Pressable
          onPress={() => puedeRestar && onChange(valor - 1)}
          disabled={!puedeRestar}
          accessibilityRole="button"
          accessibilityLabel="Disminuir"
          style={({ pressed }) => [
            styles.boton,
            !puedeRestar && styles.botonInactivo,
            pressed && puedeRestar && styles.botonPresionado,
          ]}
        >
          <Ionicons
            name="remove"
            size={18}
            color={puedeRestar ? colors.primary : colors.disabledText}
          />
        </Pressable>

        <Text style={styles.valor}>{valor}</Text>

        <Pressable
          onPress={() => puedeSumar && onChange(valor + 1)}
          disabled={!puedeSumar}
          accessibilityRole="button"
          accessibilityLabel="Aumentar"
          style={({ pressed }) => [
            styles.boton,
            !puedeSumar && styles.botonInactivo,
            pressed && puedeSumar && styles.botonPresionado,
          ]}
        >
          <Ionicons
            name="add"
            size={18}
            color={puedeSumar ? colors.primary : colors.disabledText}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  textos: {
    flex: 1,
  },
  etiqueta: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    color: colors.text,
  },
  rango: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  control: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  boton: {
    width: 36,
    height: 36,
    borderRadius: radius.full,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonInactivo: {
    backgroundColor: colors.surfaceSubtle,
  },
  botonPresionado: {
    opacity: 0.7,
  },
  valor: {
    minWidth: 34,
    textAlign: 'center',
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    color: colors.text,
  },
});
