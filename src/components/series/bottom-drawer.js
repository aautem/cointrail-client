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
  }
  
  render () {
    if (!this.props.game.roomName) {
      return null;
    }
    
    const players = this.props.game.players;
    const usernames = Object.keys(players);
    return (
      <Col size={14/14} style={{ backgroundColor: '#eee' }}>

        {/* VISIBLE DRAWER */}
        <Row size={8/24}>
          <Col size={14/14}>

            {/* SLIDE UP ARROW BUTTON */}
            <Row size={1/8} style={{
              justifyContent: 'center',
              borderStyle: 'solid',
              borderBottomColor: '#aaa',
              borderBottomWidth: 0.5,
              marginLeft: 160,
              marginRight: 160,
            }}>
              <Icon
                name={this.props.drawerClosed ? 'ios-arrow-up' : 'ios-arrow-down'}
                type='ionicon'
                color='#aaa'
              />
            </Row>

            {/* SERIES SCORE CONTAINER */}
            <Row size={7/8}>

              {/* SCORE BOARD */}
              <Col size={10/14}>
                <ScoreTally position='top' player={players[usernames[0]]} game={this.props.game} series={true} />
                <ScoreTally position='bottom' player={players[usernames[1]]} game={this.props.game} series={true} />
              </Col>

              {/* TIME LIMIT */}
              <Col size={4/14} style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: 20 }}>
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
          </Col>
        </Row>

        {/* HIDDEN DRAWER */}
        <Row size={16/24} style={{ backgroundColor: '#aaa' }}></Row>

      </Col>
    );
  }
}

BottomDrawer.propTypes = {
  series: PropTypes.object,
  game: PropTypes.object,
  openDrawer: PropTypes.func,
  closeDrawer: PropTypes.func,
};