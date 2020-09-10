import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import {
     View, Text,StyleSheet, TouchableOpacity
  } from 'react-native';

// tab/stack navigation example.
const Hello = ({navigation}) => (
  <View style={styles.container}>
    <Text>Hello!</Text>
    
  </View>
);

const Goodbye = () => (
  <View style={styles.container}>
    <Text>Goodbye!</Text>
  </View>
);

const TabExample = createAppContainer(createBottomTabNavigator({
  Home: {
    screen: Hello,
    navigationOptions: {
      tabBarIcon: () => <FontAwesome name='home' size={30} color='black'/>
    }

  },
  Dashboard: {
    screen: Goodbye,
    navigationOptions: {
      tabBarIcon: () => <FontAwesome name='dashboard' size={30} color='black'/>
    }

  }
}))

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    }
  });

export default TabExample;