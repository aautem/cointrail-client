import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

// key: React string
// column: number
// dropCoin: method

export default class DropButton extends React.Component {
  drop() {
    this.props.dropCoin(this.props.column);
  }

  render() {
    return (
      <TouchableOpacity style={styles.button} onPress={this.drop.bind(this)}>
        <Icon
          iconStyle={styles.icon}
          type='entypo'
          name='chevron-with-circle-down'
          color='white'
          size={48}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 100,
    margin: '5%',
  },
  icon: {
    backgroundColor: 'transparent',
  },
});