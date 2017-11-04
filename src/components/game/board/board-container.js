import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BoardRow from './board-row';

import { Grid, Col, Row } from 'react-native-easy-grid';
import { Text } from 'react-native';
import { Header, Button } from 'react-native-elements';

const styles = require('../../../styles/containers');

function mapStateToProps(state) {
  return {
    size: state.series.settings.size,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    //
  }, dispatch);
};

class BoardContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.initializeBoard(this.props.size);
  }

  componentWillUnmount() {}

  render() {
    const rows = [];

    for (let i = 0; i < this.props.size; i ++) {
      rows.push(<BoardRow key={`row-${i + 1}`} rowId={i} />);
    }

    return (
      <Grid>
        <Col>
          {rows}
        </Col>
      </Grid>
    );
  }
}

BoardContainer.propTypes = {
  board: PropTypes.array,
  boardPoints: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);