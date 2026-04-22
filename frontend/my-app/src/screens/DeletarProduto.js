import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, } from 'react-native';
import { API_URL } from '../services/api';

function ProdutoCard({ produto, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.titulo}>{produto.titulo}</Text>
        <TouchableOpacity
          style={styles.botaoExcluir}
          onPress={() => onDelete(produto.id)}
        >
          <Text style={styles.botaoExcluirTexto}>Excluir</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.marca}>{produto.marca}</Text>
      <Text>{produto.descricao}</Text>
      <Text style={styles.valor}>R$ {produto.valor}</Text>
    </View>
  );
}

export default function DeletarProduto() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const isWeb = Platform.OS === 'web';

  function showAlert(title, message) {
    const text = `${title}: ${message}`;
    if (isWeb) {
      window.alert(text);
    } else {
      Alert.alert(title, message);
    }
  }

  async function carregarProdutos() {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/produtos`);
      const data = await response.json();
      setProdutos(Array.isArray(data) ? data : []);
    } catch (error) {
      showAlert('Erro', 'Não foi possível carregar os produtos.');
    } finally {
      setLoading(false);
    }
  }

  async function excluirProduto(id) {
    setStatus('Excluindo produto...');
    try {
      const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch {
        data = { error: text || 'Resposta inválida do servidor.' };
      }

      if (response.ok) {
        showAlert('Sucesso', 'Produto excluído com sucesso.');
        setStatus('Produto excluído com sucesso.');
        await carregarProdutos();
      } else {
        const errorMessage = data.error || 'Falha ao excluir produto.';
        showAlert('Erro', errorMessage);
        setStatus(errorMessage);
      }
    } catch (error) {
      showAlert('Erro', 'Não foi possível conectar ao servidor.');
      setStatus('Não foi possível conectar ao servidor.');
    }
  }

  function confirmarExclusao(id) {
    if (isWeb) {
      const confirmed = window.confirm(
        'Deseja realmente excluir este produto?'
      );
      if (confirmed) {
        excluirProduto(id);
      }
    } else {
      Alert.alert('Confirmação', 'Deseja realmente excluir este produto?', [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => excluirProduto(id),
        },
      ]);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.tituloTela}>Excluir produto</Text>
      <Text style={styles.subtitulo}>
        Toque em um produto para removê-lo do banco.
      </Text>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#5e71c2"
          style={styles.spinner}
        />
      ) : produtos.length === 0 ? (
        <Text style={styles.mensagem}>
          Nenhum produto disponível para exclusão.
        </Text>
      ) : (
        <>
          <FlatList
            data={produtos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProdutoCard
                produto={item}
                onDelete={confirmarExclusao}
              />
            )}
            contentContainerStyle={styles.lista}
          />
          {status ? <Text style={styles.status}>{status}</Text> : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, width: '80%', alignSelf: 'center' },
  tituloTela: { fontSize: 25, fontWeight: 'bold', textAlign: 'center' },
  subtitulo: { marginBottom: 16, textAlign: 'center' },
  card: { padding: 12, borderWidth: 1, borderRadius: 8, marginBottom: 10, backgroundColor: '#c3dbf738', borderColor: '#5e71c2' },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titulo: { fontWeight: 'bold' },
  marca: { color: '#555' },
  valor: { marginTop: 4, fontWeight: 'bold', color: 'green' },
  botaoExcluir: {
    backgroundColor: '#800e0e',
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  botaoExcluirTexto: { color: '#fff' },
  mensagem: { textAlign: 'center', marginTop: 20 },
  status: { marginTop: 10, textAlign: 'center' },
  lista: { paddingBottom: 20 },
  spinner: { marginTop: 20 },
});