import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

// key: React string
// player: number
// points: number

export default class Coin extends React.Component {
  getColor() {
    if (this.props.player === 0) {
      return `empty`;
    }
    return `player${this.props.player}`;
  }

  getPointsIcon() {
    if (this.props.points === 5) {
      return (<Icon iconStyle={styles.icon} type='entypo' name='bell' color='steelblue' size={18} />);
    } else if (this.props.points === 10) {
      return (<Icon iconStyle={styles.icon} type='entypo' name='bug' color='steelblue' size={18} />);
    } else if (this.props.points === 25) {
      return (<Icon iconStyle={styles.icon} type='entypo' name='flower' color='steelblue' size={18} />);
    } else if (this.props.points === 50) {
      return (<Icon iconStyle={styles.icon} type='entypo' name='star-outlined' color='steelblue' size={18} />);
    } else if (this.props.points === 100) {
      return (<Icon iconStyle={styles.icon} type='entypo' name='baidu' color='steelblue' size={18} />);
    } else if (this.props.points === 150) {
      return (<Icon iconStyle={styles.icon} type='entypo' name='ticket' color='steelblue' size={18} />);
    }
    return null;
  }

  // {this.props.player === 0 && icon}

  render() {
    const color = this.getColor();
    // const icon = this.getPointsIcon();
    return (
      <View style={[styles.coin, styles[color]]}>
      {this.props.player === 0 &&
        <Text style={styles.points}>{this.props.points}</Text>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  coin: {
    flex: 1,
    borderRadius: 100,
    borderColor: 'black',
    borderWidth: 1,
    margin: '3%',
  },
  player1: {
    backgroundColor: 'blue',
  },
  player2: {
    backgroundColor: 'red',
  },
  empty: {
    backgroundColor: 'white',
  },
  icon: {
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  points: {
    color: 'grey',
    fontSize: 10,
    textAlign: 'center',
    paddingTop: 25,
    backgroundColor: 'transparent',
  }
});