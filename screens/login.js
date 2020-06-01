import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Linking,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { StackActions } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import { Colors } from './Colors';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            status: false,
        }
    }

    submit = async () => {
        this.setState({
            status: true,
        });
        const { username, password } = this.state;
        fetch('http://appadmin.victoriousschool.in/api/student/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            }),
        }).then((response) => response.json())
            .then(async (responseJson) => {
                this.setState({
                    status: false,
                });
                if (responseJson.msg == 'Logged') {
                    await AsyncStorage.setItem('isLoggedIn', '1');
                    await AsyncStorage.setItem('username', username);
                    await AsyncStorage.setItem('id', responseJson.studentDetails.id.toString());
                    await AsyncStorage.setItem('class_id', responseJson.studentDetails.class_id.toString());
                    await AsyncStorage.setItem('name', responseJson.studentDetails.name);
                    this.props.navigation.dispatch(
                        StackActions.replace('Home', {
                            username: username,
                            id: responseJson.studentDetails.id,
                            class_id: responseJson.studentDetails.class_id,
                            name: responseJson.studentDetails.name,
                        }));
                } else {
                    alert(responseJson);
                }
            })
            .catch((error) => {
                this.setState({
                    status: false,
                });
                alert(error);
            });

    }

    render() {
        const pressHandler1 = () => {
            this.props.navigation.push('Admin')
        }

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Image style={{ marginVertical: '10%', alignSelf: 'center' }} source={require('../assets/splash.png')}></Image>
                    <View style={{ marginBottom: 40 }}>
                        <TextInput style={styles.inputBox} placeholderTextColor="#000" placeholder={'Phonenumber'} onChangeText={username => this.setState({ username })} keyboardType="number-pad" />
                        <TextInput style={styles.inputBox} placeholderTextColor="#000" placeholder={'Password'} secureTextEntry={true} onChangeText={password => this.setState({ password })} />
                        <TouchableOpacity onPress={this.submit}>
                            <Text style={styles.signinButton} >Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.forget}>
                        <Text style={{ fontSize: 15, color: '#fff' }}>Forget username or password?</Text>
                        <TouchableOpacity>
                            <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }} onPress={pressHandler1} >Contact Administration</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.powerBy}>Powerd by <Text style={{ fontWeight: 'bold' }} onPress={() => Linking.openURL('https://itplus.co.in')}>IT Plus</Text></Text>
                </View>
                {
                    this.state.status ?
                        <ActivityIndicator size="large" style={styles.activity} />
                        : null
                }
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#637791',
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBox: {
        width: 300,
        marginBottom: 10,
        borderRadius: 50,
        backgroundColor: "white",
        padding: '5%',
        fontSize: 16,
        paddingHorizontal: 30
    },
    signinButton: {
        borderRadius: 50,
        backgroundColor: "#1c313a",
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        paddingVertical: '5%',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        elevation: 5,
    },
    powerBy: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        alignSelf: 'flex-end',
        color: 'white',
        fontSize: 16
    },
    signinButtonPress: {
        borderRadius: 50,
        backgroundColor: "#1c313a",
        color: '#fff',
        textAlign: 'center',
        fontSize: 15,
        paddingVertical: '5%',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        elevation: 5,
        opacity: 0.5
    },
    forget: {
        top: '-3%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    activity: {
        position: 'absolute',
        top: '50%',
        left: '45%',
    }
});