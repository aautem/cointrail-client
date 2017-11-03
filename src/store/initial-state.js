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
      settings: {
        length: 3,
        timer: false,
        size: 4,
      },
      player1: {},
      player2: {},
      results: {
        gamesPlayed: 0,
        gamesLeft: 3,
      },
      loading: false,
      loaded: false,
      error: null,
    },
    game: {
      timer: null,
      turn: null,
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