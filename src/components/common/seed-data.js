const loading = false;

const series = {
  seriesLength: 2,
  boardSize: 4,
  timeLimit: false,
  gamesPlayed: 0,
  games: [],
  winner: null,
  draw: false,
  seriesOver: false,
  winByPoints: false,
  players: {},
  roomName: 'test-room',
};

const username = 'aautem';

const game = {
  roomName: 'test-room',
  boardSize: 4,
  timeLimit: false,
  winner: null,
  draw: false,
  gameOver: false,
  winByPoints: false,
  board: [
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', '']
  ],
  boardPoints: [
    [15, 15, 15, 15],
    [15, 15, 15, 15],
    [15, 15, 15, 15],
    [15, 15, 15, 15]
  ],
  players: {},
  turn: 'aautem'
};

series.games.push(game);

const p1Color = '#3780B6';
const p2Color = '#71CFEE';

series.players[username] = {
  id: '1',
  username: username,
  avatarUrl: 'https://s.gravatar.com/avatar/ed70ccead677f6d59ba3edac7d3acb64?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fau.png',
  gamePieceColor: '#3780B6',
  points: 0,
  winner: false,
  wins: 0,
  losses: 0,
  draws: 0,
};

series.players['au'] = {
  id: '1',
  username: 'au',
  avatarUrl: 'https://i1.wp.com/cdn.auth0.com/avatars/au.png?ssl=1',
  gamePieceColor: '#71CFEE',
  points: 0,
  winner: false,
  wins: 0,
  losses: 0,
  draws: 0,
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