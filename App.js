import React, { Component } from 'react';
import {
  Platform, View, Text, FlatList, Switch, TextInput, KeyboardAvoidingView,
  StyleSheet, Image, StatusBar, Dimensions, 
  TouchableOpacity, ImageEditor
} from 'react-native';
import AddEntry from './components/AddEntry';
import { getMetricMetaInfo } from './utils/helpers';
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
import TabExample from './components/TabExample'
import StackNavExample from './components/StackNavExample'
import DrawerExample from './components/DrawerExample';
import Live from './components/Live'
import { Animated } from 'react-native'
import { setLocalNotification } from './utils/helpers'
import * as ImagePicker from 'expo-image-picker'; 


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

// export default class App extends Component {
//   state = {
//     opacity: new Animated.Value(0),
//     width: new Animated.Value(0),
//     height: new Animated.Value(0)
//   }
//   componentDidMount() {
//    const { opacity, width, height } = this.state;
//     Animated.timing(opacity,{toValue:1, duration:1000}).start();
//     Animated.spring(width,{toValue: 300, speed:5}).start();
//     Animated.spring(height,{toValue: 300, speed:5}).start();
//   }
//   render() {
//     const { opacity, width, height } = this.state;
//     return (
//       <View style={styles.container}>
//        <Animated.Image style={[styles.image, {opacity, width, height}]}
//          source={{uri: "https://tylermcginnis.com/tyler-mcginnis.jpg"}} ></Animated.Image>
//       </View>

//     );
//   }
// }

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

// image picker
// export default class App extends Component {
//   state={
//     image:null
//   }
//   pickImage = () => {
//     ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowEditing: true,
//       aspect: [2,1]
//     }).then((result)=>{
//       if (result.cancelled) {
//         return;
//       }
     
//       ImageEditor.cropImage(result.uri,{
//         offset:{x:0,y:0},
//         size: {width: result.width, height: result.height},
//         displaySize:{width: 200, height:100},
//         resizeMode:'contain'
//       },
//       (uri) => this.setState(()=>({image: uri})),
//       () => console.log('Error'))
//     })
//   }
//   render() {
//     const {image} = this.state
//     console.log(image)
//    return (
//      <View style={styles.container}>
//           <TouchableOpacity onPress={this.pickImage}>
//             <Text> Open camera roll</Text>
//           </TouchableOpacity>
//           {image && (
//              <Image style={styles.image} source={{uri:image}}/>
//           )}
//      </View>
//    )
//   }
// }




// //navigation example
// export default class App extends Component {
//   render() {

//     return (

//      <DrawerExample/>

//     )
//   }
// }


// How to use images
// export default class App extends Component {

//   render() {
//     return (<View style={styles.container}>
//       <Image style={styles.image} source={require('./any.jpg')}/>
//       <Image style={styles.image} source={{uri: "https://tylermcginnis.com/tyler-mcginnis.jpg"}}/>
//     </View>)
//   }
// }
//const people = [
//  { key: "1", name: "sawsan", occupation: "software engineer" },
//  { key: "2", name: "salwa", occupation: "artist" },
//  { key: "3", name: "ruba", occupation: "marketing manager" }
//];
// how to use lists
// export default class App extends Component {
//   renderData = ({item}) => {
//     return <Text key={item.key} >{item.name}</Text>
//   }
//   render() {
//     debugger;
//     return (
//       <View>
//         <FlatList data={people} renderItem={this.renderData}></FlatList>
//       </View>
//     );
//   }
// }

// How to use forms
/*export default class App extends Component {
  state = {
    input: "saleryan@gmail.com",
    showInput: false
  }
  handleToggleSwitch = () => {
    this.setState((state) => ({
      showInput: !state.showInput
    }));
  }
  handleTextChange = (input) => {
  
    this.setState({input });
  }

  render() {
    const { input, showInput } = this.state;
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text>Hello</Text>
        <Switch
          value={showInput}
          onValueChange={this.handleToggleSwitch}
        />
        {showInput === true && (
          <TextInput
            value={input}
            style={styles.input}
            onChange={this.handleTextChange}
          />
        )}
      </KeyboardAvoidingView>
    );
  }
}*/

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
