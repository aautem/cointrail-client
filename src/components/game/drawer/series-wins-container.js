import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-native-easy-grid';
import WinIndicators from './win-indicators';

const appSS = require('../../../styles/app');

function mapStateToProps(state) {
  return {
    series: state.series,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class SeriesWinsContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    if (!this.props.series.roomName) {
      return null;
    }

    const players = this.props.series.players;
    const usernames = Object.keys(players);
    return (
      <Col size={10/14}>
        <Row size={7/7}>

          {/* PLAYER NAMES */}
          <Col size={4/10} style={{ justifyContent: 'center', alignItems: 'flex-start', paddingBottom: 20 }}>
            <Text style={{
              color: '#aaa',
              fontWeight: 'bold',
              fontSize: 16,
              paddingLeft: 15,
              paddingBottom: 10,
            }}>
              {usernames[0]}
            </Text>
            <Text style={{
              color: '#aaa',
              fontWeight: 'bold',
              fontSize: 16,
              paddingLeft: 15,
            }}>
              {usernames[1]}
            </Text>
          </Col>

          {/* WIN INDICATORS */}
          <Col size={6/10} style={{ alignItems: 'center' }}>
            <WinIndicators position='top' player={players[usernames[0]]} series={this.props.series} />
            <WinIndicators position='bottom' player={players[usernames[1]]} series={this.props.series} />
          </Col>
        </Row>
      </Col>
    );
  }
}

SeriesWinsContainer.propTypes = {
  //
};

export default connect(mapStateToProps, mapDispatchToProps)(SeriesWinsContainer);