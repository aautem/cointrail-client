import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class NavHeader extends React.Component {
  render() {
    return (
      <View style={styles.navHeader}>
        <Text style={styles.titleText}>{'.~::  C O N T R A I L  ::~.'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navHeader: {
    flex: 8,
    backgroundColor: 'white',
  },
  titleText: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 28,
    fontSize: 20,
  },
});
