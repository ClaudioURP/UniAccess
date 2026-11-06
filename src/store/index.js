// src/store/index.js
// Configuración centralizada del Store de Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';
import reservasReducer from './reservasSlice';

export const store = configureStore({
  reducer: {
    reservas: reservasReducer,
  },
});

export default store;
