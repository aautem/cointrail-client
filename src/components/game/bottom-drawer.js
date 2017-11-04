import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ScoreTally from './score-tally';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { Header, Button } from 'react-native-elements';

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

class BottomDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentWillUnmount() {}

  render () {
    return (
      <Col style={{ backgroundColor: 'steelblue' }}>
        <Row size={1}>
          <Col size={3}>
            <Row>
              <Text style={{ color: '#fff' }}>BEST OF 7</Text>
            </Row>
            <ScoreTally />
            <ScoreTally />
          </Col>
          <Col size={1.25} style={[styles.center, { backgroundColor: '#fff', margin: 18 }]}>
            <Text style={{ fontSize: 20 }}>:12</Text>
          </Col>
        </Row>
        <Row size={4}>
          <Col style={styles.center}>
            <Row><Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingTop: 10 }}>SEND MESSAGE</Text></Row>
            <Row><Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingTop: 10 }}>QUIT GAME</Text></Row>
            <Row><Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingTop: 10 }}>MAIN MENU</Text></Row>
            <Row><Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingTop: 10 }}>ADD FAVORITE</Text></Row>
            <Row><Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingTop: 10 }}>ADD FRIEND</Text></Row>
            <Row><Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingTop: 10 }}>SEND FRIEND INVITE</Text></Row>
            <Row><Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', paddingTop: 10 }}>FORFEIT</Text></Row>
          </Col>
        </Row>
      </Col>
    );
  }
}

// BottomDrawer.propTypes = {
//   board: PropTypes.array,
//   boardPoints: PropTypes.array,
// };

export default connect(mapStateToProps, mapDispatchToProps)(BottomDrawer);