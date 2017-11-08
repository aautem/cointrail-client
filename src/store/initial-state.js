export default function getInitialState() {
  return {
    app: {
      config: null,
      page: 'auth', // auth | menu | game | test
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
      inGame: false,
      showModal: false,
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
    stats: {
      wins: 0,
      losses: 0,
      draws: 0,
      totalPoints: 0,
      winsByDefault: 0,
      winsByPoints: 0,
      gamesPlayed: 0,
      loading: false,
      loaded: false,
      error: null,
    },
    series: {
      players: null,
      roomName: null,
      seriesLength: 7,
      boardSize: 4,
      timeLimit: false,
      gamesPlayed: 0,
      games: [],
      winner: null,
      draw: null,
      seriesOver: null,
      winByPoints: null,
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