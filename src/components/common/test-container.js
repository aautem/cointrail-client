import React from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { Modal, Text, ActivityIndicator, View } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Button, Avatar } from 'react-native-elements';
const appSS = require('../../styles/app');

export default class TestContainer extends React.Component {
  render() {
    return (
      <Modal
        animationType='fade'
        visible={true}
        onRequestClose={() => { }}
      >
        <Col size={14/14}>

          {/* TOP NAV */}
          <Row size={1/24}></Row>
          
          {/* HEADER */}
          <Row size={1/24}>
            <Col size={14/14} style={appSS.center}>
              <Text>Winner by Points</Text>
            </Col>
          </Row>

          {/* CURRENT GAME */}
          <Row size={7/24} style={{ backgroundColor: 'powderblue' }}>
            <Col size={7.85/14} style={{ backgroundColor: 'steelblue', alignItems: 'flex-start', justifyContent: 'center' }}>
              <Avatar
                xlarge
                source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'}}
                activeOpacity={0.8}
              />
              <View style={{ backgroundColor: 'steelblue', width: 80, height: 30, alignSelf: 'flex-end', justifyContent: 'center', marginTop: -30, borderTopLeftRadius: 30, overflow: 'hidden' }}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>237</Text>
              </View>
            </Col>
            <Col size={0.3/14} style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
              <View style={{
                width: 50,
                height: 50,
                backgroundColor: '#fff',
                borderRadius: 100,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}>
                <Text style={{ fontWeight: 'bold' }}>VS</Text>
              </View>
            </Col>
            <Col size={7.85/14} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
              <Avatar
                xlarge
                source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
                activeOpacity={0.8}
              />
              <View style={{ backgroundColor: 'powderblue', width: 80, height: 30, alignSelf: 'flex-start', justifyContent: 'center', marginTop: -30, borderTopRightRadius: 30, overflow: 'hidden' }}>
                <Text style={{ color: '#fff', textAlign: 'center', fontSize: 18, fontWeight: 'bold' }}>132</Text>
              </View>
            </Col>
          </Row>

          {/* PREVIOUS GAMES */}
          <Row size={12/24}>
            <Col size={14/14}>
              <Row size={4/13} style={{ backgroundColor: '#fff' }}>
                <Col size={14/14}>
                  <Row size={1.5/4}>
                    <Col size={14/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text>Game 4</Text>
                    </Col>
                  </Row>
                  <Row size={2.5/4} style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Animatable.View
                      ref={`bar`}
                      animation={'slideInRight'}
                      style={{
                        backgroundColor: 'steelblue',
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        flex: 233,
                      }}
                    >
                      <Text style={{ color: '#fff', paddingLeft: 10, fontWeight: 'bold' }}>233</Text>
                    </Animatable.View>
                    <Animatable.View
                      ref={`bar`}
                      animation={'slideInLeft'}
                      style={{
                        backgroundColor: 'powderblue',
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        overflow: 'hidden',
                        justifyContent: 'center',
                        flex: 187,
                      }}
                    >
                      <Text style={{ color: '#fff', paddingLeft: 10, fontWeight: 'bold' }}>187</Text>
                    </Animatable.View>
                  </Row>
                </Col>
              </Row>
              <Row size={4/13} style={{ backgroundColor: '#fff' }}>
                <Col size={14/14}>
                  <Row size={1.5/4}>
                    <Col size={14/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text>Game 5</Text>
                    </Col>
                  </Row>
                  <Row size={2.5/4} style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Col size={206} style={{
                      backgroundColor: 'steelblue',
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      overflow: 'hidden',
                      justifyContent: 'center'
                    }}>
                      <Text style={{ color: '#fff', paddingLeft: 10, fontWeight: 'bold' }}>206</Text>
                    </Col>
                    <Col size={301} style={{
                      backgroundColor: 'powderblue',
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      overflow: 'hidden',
                      justifyContent: 'center'
                    }}>
                      <Text style={{ color: '#fff', paddingRight: 10, fontWeight: 'bold', textAlign: 'right' }}>301</Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row size={4/13} style={{ backgroundColor: '#fff' }}>
                <Col size={14/14}>
                  <Row size={1.5/4}>
                    <Col size={14/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <Text>Game 6</Text>
                    </Col>
                  </Row>
                  <Row size={2.5/4} style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Col size={121} style={{
                      backgroundColor: 'steelblue',
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      overflow: 'hidden',
                      justifyContent: 'center'
                    }}>
                      <Text style={{ color: '#fff', paddingLeft: 10, fontWeight: 'bold' }}>121</Text>
                    </Col>
                    <Col size={98} style={{
                      backgroundColor: 'powderblue',
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      overflow: 'hidden',
                      justifyContent: 'center'
                    }}>
                      <Text style={{ color: '#fff', paddingRight: 10, fontWeight: 'bold', textAlign: 'right' }}>98</Text>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>

          {/* NEXT BUTTON */}
          <Row size={3/24} style={[{ justifyContent: 'center' }]}>
            <Button
              large
              title='Next Game'
              onPress={() => { console.log('*** LOADING NEXT GAME ***') }}
              backgroundColor='#aaa'
              color='#fff'
              borderRadius={5}
              containerViewStyle={{ borderRadius: 5 }}
            />
          </Row>
        </Col>
      </Modal>
    );
  }
}