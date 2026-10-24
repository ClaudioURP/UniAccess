// src/app/_layout.js
// Layout raíz: proveedores globales (sesión y reservas) y navegación por pila
import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { colors } from '../theme';
import { SesionProvider } from '../context/SesionContext';
import { ReservasProvider } from '../context/ReservasContext';

export default function LayoutRaiz() {
  return (
    <SafeAreaProvider>
      <SesionProvider>
        <ReservasProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: colors.background },
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="login" options={{ animation: 'fade' }} />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="ambiente/[id]" />
            <Stack.Screen name="reserva/nueva" />
            <Stack.Screen name="reserva/[id]" />
            <Stack.Screen name="catalogo" />
          </Stack>
        </ReservasProvider>
      </SesionProvider>
    </SafeAreaProvider>
  );
}
