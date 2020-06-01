import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Card } from 'react-native-elements';
export default class fees extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      response: [],
    };
  }
  async componentDidMount() {
    const id = this.props.route.params.id;
    try {
      const response = await fetch(
        'http://appadmin.victoriousschool.in/api/fees/' + id,
      );
      const responseJson = await response.json();
      // console.error(responseJson.fees);
      this.setState(
        {
          isLoading: false,
          response: responseJson,
        },
        function () { },
      );
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <View>
          <FlatList
            data={this.state.response.fees}
            renderItem={({ item }) => (
              <Card
                containerStyle={{ backgroundColor: '#e3e3e3', borderRadius: 6 }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={styles.textFee}>
                      {' '}
                      Date -{' '}
                      <Text style={{ color: 'red' }}>
                        {item.action == 1
                          ? item.date
                          : item.action == 2
                            ? item.date
                            : 'Not Available'}
                      </Text>
                    </Text>
                    <Text style={styles.textFee}>
                      {' '}
                      Amount -{' '}
                      <Text style={{ color: 'red' }}>
                        {item.action == 1
                          ? item.amount
                          : item.action == 2
                            ? item.date
                            : 'Not Available'}
                      </Text>
                    </Text>
                  </View>
                  <View
                    style={{
                      paddingVertical: '5%',
                      paddingHorizontal: -5,
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <Text
                      style={{
                        borderRadius: 4,
                        marginTop: '-1%',
                        backgroundColor: 'yellow',
                        width: '20%',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                      }}>
                      {item.action == 1 ? (
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>
                          Paid
                        </Text>
                      ) : item.action == 2 ? (
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>
                          Pending
                        </Text>
                      ) : (
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>
                              Due
                            </Text>
                          )}
                    </Text>
                  </View>
                </View>
              </Card>
            )}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textFee: {
    fontSize: 16,
    fontWeight: '700',
  },
});
