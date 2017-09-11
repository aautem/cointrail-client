import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavContainer from './src/components/nav-container';
import BoardContainer from './src/components/board-container';
import GutterContainer from './src/components/gutter-container';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.appContainer}>
        <NavContainer />
        <BoardContainer />
        <GutterContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
});
