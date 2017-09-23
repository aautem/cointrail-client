import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MenuButton from './menu-btn';
import SettingsButton from './settings-btn';
import NavHeader from './nav-header';

export default class NavContainer extends React.Component {
  render() {
    return (
      <View style={styles.navContainer}>
        <MenuButton quitGame={this.props.quitGame} />
        <NavHeader />
        <SettingsButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});
