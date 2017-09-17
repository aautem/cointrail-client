import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropButton from './drop-button';

export default class DropZoneContainer extends React.Component {
  render() {
    return (
      <View style={styles.rowContainer}>
        <DropButton column={0} dropCoin={this.props.dropCoin} />
        <DropButton column={1} dropCoin={this.props.dropCoin} />
        <DropButton column={2} dropCoin={this.props.dropCoin} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});