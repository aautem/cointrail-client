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

class BottomDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render () {
    return (
      <Col style={{ backgroundColor: 'steelblue' }}>
      </Col>
    );
  }
}

// BottomDrawer.propTypes = {
//   board: PropTypes.array,
//   boardPoints: PropTypes.array,
// };

export default connect(mapStateToProps, mapDispatchToProps)(BottomDrawer);