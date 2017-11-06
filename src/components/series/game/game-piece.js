import React from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { Text, Dimensions } from 'react-native';

const animateDrop = {
  from: { translateY: -500, opacity: 0.25,},
  to: { translateY: 0, opacity: 1 },
};
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export default class GamePiece extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.username && nextProps.username) {
      const ref = `coin-${nextProps.rowId}-${nextProps.colId}`;
      this.refs[ref].transition(animateDrop.from, animateDrop.to, 800, 'ease-out-expo');
    }
  }

  render() {
    const { username, color, rowId, colId, boardSize } = this.props;
    const heightAndWidth = (viewport / boardsize) - 25;

    return (
      <Animatable.View
        ref={`coin-${rowId}-${colId}`}
        style={{
          backgroundColor: color,
          borderRadius: 100,
          height: heightAndWidth,
          width: heightAndWidth,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {!username &&
        <Text style={{ color: 'steelblue' }}>{this.props.points}</Text>}
      </Animatable.View>
    );
  }
}

GamePiece.propTypes = {
  username: PropTypes.string,
  color: PropTypes.string,
  rowId: PropTypes.number,
  colId: PropTypes.number,
  boardSize: PropTypes.number,
};