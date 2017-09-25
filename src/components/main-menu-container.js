import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// OPEN MODAL WITH GAME OPTIONS ON NEW GAME SELECTION

export default class MainMenuContainer extends React.Component {
  render() {
    return (
      <View style={styles.mainMenuContainer}>
        <Text style={styles.text} onPress={this.props.openGameOptionsModal}>NEW GAME</Text>
        <Text style={styles.text}>HOW TO PLAY</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainMenuContainer: {
    flex: 9,
    backgroundColor: 'steelblue',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    paddingTop: 40,
    fontSize: 28,
  },
});
