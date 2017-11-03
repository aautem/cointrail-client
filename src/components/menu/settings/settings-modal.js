import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Text, Slider, Switch } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button } from 'react-native-elements';

const styles = require('../../../styles/modals');

export default class SettingsModal extends React.Component {
  render() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.props.settings.showModal}
        onRequestClose={this.props.closeModal}
      >
        <Grid>
          <Col size={1} style={styles.transparent}></Col>
          <Col size={3}>
            <Row size={1} style={styles.transparent}></Row>
            <Row size={3} style={{ backgroundColor: '#fff' }}>
              <Col style={styles.column}>
                <Row>
                  <Text>Default Settings</Text>
                </Row>
                <Row>
                  <Col style={styles.column}>
                    <Row>
                      <Text>Board Size: {this.props.settings.size}</Text>
                    </Row>
                    <Row>
                      <Slider
                        minimumValue={4}
                        maximumValue={6}
                        value={this.props.settings.size}
                        step={1}
                        onSlidingComplete={(size) => { this.props.changeSize(size) }}
                        style={styles.fullWidth}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.column}>
                    <Row>
                      <Text>Series Length: {this.props.settings.length}</Text>
                    </Row>
                    <Row>
                      <Slider
                        minimumValue={3}
                        maximumValue={11}
                        value={this.props.settings.length}
                        step={4}
                        onSlidingComplete={(length) => { this.props.changeLength(length) }}
                        style={styles.fullWidth}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.column}>
                    <Row>
                      <Text>Timer: {this.props.settings.timer ? 'On' : 'Off'}</Text>
                    </Row>
                    <Row>
                      <Switch
                        value={this.props.settings.timer}
                        onValueChange={(value) => { this.props.toggleTimer(value) }}
                      />
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col style={styles.column}>
                  <Button
                    title='Save'
                    backgroundColor='steelblue'
                    onPress={() => { console.log('Saving settings...') }}
                  />
                  </Col>
                  <Col style={styles.column}>
                    <Button
                      title='Cancel'
                      backgroundColor='steelblue'
                      onPress={this.props.closeModal}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row size={1} style={styles.transparent}></Row>
          </Col>
          <Col size={1} style={styles.transparent}></Col>
        </Grid>
      </Modal>
    );
  }
}

SettingsModal.propTypes = {
  settings: PropTypes.object,
  changeSize: PropTypes.func,
  changeLength: PropTypes.func,
  toggleTimer: PropTypes.func,
  closeModal: PropTypes.func,
};