import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class scoreboard extends React.Component {
  render() {
    return (
      <View style={styles.scoreboard}>
        <View style={styles[`icon${this.props.player}`]} />
        <Text style={styles.score}>{`PLAYER${this.props.player}  ${this.props.score}`}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scoreboard: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'grey',
  },
  icon1: {
    backgroundColor: 'red',
    flex: 1,
    borderRadius: 100,
    margin: '3%',
    marginLeft: '10%',
  },
  icon2: {
    backgroundColor: 'blue',
    flex: 1,
    borderRadius: 100,
    margin: '3%',
    marginLeft: '10%',
  },
  score: {
    color: 'black',
    paddingTop: '3%',
    paddingLeft: '5%',
    paddingRight: '10%',
    fontSize: 16,
  },
});
