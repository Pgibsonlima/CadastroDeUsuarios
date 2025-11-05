import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen'
import CadastroScrren from './src/screens/CadastroScreen'
import ListaScreen from './src/screens/ListaScreen'
import DetalhesScreens from './src/screens/DetalhesScreens'

const Stack = createNativeStackNavigator();

export default function App() {


  return (
  
   <NavigationContainer>
      <Stack.Navigator initialRouteName = 'Home'>
          <Stack.Screen name='Home' component ={HomeScreen}/>
          <Stack.Screen name='Cadastro' component={CadastroScrren}/>
          <Stack.Screen name='Lista' component={ListaScreen}/>
          <Stack.Screen name='Detalhes' component={DetalhesScreens}/>
      </Stack.Navigator>
   </NavigationContainer>
   
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
