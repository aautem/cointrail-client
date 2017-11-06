import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';

const styles = require('../../styles/app');

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

class ScoreTally extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render () {
    return (
      <Row>
        <Col size={3} style={styles.center}>
          <Text style={{ color: '#fff' }}>aautem</Text>
        </Col>
        <Col size={7}>
          <Row>
            <Col size={1} style={styles.center}>
              <Icon
                size={10}
                name='circle'
                type='font-awesome'
                color='lightgreen'
              />
            </Col>
            <Col size={1} style={styles.center}>
              <Icon
                size={10}
                name='circle'
                type='font-awesome'
                color='lightgreen'
              />
            </Col>
            <Col size={1} style={styles.center}>
              <Icon
                size={10}
                name='circle'
                type='font-awesome'
                color='yellow'
              />
            </Col>
            <Col size={1} style={styles.center}>
              <Icon
                size={10}
                name='circle'
                type='font-awesome'
                color='lightgreen'
              />
            </Col>
            <Col size={1} style={styles.center}>
              <Icon
                size={10}
                name='circle-o'
                type='font-awesome'
                color='#fff'
              />
            </Col>
            <Col size={1} style={styles.center}>
              <Icon
                size={10}
                name='circle-o'
                type='font-awesome'
                color='#fff'
              />
            </Col>
            <Col size={1} style={styles.center}>
              <Icon
                size={10}
                name='circle-o'
                type='font-awesome'
                color='#fff'
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

// 'circle' 'circle-o' 'times-circle-o'

// ScoreTally.propTypes = {
//   board: PropTypes.array,
//   boardPoints: PropTypes.array,
// };

export default connect(mapStateToProps, mapDispatchToProps)(ScoreTally);