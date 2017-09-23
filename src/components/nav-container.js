import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import MenuBtn from 'menu-btn';
// import AccountBtn from 'account-btn';

export default class NavContainer extends React.Component {
  render() {
    return (
      <View style={styles.navContainer}>
        {/* <MenuBtn /> */}
        <Text style={styles.titleText}>{'.~::  C O N T R A I L  ::~.'}</Text>
        {/* <AccountBtn /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleText: {
    color: 'grey',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 26,
    fontSize: 20,
  },
});
