import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Coin from './coin';

export default class RowContainer extends React.Component {
  render() {
    return (
      <View style={styles.rowContainer}>
        <Coin player={this.props.row[0]} />
        <Coin player={this.props.row[1]} />
        <Coin player={this.props.row[2]} />
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