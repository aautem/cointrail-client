import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class GutterContainer extends React.Component {
  render() {
    return (
      <View style={styles.gutterContainer}>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gutterContainer: {
    flex: 1.5,
    backgroundColor: 'grey',
  },
});