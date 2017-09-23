import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class NavContainer extends React.Component {
  render() {
    return (
      <View style={styles.navContainer}>
        <Text style={styles.titleText}>{'.~::  C O N T R A I L S ::~.'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
  titleText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 100,
    fontSize: 20,
  },
});
