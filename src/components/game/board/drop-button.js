import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as game from '../../../store/actions/game';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';

function mapStateToProps(state) {
  return {
    size: state.series.settings.size,
    turn: state.game.turn,
    board: state.game.board,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    dropCoin: game.dropCoin,
  }, dispatch);
};

class DropButton extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    const color = !this.props.board[0][this.props.colId] ? 'steelblue' : 'lightgrey';

    return (
      <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Icon
          size={32}
          name='ios-arrow-dropdown-outline'
          type='ionicon'
          color={color}
          onPress={() => { this.props.dropCoin(this.props.colId, this.props.turn) }}
        />
      </Col>
    );
  }
}

DropButton.propTypes = {
  key: PropTypes.string,
  colId: PropTypes.number,
  board: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(DropButton);