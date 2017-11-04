import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View, Dimensions } from 'react-native';
import { Header, Button } from 'react-native-elements';

const styles = require('../../../styles/containers');

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

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

class BoardColumn extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <Col style={{ justifyContent: 'center', alignItems: 'center' }}>
        <View
          style={{
            backgroundColor: 'lightgrey',
            borderRadius: 100,
            height: (viewportWidth / 4) - 25,
            width: (viewportWidth / 4) - 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: 'steelblue' }}>35</Text>
        </View>
      </Col>
    );
  }
}

// BoardColumn.propTypes = {
//   //
// };

export default connect(mapStateToProps, mapDispatchToProps)(BoardColumn);