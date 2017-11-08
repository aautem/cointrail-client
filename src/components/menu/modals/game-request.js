import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, ActivityIndicator } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
import { Button } from 'react-native-elements';
const _appSS = require('../../../styles/app');

export default class GameRequestModal extends React.Component {
  render() {
    return (
      <Modal
        animationType='fade'
        visible={this.props.showModal}
        onRequestClose={() => { }}
      >
        <Col style={[_appSS.center, { backgroundColor: '#fff' }]}>
          <ActivityIndicator
            animating={this.props.showModal}
            size='large'
            color='steelblue'
          />
          <Text style={{ paddingTop: 10 }}>Finding Game</Text>
          <Button
            backgroundColor='#eee'
            color='grey'
            title='Cancel'
            loading={false}
            onPress={this.props.cancel}
            borderRadius={5}
            style={{ paddingTop: 10 }}
          />
        </Col>
      </Modal>
    );
  }
}

GameRequestModal.propTypes = {
  showModal: PropTypes.bool,
  cancel: PropTypes.func,
};