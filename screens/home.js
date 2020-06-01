import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import { Icon, Button } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      id: '',
      class_id: '',
      name: '',
    }
  }

  componentDidMount = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const id = await AsyncStorage.getItem('id');
      const class_id = await AsyncStorage.getItem('class_id');
      const name = await AsyncStorage.getItem('name');
      if (username !== null && id !== null && class_id !== null && name !== null) {
        this.setState({
          username: username,
          id: id,
          class_id: class_id,
          name: name,
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { navigation } = this.props
    const { username, id, class_id, name, } = this.state
    const { container, menu, menuBtn, row, col, footer, icon, center, } = styles
    return (
      <View style={container}>
        <View style={menu}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: "8%",
              fontWeight: 'bold',
              paddingBottom: '2%',
              borderBottomWidth: 2,
              borderColor: '#d6d7da',
            }}>{name}</Text>
          <ScrollView>

            <View style={row}>
              <View style={col}>
                <TouchableOpacity onPress={() => navigation.navigate('Attendance', {
                  id: id,
                })} style={menuBtn}>
                  <Image style={{ paddingHorizontal: '5%' }} source={require('../assets/icon/ic_menu_02.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Diary', {
                  id: id,
                })} style={menuBtn}>
                  <Image style={{ paddingHorizontal: '5%' }} source={require('../assets/icon/ic_menu_09.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Notice')} style={menuBtn}>
                  <Image style={{ paddingHorizontal: '5%' }} source={require('../assets/icon/ic_menu_10.png')} />
                </TouchableOpacity>
              </View>
              <View style={col}>
                <TouchableOpacity onPress={() => navigation.navigate('Result', {
                  id: id,
                })} style={menuBtn}>
                  <Image style={{ paddingHorizontal: '5%' }} source={require('../assets/icon/ic_menu_04.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={menuBtn} onPress={() => navigation.navigate('Fees', {
                  id: id,
                })}>
                  <Image style={{ paddingHorizontal: '5%' }} source={require('../assets/icon/ic_menu_06.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={menuBtn} onPress={() => navigation.navigate('Exam', {
                  class_id: class_id
                })}>
                  <Image style={{ paddingHorizontal: '5%' }} source={require('../assets/icon/ic_menu_03.png')} />
                </TouchableOpacity>
              </View>
              <View style={col}>
                <TouchableOpacity onPress={() => navigation.navigate('Holiday')} style={menuBtn}>
                  <Image style={{ paddingHorizontal: '5%' }} source={require('../assets/icon/ic_menu_07.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={menuBtn} onPress={() => navigation.navigate('Fees', {
                  id: id,
                })} transparent>
                  <Image style={{ paddingHorizontal: '5%' }} source={require('../assets/icon/ic_menu_01.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={menuBtn} onPress={() => navigation.navigate('Downloads')} transparent>
                  <Image style={{ paddingHorizontal: '5%' }} source={require('../assets/icon/ic_menu_08.png')} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={footer}>
          <Button onPress={() => navigation.navigate('Home')} transparent>
            <Icon name='home' style={icon} />
          </Button>
          <Button onPress={() => navigation.navigate('Setting', {
            username: username,
          })} transparent>
            <Icon name='person' style={icon} />
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    color: '#000',
    justifyContent: 'flex-start',
    paddingTop: '10%'
  },
  //Menu CSS
  menu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  menuBtn: {
    borderColor: '#d6d7da',
    padding: '5%',
  },
  row: {
    alignItems: 'center'
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Footer Css
  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#475670',
    padding: 5,
    paddingHorizontal: 80,
    position: "absolute",
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between'
  },
  icon: {
    color: '#fff',
    fontSize: 30
  },
  center: {
    textAlign: 'center'
  }
});
