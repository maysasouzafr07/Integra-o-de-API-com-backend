import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const criadores = [
  {
    nome: 'Maysa Ferreira de Souza',
    foto: require('../../assets/maysa.jpeg'),
    descricao: 'Me chamo Maysa, tenho 16 anos e faço parte da turma do 3º ano de Informática. Neste projeto, fiquei responsável pelo backend, que é justamente a área que mais me interessa e na qual pretendo construir minha carreira.',
  },
  {
    nome: 'João Victor Souza',
    foto: require('../../assets/joao.jpeg'),
    descricao: 'Me chamo João Victor, tenho 17 anos e faço parte da turma do 3º ano de Informática. Neste projeto, fiquei responsável pelo frontend, msid especificamente no polimento das telas e UI.',
  },
];

function CardCriador({ nome, foto, descricao }) {
  return (
    <View style={styles.card}>
      <Image source={foto} style={styles.foto} resizeMode="cover" />
      <View style={{ flex: 1, gap: 6 }}>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.descricao}>{descricao}</Text>
      </View>
    </View>
  );
}

export default function Sobre({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Sobre os criadores</Text>
        <Text style={styles.subtitulo}>Conheça a equipe por trás do projeto</Text>
      </View>

      {criadores.map((criador, index) => (
        <CardCriador
          key={index}
          nome={criador.nome}
          foto={criador.foto}
          descricao={criador.descricao}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 30 },
  header: { alignItems: 'center', gap: 6 },
  titulo: { fontSize: 35, fontWeight: 'bold', textAlign: 'center' },
  subtitulo: { fontSize: 14, textAlign: 'center', color: '#555' },
  card: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#fff', borderRadius: 16, padding: 16, elevation: 4 },
  cardInvertido: { flexDirection: 'column' },
  foto: { width:150, height: 150, borderRadius: 80, borderWidth: 3, borderColor: '#5e71c2' },
  descricao: { flex: 1, fontSize: 15, color: '#333', lineHeight: 20 },
  nome: { fontSize: 15, fontWeight: 'bold', color: '#5e71c2' },
});