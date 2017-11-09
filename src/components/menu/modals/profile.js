import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Modal, Text, Slider, Switch, ActivityIndicator } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Button, Avatar } from 'react-native-elements';
import HorizontalGraph from '../../common/horizontal-graph';
import * as userActions from '../../../store/actions/user';
import * as statsActions from '../../../store/actions/stats';
const styles = require('../../../styles/modals');
const appSS = require('../../../styles/app');

function mapStateToProps(state) {
  return {
    color: state.settings.color,
    showModal: state.user.showModal,
    id: state.user.id,
    username: state.user.username,
    avatarUrl: state.user.avatarUrl,
    stats: state.stats,
    loading: state.user.loading,
    loaded: state.user.loaded,
    error: state.user.error,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal: userActions.closeModal,
    loadStats: statsActions.loadStats,
  }, dispatch);
};

class ProfileModal extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.showModal && nextProps.showModal) {
      this.props.loadStats(this.props.username);
    }
  }

  render() {
    return (
      <Modal
        animationType='fade'
        visible={this.props.showModal}
        onRequestClose={this.props.closeModal}
      >
        <Col size={14/14}>
          
          {/* PICTURE / STATS */}
          <Row size={8/24} style={{ backgroundColor: this.props.color, justifyContent: 'center', alignItems: 'center' }}>
            <Col size={7/14}>
              <Avatar
                xlarge
                source={{uri: this.props.avatarUrl}}
                activeOpacity={0.8}
              />
              <Text>this.props.username</Text>
            </Col>
            <Col size={7/14} style={appSS.center}>
              <Text>Games Played</Text>
              <Text>10</Text>
              <Text>Total Points</Text>
              <Text>284</Text>
            </Col>
          </Row>

          {/* WIN - LOSS - DRAW */}
          <Row size={4/24} style={{ backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{
              color: this.props.color,
              fontWeight: 'bold',
              fontSize: 20,
            }}>
              {this.props.stats.wins}W - {this.props.stats.losses}L - {this.props.stats.draws}T
            </Text>
          </Row>

          {/* USER VS HIGH SCORE GRAPHS */}
          <Row size={8/24} style={{ backgroundColor: '#aaa' }}>
            <HorizontalGraph
              title={'Hello World'}
              leftColor='#ccc'
              leftValue={233}
              rightColor='#bbb'
              rightValue={122}
            />
            <HorizontalGraph
              title={'Hello World'}
              leftColor='#ccc'
              leftValue={233}
              rightColor='#bbb'
              rightValue={122}
            />
          </Row>

          {/* LOGOUT / CHANGE PASSWORD */}
          <Row size={4/24} style={{ backgroundColor: '#eee' }}></Row>

        </Col>
      </Modal>
    );
  }
}

ProfileModal.propTypes = {
  showModal: PropTypes.bool,
  id: PropTypes.string,
  username: PropTypes.string,
  avatarUrl: PropTypes.string,
  stats: PropTypes.object,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  error: PropTypes.string,
  closeModal: PropTypes.func,
  loadStats: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileModal);

        // <Grid>
        //   <Col style={[appSS.center, { paddingTop: 50, paddingBottom: 50 }]}>
        //     {this.props.loading &&
        //     <ActivityIndicator animating={true} color='steelblue' size='large' />}

        //     {/* activity indicator OR player stats */}

        //     {!this.props.loading &&
        //     <View style={{
        //       flex: 1,
        //       flexDirection: 'column',
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //     }}>
        //       <Avatar
        //         xlarge
        //         rounded
        //         source={{uri: this.props.avatarUrl}}
        //         activeOpacity={0.8}
        //       />
        //       <Text style={{ color: 'steelblue', fontSize: 20, fontWeight: 'bold', flex: 1, flexDirection: 'row' }}>
        //         {this.props.username}
        //       </Text>
        //       <Text style={{ flex: 1, flexDirection: 'row' }}>Wins: {this.props.stats.wins}</Text>
        //       <Text style={{ flex: 1, flexDirection: 'row' }}>Losses: {this.props.stats.losses}</Text>
        //       <Text style={{ flex: 1, flexDirection: 'row' }}>Draws: {this.props.stats.draws}</Text>
        //       <Text style={{ flex: 1, flexDirection: 'row' }}>Total Points: {this.props.stats.totalPoints}</Text>
        //       <Text style={{ flex: 1, flexDirection: 'row' }}>Wins by Default: {this.props.stats.winsByDefault}</Text>
        //       <Text style={{ flex: 1, flexDirection: 'row' }}>Games Played: {this.props.stats.gamesPlayed}</Text>
        //       <Button
        //         title='Back'
        //         onPress={this.props.closeModal}
        //         backgroundColor='steelblue'
        //         color='#fff'
        //         borderRadius={5}
        //         containerViewStyle={{ borderRadius: 5 }}
        //       />
        //     </View>}
        //   </Col>
        // </Grid>