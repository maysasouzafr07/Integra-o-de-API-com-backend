import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Sobre() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Sobre</Text>
      <Text>Autores: Seu Nome e Colega</Text>
      <Text>Matrículas: 000000 / 000000</Text>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titulo: { fontSize: 20, fontWeight: 'bold' }
});