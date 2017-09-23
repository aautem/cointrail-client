import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

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
        <Text style={styles.label}>DROP</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: 'transparent',
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'dashed',
    margin: '5%',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 65,
    fontSize: 12,
    backgroundColor: 'transparent',
  },
});