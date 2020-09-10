import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import {
     View, Text,StyleSheet, TouchableOpacity
  } from 'react-native';

// tab/stack navigation example.
const Hello = ({navigation}) => (
  <View style={styles.container}>
    <Text>Hello!</Text>
    <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
      <Text>Click Here</Text>
    </TouchableOpacity>
    
  </View>
);

const Goodbye = () => (
  <View style={styles.container}>
    <Text>Goodbye!</Text>
  </View>
);

 const StackNavExample = createAppContainer(createStackNavigator({
    Home: {
      screen: Hello
    },
    Dashboard: {
      screen: Goodbye,
      navigationOptions: {
        title: 'Dashboard',
        headerTintColor:'red'
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

export default StackNavExample;