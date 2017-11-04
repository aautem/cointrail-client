export default function getInitialState() {
  return {
    auth: {
      authenticated: true,
      email: null,
      password: null,
      loading: false,
      loaded: true,
      error: null,
    },
    user: {
      username: 'aautem',
      socketId: 'fc6da34f-7bf6-6bc6-9900-049803978289',
      inGame: false,
      showModal: false,
      loading: false,
      loaded: true,
      error: null,
    },
    stats: {
      wins: 0,
      losses: 0,
      ties: 0,
      totalPoints: 0,
      gamesPlayed: 0,
    },
    series: {
      '$PLAYER ID': {
        currentScore: 0,
      },
      players: {}, // Two player ID keys
      settings: {
        length: 3,
        timer: false,
        size: 4,
      },
      results: {
        showModal: false,
        gamesPlayed: 0,
        gamesLeft: 3,
        games: [], // Array of game objects { gameId: 1, winner: $PID, $PID: { score }, $PID: { score } }
      },
      loading: false,
      loaded: false,
      error: null,
    },
    game: {
      players: {
        'abc-def-ghi-jkl': {
          id: 'abc-def-ghi-jkl',
          score: 0,
          color: 'powderblue',
        },
        'zyx-wvu-tsr-qpo': {
          id: 'zyx-wvu-tsr-qpo',
          score: 0,
          color: 'steelblue',
        }
      },
      turn: 'abc-def-ghi-jkl',
      board: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      boardPoints: [
        [35, 35, 35, 35],
        [35, 35, 35, 35],
        [35, 35, 35, 35],
        [35, 35, 35, 35]
      ],
      timer: null,
      winner: null,
      loading: false,
      loaded: false,
      error: null,
    },
    settings: {
      size: 4,
      length: 7,
      timer: false,
      showModal: false,
      loading: false,
      loaded: false,
      error: null,
    },
    opponent: {
      profile: {},
      stats: {},
      socketId: null,
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