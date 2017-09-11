import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class NavContainer extends React.Component {
  render() {
    return (
      <View style={styles.navContainer}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    backgroundColor: 'grey',
  },
});
