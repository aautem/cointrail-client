import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as settingsActions from '../../../store/actions/settings';
import { Modal, View, Text, Slider, Switch, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button } from 'react-native-elements';
import { ColorPicker } from 'react-native-color-picker'
const modalSS = require('../../../styles/modals');
const appSS = require('../../../styles/app');

function mapStateToProps(state) {
  return {
    user: state.user,
    settings: state.settings,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeSize: settingsActions.changeSize,
    changeLength: settingsActions.changeLength,
    toggleTimer: settingsActions.toggleTimer,
    changeColor: settingsActions.changeColor,
    changeAltColor: settingsActions.changeAltColor,
    loadSettings: settingsActions.loadSettings,
    saveSettings: settingsActions.saveSettings,
    closeModal: settingsActions.closeModal,
  }, dispatch);
};

class SettingsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectingColor: false,
      selectingAltColor: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.showModal && nextProps.showModal && !nextProps.loaded) {
      this.props.loadSettings(this.props.username);
    }
  }

  selectColor(color) {
    if (this.state.selectingColor) {
      this.props.changeColor(color);
    } else if (this.state.selectingAltColor) {
      this.props.changeAltColor(color);
    }
    this.setState({ selectingColor: false, selectingAltColor: false });
  }

  render() {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.props.settings.showModal}
        onRequestClose={this.props.closeModal}
      >
        {(!this.state.selectingColor && !this.state.selectingAltColor) &&
        <Col size={14/14} style={appSS.center}>
          
          {/* TRANSPARENT */}
          <Row size={4/23}>
            <Col size={14/14} style={[modalSS.transparent]}></Col>
          </Row>

          <Row size={15/23}>
            <Col size={2/14} style={[modalSS.transparent]}></Col>
            <Col size={10/14} style={[{ backgroundColor: '#fff' }]}>

              {/* MODAL HEADER */}
              <Row size={2/15}>
                <Col size={10/10} style={[appSS.center]}>
                  <Text style={{ color: 'steelblue', fontWeight: 'bold' }}>
                    Game Preferences
                  </Text>
                </Col>
              </Row>

              {/* BOARD SIZE */}
              <Row size={3/15}>
                <Col size={10/10} style={{ justifyContent: 'center' }}>
                  <Text style={[{ textAlign: 'center' }]}>
                    {this.props.settings.boardSize} x {this.props.settings.boardSize} Board
                  </Text>
                  <Slider
                    minimumValue={4}
                    maximumValue={6}
                    value={this.props.settings.boardSize}
                    step={1}
                    onSlidingComplete={(boardSize) => { this.props.changeSize(boardSize) }}
                    style={{ marginLeft: 30, marginRight: 30 }}
                  />
                </Col>
              </Row>

              {/* SERIES LENGTH */}
              <Row size={3/15}>
                <Col size={10/10} style={{ justifyContent: 'center' }}>
                  <Text style={[{ textAlign: 'center' }]}>
                    {this.props.settings.seriesLength} Game Series
                  </Text>
                  <Slider
                    minimumValue={3}
                    maximumValue={11}
                    value={this.props.settings.seriesLength}
                    step={4}
                    onSlidingComplete={(seriesLength) => { this.props.changeLength(seriesLength) }}
                    style={{ marginLeft: 30, marginRight: 30 }}
                  />
                </Col>
              </Row>

              {/* TIME LIMIT */}
              <Row size={2/15} style={appSS.center}>
                <Text style={{ paddingRight: 10 }}>Time Limit</Text>
                <Switch
                  value={this.props.settings.timeLimit}
                  onValueChange={() => { this.props.toggleTimer() }}
                />
              </Row>

              {/* COLOR SELECTION */}
              <Row size={3/15}>
                <Col size={5/10} style={appSS.center}>
                  <Text>Color</Text>
                  <TouchableOpacity onPress={() => {
                    this.setState({ selectingColor: true });
                  }}>
                    <View style={{
                      height: 50,
                      width: 50,
                      backgroundColor: this.props.settings.color,
                      borderRadius: 5 }} />
                  </TouchableOpacity>
                </Col>
                <Col size={5/10} style={appSS.center}>
                  <Text>Alt Color</Text>
                  <TouchableOpacity onPress={() => {
                    this.setState({ selectingAltColor: true });
                  }}>
                    <View style={{
                      height: 50,
                      width: 50,
                      backgroundColor: this.props.settings.altColor,
                      borderRadius: 5 }} />
                  </TouchableOpacity>
                </Col>
              </Row>

              {/* SAVE BUTTON */}
              <Row size={2/15}>
                <Col size={10/10} style={{ backgroundColor: '#eee' }}>
                  <Button
                    backgroundColor='steelblue'
                    color='#fff'
                    title='Save'
                    loading={this.props.settings.loading}
                    onPress={() => {
                      this.props.saveSettings(this.props.user.username, this.props.settings);
                    }}
                    borderRadius={5}
                    containerViewStyle={{ borderRadius: 5 }}
                  />
                </Col>
              </Row>
            </Col>
            <Col size={2/14} style={[modalSS.transparent]}></Col>
          </Row>

          {/* TRANSPARENT */}
          <Row size={4/23}>
            <Col size={14/14} style={[modalSS.transparent]}></Col>
          </Row>
        </Col>}

        {/* COLOR PICKER */}
        {(this.state.selectingColor || this.state.selectingAltColor) &&
        <Col size={14/14} style={{ backgroundColor: '#fff', paddingLeft: 50, paddingRight: 50 }}>
          <ColorPicker
            onColorSelected={this.selectColor.bind(this)}
            style={{flex: 1 }}
            hideSliders={true}
            defaultColor={this.state.selectingAltColor ? this.props.settings.altColor : this.props.settings.color}
          />
          <Button
            backgroundColor='#eee'
            color='grey'
            title='Cancel'
            loading={false}
            onPress={() => { this.setState({ selectingColor: false, selectingAltColor: false }) }}
            borderRadius={5}
            containerViewStyle={{ borderRadius: 5, marginBottom: 60 }}
          />
        </Col>}
      </Modal>
    );
  }
}

SettingsModal.propTypes = {
  user: PropTypes.object,
  settings: PropTypes.object,
  changeSize: PropTypes.func,
  changeLength: PropTypes.func,
  toggleTimer: PropTypes.func,
  changeColor: PropTypes.func,
  changeAltColor: PropTypes.func,
  closeModal: PropTypes.func,
  loadSettings: PropTypes.func,
  saveSettings: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsModal);