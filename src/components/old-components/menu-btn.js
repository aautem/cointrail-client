import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class MenuButton extends React.Component {  
  render() {
    return (
      <View style={styles.menuBtnContainer}>
        <Icon
          iconStyle={styles.icon}
          type='entypo'
          name='menu'
          color='grey'
          size={24}
          onPress={this.props.quitGame}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menuBtnContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon: {
    paddingTop: 30,
    paddingLeft: 10,
    backgroundColor: 'transparent',
  },
});
