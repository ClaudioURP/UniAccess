// src/app/(tabs)/_layout.js
// Navegación inferior principal: Inicio, Explorar, Mis reservas y Perfil
import React from 'react';
import { Redirect, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { colors, fontSize, fontWeight } from '../../theme';
import { useSesion } from '../../context/SesionContext';
import { useReservas } from '../../context/ReservasContext';
import { estadoEfectivo } from '../../utils/reservas';

export default function LayoutTabs() {
  const { usuario, cargando } = useSesion();
  const { reservas } = useReservas();

  if (cargando) return null;
  if (!usuario) return <Redirect href="/login" />;

  const reservasActivas = reservas.filter((reserva) => {
    const estado = estadoEfectivo(reserva);
    return estado === 'confirmada' || estado === 'pendiente';
  }).length;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: fontWeight.semibold,
        },
      }}
    >
      <Tabs.Screen
        name="inicio"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explorar"
        options={{
          title: 'Explorar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reservas"
        options={{
          title: 'Mis reservas',
          tabBarBadge: reservasActivas > 0 ? reservasActivas : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.primary,
            color: colors.textInverted,
            fontSize: fontSize.xs - 2,
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
