import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PontosTuristicos from './src/telas/PontosTuristicos';
import Descricao from './src/telas/Descricao';
import Album from './src/telas/Album';

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

function Tabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          color = focused ? '#4A90E2' : '#8E8E93';
          size = 24;

          // Ícones modernos e apropriados para cada tela
          if (route.name === 'Descrição') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          } else if (route.name === 'Pontos Turísticos') {
            iconName = focused ? 'location' : 'location-outline';
          } else if (route.name === 'Album Fotos') {
            iconName = focused ? 'images' : 'images-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          paddingTop: 8,
          paddingBottom: Math.max(10, insets.bottom),
          height: 60 + insets.bottom,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Descrição" component={Descricao} />
      <Tab.Screen name="Pontos Turísticos" component={PontosTuristicos} />
      <Tab.Screen name="Album Fotos" component={Album} />
    </Tab.Navigator>
  );
}

export default function App() {
  const Stack = createStackNavigator();
  
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Descricao"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#4A90E2',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 5,
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen 
          name="Descricao" 
          component={Tabs}
          options={{
            title: 'Vale do Ribeira - Turismo',
            headerShown: true,
          }}
        />
        <Stack.Screen 
          name="Pontos Turísticos" 
          component={PontosTuristicos}
          options={{
            title: 'Pontos Turísticos - Vale do Ribeira',
          }}
        />
        <Stack.Screen 
          name="Album Fotos" 
          component={Album} 
          options={{
            title: 'Álbum de Fotos - Vale do Ribeira',
            headerShown: true,
          }}
        />
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
