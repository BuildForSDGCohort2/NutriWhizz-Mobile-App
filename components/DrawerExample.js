
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer';
import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import {
     View, Text,StyleSheet, TouchableOpacity
  } from 'react-native';

//tab  navigation
const Home = ({ navigation }) => (
    <View style={styles.container}>
      <Text>This is the Home view</Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text>Press here to open the drawer!</Text>
      </TouchableOpacity>
    </View>
  );
  
  const Dashboard = ({ navigation }) => (
    <View style={styles.container}>
      <Text>This is the Dashboard view</Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text>Press here to open the drawer!</Text>
      </TouchableOpacity>
    </View>
  );
  
  const DrawerExample = createAppContainer(createDrawerNavigator({
    Home: {
      screen: Home,
    },
    Dashboard: {
      screen: Dashboard
  
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

  export default DrawerExample;