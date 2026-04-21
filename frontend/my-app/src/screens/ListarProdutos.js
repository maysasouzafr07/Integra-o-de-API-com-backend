import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { API_URL } from '../services/api';

export default function ListarProdutos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/produtos`)
      .then(response => response.json())
      .then(data => setProdutos(data))
      .catch(error => console.error("Erro:", error));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={produtos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text>{item.marca}</Text>
            <Text>{item.descricao}</Text>
            <Text style={styles.valor}>R$ {item.valor}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: { padding: 15, marginBottom: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 },
  titulo: { fontSize: 18, fontWeight: 'bold' },
  valor: { color: 'green', fontWeight: 'bold' }
});