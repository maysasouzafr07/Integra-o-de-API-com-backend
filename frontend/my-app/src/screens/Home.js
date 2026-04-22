import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
function BotaoCustom({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.botao} onPress={onPress}>
      <Text style={styles.botaoTexto}>{title}</Text>
    </TouchableOpacity>
  );
}
export default function Home({ navigation }) {
  return (  
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../../assets/logo_if.png')}/>
      <Text style={styles.texto}>Bem-vindo ao cadastrador de produtos!</Text>
      <BotaoCustom title="Listar produtos" onPress={() => navigation.navigate('Listar')} />
      <BotaoCustom title="Cadastrar novo produto" onPress={() => navigation.navigate('Cadastrar')} />
      <BotaoCustom title="Excluir produto" onPress={() => navigation.navigate('Deletar')} />
      <BotaoCustom title="Sobre os criadores" onPress={() => navigation.navigate('Sobre')} />
    </View>
  );
}
const styles = StyleSheet.create({
  logo: { width: 350, height: 100, alignSelf: 'center', marginBottom: 20 },
  container: { flex: 1, justifyContent: 'center', gap: 20, padding: 10, width: '65%', alignSelf: 'center' },
  texto: { textAlign: 'center', fontSize: 30, marginBottom: 15, fontWeight: 'bold' },
  botao: { backgroundColor: '#5e71c2', borderRadius: 50, padding: 10, alignItems: 'center' },
  botaoTexto: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
});