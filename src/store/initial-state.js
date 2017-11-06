export default function getInitialState() {
  return {
    app: {
      config: null,
      socket: null,
      page: 'auth', // auth | menu | game
      loading: false,
      loaded: false,
      error: null,
    },
    auth: {
      page: 'login', // login | signup | forgot-password
      loading: false,
      authenticated: false,
      error: null,
    },
    user: {
      id: null,
      username: null,
      avatarUrl: null,
      color: '#3780B6',
      altColor: '#71CFEE',
      inGame: false,
      showModal: false,
      loading: false,
      loaded: false,
      error: null,
    },
    stats: {
      wins: 0,
      losses: 0,
      ties: 0,
      totalPoints: 0,
      winsByDefault: 0,
      gamesPlayed: 0,
      loading: false,
      loaded: false,
      error: null,
    },
    settings: {
      boardSize: 4,
      seriesLength: 7,
      timeLimit: false,
      color: '#3780B6',
      altColor: '#71CFEE',
      showModal: false,
      loading: false,
      loaded: false,
      error: null,
    },
    series: {
      players: {}, // Two player ID keys
      '$PLAYER ID': {
        id: 'abc-def-ghi-jkl',
        username: 'aautem',
        avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        color: '#71CFEE',
        wins: 0,
        losses: 0,
        ties: 0,
        totalScore: 0,
      },
      seriesLength: 7,
      boardSize: 4,
      timeLimit: false,
      showModal: false,
      gamesPlayed: 0,
      games: [], // Array of game objects { gameId: 1, winner: $PID, $PID: { score }, $PID: { score } }
      loading: false,
      loaded: false,
      error: null,
    },
    game: {
      players: {
        'abc-def-ghi-jkl': {
          id: 'abc-def-ghi-jkl',
          username: 'aautem',
          avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
          score: 0,
          color: '#71CFEE',
        },
        'zyx-wvu-tsr-qpo': {
          id: 'zyx-wvu-tsr-qpo',
          username: 'cdturner',
          avatarUrl: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          score: 0,
          color: '#3780B6',
        }
      },
      turn: 'abc-def-ghi-jkl',
      board: [],
      boardPoints: [],
      timeLimit: null,
      winner: null,
      loading: false,
      loaded: false,
      error: null,
    },
    opponent: {
      profile: {},
      stats: {},
      id: null,
      inGame: false,
      loading: false,
      loaded: false,
      error: null,
    },
    leaderboard: {
      data: [], // Array of stats objects
      loading: false,
      loaded: false,
      error: null,
    },
    messages: {
      data: [], // Array of message objects
      loading: false,
      loaded: false,
      error: null,
    },
    friends: {
      data: [], // Array of user objects
      loading: false,
      loaded: false,
      error: null,
    },
    history: {
      data: [], // Array of game result objects
      loading: false,
      loaded: false,
      error: null,
    },
  };
}

// SERIES:
//   players: OBJECT
//   seriesLength: NUMBER
//   boardSize: NUMBER
//   timeLimit: BOOLEAN
//   gamesPlayed: NUMBER
//   games: ARRAY [ OBJECT ]
//   winner: BOOLEAN
//   draw: BOOLEAN
//   seriesOver: BOOLEAN
//   winByPoints: BOOLEAN

// GAME:
//   players: OBJECT
//   boardSize: NUMBER
//   turn?: STRING
//   board: ARRAY [[ STRING ]]
//   boardPoints: ARRAY [[ NUMBER ]]
//   timeLimit: BOOLEAN
//   gameOver: BOOLEAN
//   winner?: STRING
//   draw: BOOLEAN
//   winByPoints: BOOLEAN

// GAME PLAYER:
//   id: NUMBER
//   username: STRING
//   avatarUrl: STRING
//   gamePieceColor: STRING #fff
//   points: NUMBER
//   winner: BOOLEAN

// SERIES PLAYER EXTENDS GAME PLAYER
//   wins: NUMBER
//   losses: NUMBER
//   draws: NUMBER