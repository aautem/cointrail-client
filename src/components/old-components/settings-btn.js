import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class SettingsButton extends React.Component {
  handleButtonPress() {
    console.log('Settings Button Pressed');
  }

  render() {
    return (
      <View style={styles.settingsBtnContainer}>
        <Icon
          iconStyle={styles.icon}
          type='entypo'
          name='users'
          color='grey'
          size={20}
          onPress={this.handleButtonPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  settingsBtnContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon: {
    paddingTop: 30,
    paddingRight: 5,
    backgroundColor: 'transparent',
  },
});
