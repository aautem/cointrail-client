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
    return (
      <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Icon
          size={32}
          name='ios-arrow-dropdown-outline'
          type='ionicon'
          color='steelblue'
          onPress={() => { this.props.dropCoin(this.props.index) }}
        />
      </Col>
    );
  }
}

DropButton.propTypes = {
  key: PropTypes.string,
  colId: PropTypes.number,
};

export default connect(mapStateToProps, mapDispatchToProps)(DropButton);