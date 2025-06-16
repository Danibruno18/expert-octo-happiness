import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './app/screens/HomeScreen';
import NovaMetaScreen from './app/screens/NovaMetaScreen';
import DetalheMetaScreen from './app/screens/DetalheMetaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Minhas Metas" component={HomeScreen} />
        <Stack.Screen name="NovaMeta" component={NovaMetaScreen} options={{ title: 'Nova Meta' }} />
        <Stack.Screen name="DetalheMeta" component={DetalheMetaScreen} options={{ title: 'Detalhe da Meta' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// Este é o ponto de entrada do aplicativo React Native.
// Ele configura a navegação entre as telas principais do aplicativo, incluindo a tela inicial,
// a tela para adicionar uma nova meta e a tela de detalhes de uma meta específica.
// O aplicativo utiliza o React Navigation para gerenciar a navegação entre as telas.
// As telas são organizadas em uma pilha, permitindo que o usuário navegue entre elas de forma intuitiva.
// O componente App é o componente raiz do aplicativo, que encapsula toda a lógica de navegação.
// As telas são importadas de um diretório específico, onde cada uma delas é responsável por renderizar
// seu conteúdo específico. A tela inicial exibe as metas existentes, a tela de nova meta permite
// que o usuário adicione uma nova meta, e a tela de detalhes exibe informações detalhadas sobre uma meta selecionada.
// O uso de opções de navegação, como o título das telas, melhora a usabilidade e a experiência do usuário,
// tornando o aplicativo mais intuitivo e fácil de usar.