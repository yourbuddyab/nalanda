import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class App extends Component {
  dialCall = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${9462945827}';
    }
    else {
      phoneNumber = 'telprompt:${9462945827}';
    }

    Linking.openURL(phoneNumber);
  };
  render() {
    const { container, adminnumber } = styles
    return (
      <View style={container}>
        <Image style={{ marginTop: 40 }} source={require('../assets/splash.png')}></Image>
        <View style={adminnumber}>
          <Text style={{ fontSize: 25, color: '#fff' }}>School Administration</Text>
          <TouchableOpacity><Text onPress={this.dialCall} style={{ padding: 10, fontSize: 20, color: '#000', fontWeight: 'bold', borderRadius: 40, backgroundColor: '#c3c2c1' }}>+91 9829590091</Text></TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#004677'
  },
  adminnumber: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100
  }
});
