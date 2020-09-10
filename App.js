import React, { Component } from 'react';
import {
  Platform, View,
  StyleSheet, StatusBar, Dimensions
} from 'react-native';
import AddEntry from './components/AddEntry';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import History from './components/History'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { purple, white, limegreen } from './utils/colors';
import Constants from 'expo-constants'
import EntryDetail from './components/EntryDetail';
import Live from './components/Live'
import { setLocalNotification } from './utils/helpers';


function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createAppContainer(createBottomTabNavigator({
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel: 'History',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddEntry: {
    screen: AddEntry,
    navigationOptions: {
      tabBarLabel: 'Add Entry',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  },
  Live: {
    screen: Live,
    navigationOptions: {
      tabBarLabel: 'Live',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? limegreen : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : limegreen,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
}));

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n and ' + 'Shake or press menu button for dev menu',
});


const MainNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: limegreen,
      },
      headerTitleStyle: { width: Dimensions.get("window").width }
    }
  }
}));

/* view takes up full space when flex=1 */
export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }
  render() {
    const store = createStore(reducer);
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
        <UdaciStatusBar backgroundColor={limegreen} barStyle="light-content" />
          <MainNavigator/>
        </View>
      </Provider>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    color: "black",

  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
});
