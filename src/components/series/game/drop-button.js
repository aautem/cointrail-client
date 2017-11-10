import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as gameActions from '../../../store/actions/game';
import { Col } from 'react-native-easy-grid';
import { Icon } from 'react-native-elements';

function mapStateToProps(state) {
  return {
    //
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    dropCoin: gameActions.dropCoin,
  }, dispatch);
};

class DropButton extends React.Component {
  constructor(props) {
    super(props);
  }

  dropCoin() {
    // only drop coin if user's turn and column has room
    if (this.props.game.turn === this.props.username && !this.props.game.board[0][this.props.colId]) {
      this.props.dropCoin(this.props.colId);
    }
  }

  render() {    
    const color = !this.props.game.board[0][this.props.colId] ? '#aaa' : '#eee';
    return (
      <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Icon
          size={32}
          name='ios-arrow-dropdown-outline'
          type='ionicon'
          color={color}
          onPress={this.dropCoin.bind(this)}
        />
      </Col>
    );
  }
}

DropButton.propTypes = {
  colId: PropTypes.number,
  game: PropTypes.object,
  username: PropTypes.string,
  dropCoin: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(DropButton);