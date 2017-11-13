import React from 'react';
import { Grid, Col, Row } from 'react-native-easy-grid';
import Svg, {
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text,
  Use,
  Defs,
  Stop
} from 'react-native-svg';

const loading = false;

const username = 'aautem';

const game = {
  roomName: 'test-room',
  boardSize: 4,
  timeLimit: false,
  winner: 'aautem',
  draw: false,
  gameOver: false,
  winByPoints: false,
  board: [
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', ''],
    ['', '', '', '', '', '']
  ],
  boardPoints: [
    [15, 15, 15, 15, 15, 15],
    [15, 15, 15, 15, 15, 15],
    [15, 15, 15, 15, 15, 15],
    [15, 15, 15, 15, 15, 15],
    [15, 15, 15, 15, 15, 15],
    [15, 15, 15, 15, 15, 15]
  ],
  players: {},
  turn: 'aautem'
};

game.players[username] = {
  id: '1',
  username: username,
  avatarUrl: 'https://s.gravatar.com/avatar/ed70ccead677f6d59ba3edac7d3acb64?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fau.png',
  gamePieceColor: '#3780B6',
  points: 0,
  winner: false,
};

game.players['au'] = {
  id: '1',
  username: 'au',
  avatarUrl: 'https://i1.wp.com/cdn.auth0.com/avatars/au.png?ssl=1',
  gamePieceColor: '#71CFEE',
  points: 0,
  winner: false,
};

export default class TestContainer extends React.Component {
  render () {
    return (
      <Grid>
        <Col size={1} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Svg
            height='154'
            width='171'
            viewBox='0 0 1542 1708'
          >
            <Defs></Defs>
            <G>
              <Path fill='none' stroke='black' strokeWidth='97' d="M1502 1458c0,112 -90,202 -202,202 -112,0 -202,-91 -202,-202 0,-112 90,-202 202,-202 112,0 202,90 202,202z" />
              <Path d="M635 1328c-126,0 -215,-25 -265,-74 -50,-49 -76,-136 -76,-260l0 -412c0,-124 25,-211 75,-261 50,-49 138,-74 264,-74l59 0c120,0 206,23 259,69 53,46 80,121 82,226l-129 1c-3,-69 -18,-116 -47,-142 -28,-26 -83,-39 -165,-39l-59 0c-86,0 -143,14 -169,43 -27,29 -40,97 -40,204l0 356c0,108 13,176 40,205 27,29 83,43 169,43l59 0c83,0 138,-14 168,-42 29,-28 44,-79 44,-154l0 -14 129 0 0 16c0,110 -26,189 -78,237 -52,47 -139,71 -261,71l-59 0z" />
              <Polygon points="1514,751 1299,1044 1299,751 "/>
              <Polygon points="1090,751 1305,1044 1305,751 "/>
              <Path fill='none' stroke='black' strokeWidth='111' d="M681 47c-608,0 -625,0 -625,744"/>
              <Path fill='none' stroke='black' strokeWidth='111' d="M677 47c608,0 625,0 625,744"/>
              <Path fill='none' stroke='black' strokeWidth='111' d="M664 1538c-608,0 -608,-7 -608,-751"/>
              <Path fill='none' stroke='black' strokeWidth='111' d="M657 1538c159,0 201,-7 438,-45"/>
            </G>
          </Svg>
        </Col>
      </Grid>
    );
  }
}