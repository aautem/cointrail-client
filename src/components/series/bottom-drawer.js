import React from 'react';
import PropTypes from 'prop-types';
import ScoreTally from './score-tally';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
const appSS = require('../../styles/app');

export default class BottomDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
    };
  }
  
  render () {
    if (!this.props.series) {
      return null;
    }
    
    const players = this.props.series.players;
    const usernames = Object.keys(players);
    return (
      <Col size={14/14} style={{ backgroundColor: '#aaa' }}>

        {/* VISIBLE DRAWER */}
        <Row size={7/24}>
          <Col size={14/14}>

            {/* SLIDE UP ARROW BUTTON */}
            <Row size={1/7} style={{
              justifyContent: 'center',
              borderStyle: 'solid',
              borderBottomColor: '#fff',
              borderBottomWidth: 0.5,
              marginLeft: 160,
              marginRight: 160
            }}>
              <Icon
                name={this.state.drawerOpen ? 'ios-arrow-down' : 'ios-arrow-up'}
                type='ionicon'
                color='#fff'
                onPress={() => {
                  // HANDLE CASE WHERE DRAWER IS SLID OPEN AND DOESN'T CALL THIS FUNCTION

                  // this.state.drawerOpen ? this.props.closeDrawer() : this.props.openDrawer();
                  // this.setState((prevState) => {
                  //   return { drawerOpen: !prevState.drawerOpen };
              }}/>
            </Row>

            {/* SERIES SCORE CONTAINER */}
            <Row size={5/7}>

              {/* SCORE BOARD */}
              <Col size={10/14}>
                <ScoreTally player={players[usernames[0]]} series={this.props.series} />
                <ScoreTally player={players[usernames[1]]} series={this.props.series} />
              </Col>

              {/* TIME LIMIT */}
              <Col size={4/14} style={[appSS.center]}>
                <View style={{
                  backgroundColor: '#fff',
                  margin: 20,
                  borderRadius: 10,
                  overflow: 'hidden',
                }}>
                  <Text style={{
                    padding: 20,
                    fontSize: 14,
                  }}>:12</Text>
                </View>
              </Col>

            </Row>

            {/* BOTTOM MARGIN */}
            <Row size={1/7} style={{ backgroundColor: '#aaa' }}></Row>
          </Col>
        </Row>

        {/* HIDDEN DRAWER */}
        <Row size={17/24} style={{ backgroundColor: '#aaa' }}></Row>

      </Col>
    );
  }
}

BottomDrawer.propTypes = {
  series: PropTypes.object,
  openDrawer: PropTypes.func,
};