import React from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text, View } from 'react-native';
import { Header, Button, Icon } from 'react-native-elements';
const appSS = require('../../styles/app');

export default class HorizontalGraph extends React.Component {
  render () {
    return (
      <Col size={14/14}>
        <Row size={1.5/4}>
          <Col size={14/14} style={{ justifyContent: 'center', alignItems: 'flex-start', paddingLeft: 20 }}>
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
            <Text style={{ color: '#fff', paddingLeft: 10, fontWeight: 'bold' }}>
              {`${this.props.leftValue}${this.props.percentage ? '%' : ''}`}
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
            <Text style={{ color: '#aaa', paddingRight: 10, fontWeight: 'bold', textAlign: 'right' }}>
              {`${this.props.leftValue + this.props.rightValue}${this.props.percentage ? '%' : ''}`}
            </Text>
          </Animatable.View>
        </Row>
      </Col>
    );
  }
}

HorizontalGraph.propTypes = {
  title: PropTypes.string,
  leftColor: PropTypes.string,
  leftValue: PropTypes.number,
  rightColor: PropTypes.string,
  rightValue: PropTypes.number,
  percentage: PropTypes.bool,
};