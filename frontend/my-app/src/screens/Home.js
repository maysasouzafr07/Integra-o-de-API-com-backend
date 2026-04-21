import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Listar Produtos" onPress={() => navigation.navigate('Listar')} />
      <Button title="Cadastrar Produto" onPress={() => navigation.navigate('Cadastrar')} />
      <Button title="Sobre" onPress={() => navigation.navigate('Sobre')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', gap: 20, padding: 20 }
});