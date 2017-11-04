import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { Header, Button } from 'react-native-elements';

function mapStateToProps(state) {
  return {
    //
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class Scoreboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.initializeBoard(this.props.size);
  }

  componentWillUnmount() {}

  render() {
    return (
      <Row size={1.75} style={{ backgroundColor: 'steelblue' }}>
      </Row>
    );
  }
}

// Scoreboard.propTypes = {
//   board: PropTypes.array,
//   boardPoints: PropTypes.array,
// };

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);