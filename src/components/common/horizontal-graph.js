import React from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
// const s = require('../../styles/horizontal-graph');

export default class HorizontalGraph extends React.Component {
  render () {
    return (
      <Col size={14/14}>
        <Row size={1.5/4}>
          <Col size={14/14} style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 20 }}>
            <Text style={{ color: 'black' }}>{this.props.title}</Text>
          </Col>
        </Row>
        <Row size={2.5/4} style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Animatable.View
            animation={'slideInLeft'}
            style={{
              backgroundColor: this.props.leftColor,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              overflow: 'hidden',
              justifyContent: 'center',
              flex: this.props.leftValue,
            }}
          >
            <Text style={{ color: '#fff', paddingLeft: 10, paddingRight: 10, fontWeight: 'bold' }}>
              {this.props.leftText}
            </Text>
          </Animatable.View>
          <Animatable.View
            animation={'slideInRight'}
            style={{
              backgroundColor: this.props.rightColor,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              overflow: 'hidden',
              justifyContent: 'center',
              flex: this.props.rightValue,
            }}
          >
            <Text style={{ color: '#fff', paddingLeft: 10, paddingRight: 10, fontWeight: 'bold', textAlign: 'right' }}>
              {this.props.rightText}
            </Text>
          </Animatable.View>
        </Row>
      </Col>
    );
  }
}

HorizontalGraph.propTypes = {
  title: PropTypes.string,
  leftText: PropTypes.string,
  leftValue: PropTypes.number,
  leftColor: PropTypes.string,
  rightText: PropTypes.string,
  rightValue: PropTypes.number,
  rightColor: PropTypes.string,
};