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
    // only drop coin if column has room
    if (!this.props.game.board[0][this.props.colId]) {
      this.props.dropCoin(this.props.game, this.props.colId);
    }
  }

  render() {
    const color = !this.props.game.board[0][this.props.colId] ? 'steelblue' : 'lightgrey';
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
  key: PropTypes.string,
  colId: PropTypes.number,
  game: PropTypes.object,
  dropCoin: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(DropButton);