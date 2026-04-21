import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { API_URL } from '../services/api';

export default function CadastrarProduto({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [marca, setMarca] = useState('');
  const [valor, setValor] = useState('');
  const [descricao, setDescricao] = useState('');

  async function handleSalvar() {
    // 1. Validação simples no lado do frontend
    if (!titulo || !marca || !valor) {
      window.alert("Erro: Título, Marca e Valor são obrigatórios!");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo,
          marca,
          valor: parseFloat(valor), // Converte para número
          descricao
        }),
      });

      // 2. Verifica se a resposta foi sucesso (201)
      if (response.status === 201) {
        window.alert("Sucesso: Produto cadastrado com sucesso!");
        // Requisito: Retornar para a tela inicial
        navigation.navigate('Home'); 
      } else {
        // 3. Captura erro de validação do backend
        const erroData = await response.json();
        window.alert("Erro: " + (erroData.message || "Falha ao cadastrar."));
      }
    } catch (error) {
      window.alert("Erro: Não foi possível conectar ao servidor.");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Título" value={titulo} onChangeText={setTitulo} />
      <TextInput style={styles.input} placeholder="Marca" value={marca} onChangeText={setMarca} />
      <TextInput style={styles.input} placeholder="Valor" value={valor} keyboardType="numeric" onChangeText={setValor} />
      <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
      <Button title="Salvar Produto" onPress={handleSalvar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});