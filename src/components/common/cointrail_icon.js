import React from 'react';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Svg, {
  G,
  Line,
  Path,
  Polygon,
  Defs,
} from 'react-native-svg';

export default class CointrailIcon extends React.Component {
  render () {
    return (
      <Grid>
        <Col size={1}>
          <Svg
            height='150'
            width='165'
            viewBox='0 0 1548 1715'
          >
            <Defs></Defs>
            <G>
              <Path fill='none' stroke='steelblue' strokeWidth='97' d="M1502 1458c0,112 -90,202 -202,202 -112,0 -202,-91 -202,-202 0,-112 90,-202 202,-202 112,0 202,90 202,202z" />
              <Path fill='steelblue' d="M635 1328c-126,0 -215,-25 -265,-74 -50,-49 -76,-136 -76,-260l0 -412c0,-124 25,-211 75,-261 50,-49 138,-74 264,-74l59 0c120,0 206,23 259,69 53,46 80,121 82,226l-129 1c-3,-69 -18,-116 -47,-142 -28,-26 -83,-39 -165,-39l-59 0c-86,0 -143,14 -169,43 -27,29 -40,97 -40,204l0 356c0,108 13,176 40,205 27,29 83,43 169,43l59 0c83,0 138,-14 168,-42 29,-28 44,-79 44,-154l0 -14 129 0 0 16c0,110 -26,189 -78,237 -52,47 -139,71 -261,71l-59 0z" />
              <Polygon fill='steelblue' points="1514,751 1299,1044 1299,751 "/>
              <Polygon fill='steelblue' points="1090,751 1305,1044 1305,751 "/>
              <Path fill='none' stroke='steelblue' strokeWidth='111' d="M681 47c-608,0 -625,0 -625,744"/>
              <Path fill='none' stroke='steelblue' strokeWidth='111' d="M677 47c608,0 625,0 625,744"/>
              <Path fill='none' stroke='steelblue' strokeWidth='111' d="M664 1538c-608,0 -608,-7 -608,-751"/>
              <Path fill='none' stroke='steelblue' strokeWidth='111' d="M657 1538c159,0 201,-7 438,-45"/>
            </G>
          </Svg>
        </Col>
      </Grid>
    );
  }
}