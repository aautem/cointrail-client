import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as settingsActions from '../../../store/actions/settings';
import { Dimensions, Modal, View, Text, Slider, Switch, ActivityIndicator, TouchableOpacity, TouchableHighlight, Picker } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button, Avatar } from 'react-native-elements';
import { ColorPicker } from 'react-native-color-picker'
const modalSS = require('../../../styles/modals');
const appSS = require('../../../styles/app');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function mapStateToProps(state) {
  return {
    user: state.user,
    settings: state.settings,
    loading: state.settings.loading,
    loaded: state.settings.loaded,
    error: state.settings.error,
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
        visible={this.props.settings.showModal}
        onRequestClose={this.props.closeModal}
      >
        {(!this.state.selectingColor && !this.state.selectingAltColor) &&
        <Col size={14/14} style={[appSS.center, { backgroundColor: '#fff' }]}>

          {/* PICTURE / STATS */}
          <Row size={8/24} style={{ backgroundColor: this.props.settings.color }}>
            <Col size={6/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Avatar
                height={viewportHeight / 5}
                rounded
                source={{uri: this.props.user.avatarUrl}}
                activeOpacity={0.8}
              />
              <Text style={{ textAlign: 'center', paddingTop: 10, color: '#fff', fontWeight: 'bold' }}>
                {this.props.user.username}
              </Text>
            </Col>
            <Col size={8/14} style={{ justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20, paddingRight: 20 }}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>GAME</Text>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>PREFERENCES</Text>
            </Col>
          </Row>

          {/* GAME SETTINGS */}
          <Row size={14/24}>
            <Col size={14/14} style={{ justifyContent: 'center', paddingTop: 10, paddingBottom: 30 }}>

              {/* BOARD SIZE */}
              <Row size={4/14}>
                <Col size={14/14} style={{ justifyContent: 'center' }}>
                  <Text style={[{ textAlign: 'center', color: 'black', fontWeight: 'bold' }]}>
                    Gameboard Size: {this.props.settings.boardSize} x {this.props.settings.boardSize}
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

              {/* TIME LIMIT */}
              <Row size={4/14}>
                <Col size={14/14} style={{ alignItems: 'center', paddingTop: 5 }}>
                  <Text style={{ color: 'black', fontWeight: 'bold', paddingBottom: 5 }}>15 Second Limit</Text>
                  <Switch
                    value={this.props.settings.timeLimit}
                    onValueChange={() => { this.props.toggleTimer() }}
                  />
                </Col>
              </Row>

              {/* COLOR SELECTION */}
              <Row size={6/14} style={[appSS.center, { paddingLeft: 25, paddingRight: 25 }]}>
                <Col size={7/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'black', paddingBottom: 10, fontWeight: 'bold' }}>Coin Color</Text>
                  <TouchableOpacity onPress={() => {
                    this.setState({ selectingColor: true });
                  }}>
                    <View style={{
                      height: viewportHeight / 6,
                      width: viewportHeight / 6,
                      backgroundColor: this.props.settings.color,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: 'black',
                      borderStyle: 'solid',
                  }} />
                  </TouchableOpacity>
                </Col>
                <Col size={7/14} style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: 'black', paddingBottom: 10, fontWeight: 'bold' }}>Alternate Color</Text>
                  <TouchableOpacity onPress={() => {
                    this.setState({ selectingAltColor: true });
                  }}>
                    <View style={{
                      height: viewportHeight / 6,
                      width: viewportHeight / 6,
                      backgroundColor: this.props.settings.altColor,
                      borderRadius: 100,
                      borderWidth: 1,
                      borderColor: 'black',
                      borderStyle: 'solid',
                    }}/>
                  </TouchableOpacity>
                </Col>
              </Row>
            
            </Col>
          </Row>

          {/* SAVE BUTTON */}
          <Row size={2/24}>
            <TouchableHighlight
              style={{ alignItems: 'center', flex: 1, backgroundColor: '#eee' }}
              underlayColor='#ddd'
              activeOpacity={0.9}
              onPress={() => { this.props.saveSettings(this.props.user.username, this.props.settings) }}
            >
              <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
                {this.props.loading &&
                <ActivityIndicator animating={true} color='#aaa' size='small' />}
                <Text style={{ color: '#aaa', fontWeight: 'bold' }}>Save</Text>
              </Row>
            </TouchableHighlight>
          </Row>

        </Col>}

        {/* COLOR PICKER */}
        {(this.state.selectingColor || this.state.selectingAltColor) &&
        <Col size={14/14} style={{ backgroundColor: '#fff' }}>
          <Row size={22/24} style={{ paddingLeft: 50, paddingRight: 50 }}>
            <ColorPicker
              onColorSelected={this.selectColor.bind(this)}
              style={{flex: 1 }}
              hideSliders={true}
              defaultColor={this.state.selectingAltColor ? this.props.settings.altColor : this.props.settings.color}
            />
          </Row>
          <Row size={2/24}>
            <TouchableHighlight
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }}
              underlayColor='#ddd'
              activeOpacity={0.9}
              onPress={() => { this.setState({ selectingColor: false, selectingAltColor: false }) }}>
              <Text style={{ color: '#aaa' }}>Cancel</Text>
            </TouchableHighlight>
          </Row>
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