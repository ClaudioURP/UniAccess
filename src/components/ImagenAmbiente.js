// src/components/ImagenAmbiente.js
// Componente de Contenedor: Imagen remota del ambiente con respaldo visual local.
// Si la imagen no carga (sin conexión o URL caída) se muestra un marcador con la
// identidad de CESPAR URP en lugar de un espacio vacío.
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fontSize, fontWeight, radius, spacing } from '../theme';

export default function ImagenAmbiente({
  url,
  icono = 'football-outline',
  style,
  children,
  altura = 150,
}) {
  const [fallo, setFallo] = useState(false);

  return (
    <View style={[styles.contenedor, { height: altura }, style]}>
      {!fallo && url ? (
        <Image
          source={{ uri: url }}
          style={styles.imagen}
          resizeMode="cover"
          onError={() => setFallo(true)}
        />
      ) : (
        <View style={styles.respaldo}>
          <Ionicons name={icono} size={30} color={colors.primary} />
          <Text style={styles.textoRespaldo}>CESPAR URP</Text>
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    width: '100%',
    backgroundColor: colors.surfaceHighlight,
    position: 'relative',
  },
  imagen: {
    width: '100%',
    height: '100%',
  },
  respaldo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  textoRespaldo: {
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    letterSpacing: 1,
  },
});
