import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class DropButton extends React.Component {
  drop() {
    this.props.dropCoin(this.props.column);
  }

  render() {
    return (
      <View style={styles.button}>
        <Button
          onPress={this.drop.bind(this)}
          title="Drop"
          color='white'
          accessibilityLabel={`Drop column ${this.props.column} coin`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: 'grey',
    borderRadius: 100,
    margin: '5%',
  },
});