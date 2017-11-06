import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';

export default class TurnArrow extends React.Component {
  render() {    
    const icon = this.props.player.username === this.props.turn ? 'ios-play' : 'ios-play-outline';
    return (
      <Icon
        size={30}
        name={icon}
        type='ionicon'
        color='#fff'
      />
    );
  }
}

TurnArrow.propTypes = {
  player: PropTypes.object,
  turn: PropTypes.string,
};