import React from 'react';
import PropTypes from 'prop-types';
import ScoreTally from './score-tally';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View, Dimensions } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
import WinIndicators from './win-indicators';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
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
              
              {/* PLAYERS */}
              <Col size={4/14} style={{ justifyContent: 'center', alignItems: 'flex-start', paddingBottom: 20 }}>
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

              {/* WIN INDICATORS // TODO: FIX PROPS */}
              {this.props.series &&
              <Col size={6/14} style={{ alignItems: 'center' }}>
                <WinIndicators position='top' player={players[usernames[0]]} series={null} />
                <WinIndicators position='bottom' player={players[usernames[1]]} series={null} />
              </Col>}

              {!this.props.series &&
              <Col size={6/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', paddingBottom: 30, fontSize: 18 }}>SOLO MODE</Text>
              </Col>}

              {/* SHOT CLOCK */}
              <Col size={4/14} style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 20 }}>
                <View style={{
                  backgroundColor: '#fff',
                  borderRadius: 10,
                }}>
                  <Text style={{
                    padding: 20,
                    fontSize: 16,
                    color: '#aaa'
                  }}>:00</Text>
                </View>
              </Col>

            </Row>
          </Col>
        </Row>

        {/* HIDDEN DRAWER // BUTTONS CONTAINER */}
        <Row size={16/24} style={{ backgroundColor: '#aaa' }}>
          <Col size={8/14} style={{ justifyContent: 'center', alignItems: 'flex-start' }}>
            <Button
              backgroundColor='#ddd'
              color='black'
              icon={{ type: 'material-community', name: 'exit-to-app', color: 'black' }}
              title='QUIT'
              loading={false}
              onPress={this.props.quitGame}
              textStyle={{ fontWeight: 'bold', fontSize: 16 }}
              containerViewStyle={{
                marginLeft: 0,
                borderTopRightRadius: 100,
                borderBottomRightRadius: 5,
                paddingBottom: 5
              }}
              buttonStyle={{
                width: viewportWidth / 2.25,
                height: viewportHeight / 10,
                borderTopRightRadius: 100,
                borderBottomRightRadius: 5,
                justifyContent: 'flex-start',
                paddingLeft: 20
              }}
            />
            <Button
              backgroundColor='#ddd'
              color='black'
              icon={{ type: 'material-community', name: 'pause-circle-outline', color: 'black' }}
              title='PAUSE'
              loading={false}
              onPress={() => { console.log('Pausing game...') }}
              textStyle={{ fontWeight: 'bold', fontSize: 16 }}
              containerViewStyle={{
                marginLeft: 0,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                paddingBottom: 5
              }}
              buttonStyle={{
                width: viewportWidth / 2.25,
                height: viewportHeight / 10,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                justifyContent: 'flex-start',
                paddingLeft: 20
              }}
            />
            <Button
              backgroundColor='#ddd'
              color='black'
              icon={{ type: 'material-community', name: 'message-text-outline', color: 'black' }}
              title='MESSAGE'
              loading={false}
              onPress={() => { console.log('Loading input...') }}
              textStyle={{ fontWeight: 'bold', fontSize: 16 }}
              containerViewStyle={{
                marginLeft: 0,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                paddingBottom: 5
              }}
              buttonStyle={{
                width: viewportWidth / 2.25,
                height: viewportHeight / 10,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                justifyContent: 'flex-start',
                paddingLeft: 20
              }}
            /> 
            <Button
              backgroundColor='#ddd'
              color='black'
              icon={{ type: 'material', name: 'person-add', color: 'black' }}
              title='FRIEND'
              loading={false}
              onPress={() => { console.log('Adding friend...') }}
              textStyle={{ fontWeight: 'bold', fontSize: 16 }}
              containerOverlayStyle={{ paddingBottom: 20 }}
              containerViewStyle={{ marginLeft: 0, borderBottomRightRadius: 100, borderTopRightRadius: 5 }}
              buttonStyle={{ width: viewportWidth / 2.25, height: viewportHeight / 10, borderBottomRightRadius: 100, borderTopRightRadius: 5, justifyContent: 'flex-start', paddingLeft: 20 }}
            />
          </Col>
          <Col size={6/14}></Col>
        </Row>

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