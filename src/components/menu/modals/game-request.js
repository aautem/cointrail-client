import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, ActivityIndicator } from 'react-native';
import { Grid, Col } from 'react-native-easy-grid';
const _appSS = require('../../../styles/app');

export default class GameRequestModal extends React.Component {
  render() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.props.showModal}
        onRequestClose={() => { }}
      >
        <Grid>
          <Col style={[_appSS.center, { backgroundColor: '#fff', paddingTop: 20, paddingBottom: 20 }]}>
            <ActivityIndicator
              animating={this.props.showModal}
              size='large'
              color='steelblue'
            />
            <Text>Finding Opponent</Text>
          </Col>
        </Grid>
      </Modal>
    );
  }
}

GameRequestModal.propTypes = {
  showModal: PropTypes.bool,
};