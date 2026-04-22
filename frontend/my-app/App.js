import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importe as telas que você já criou nas pastas
import Home from './src/screens/Home';
import ListarProdutos from './src/screens/ListarProdutos';
import CadastrarProduto from './src/screens/CadastrarProduto';
import DeletarProduto from './src/screens/DeletarProduto';
import Sobre from './src/screens/Sobre';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Listar" component={ListarProdutos} />
        <Stack.Screen name="Cadastrar" component={CadastrarProduto} />
        <Stack.Screen name="Deletar" component={DeletarProduto} />
        <Stack.Screen name="Sobre" component={Sobre} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}