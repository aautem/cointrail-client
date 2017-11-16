export default function getInitialState() {
  return {
    app: {
      config: null,
      onlineCount: 0,
      playersOnline: [],
      page: 'auth', // auth | menu | game | test
      loading: false,
      loaded: false,
      error: null,
    },
    auth: {
      accessToken: null,
      loading: false,
      loaded: false,
      error: null,
    },
    user: {
      _id: null,
      username: null,
      auth0Id: null,
      socketId: null,
      avatarUrl: null,
      inGame: false,
      online: true,
      settings: {
        boardSize: 4, // 4 | 5 | 6
        timeLimit: false,
        color: '#5B08C6',
        altColor: '#000BFC',
      },
      stats: {
        wins: 0,
        losses: 0,
        draws: 0,
        totalPoints: 0,
        gamesPlayed: 0,
        winsByDefault: 0,
        winsByPoints: 0,
        winsByConnect: 0,
      },
      friends: [], // Array of user ids
      loading: false,
      loaded: false,
      error: null,
      showStatsModal: false,
      showSettingsModal: false,
    },
    game: {
      mode: null, // online | solo
      roomName: null,
      boardSize: null,
      timeLimit: null,
      winner: null,
      draw: false,
      gameOver: false,
      winByConnect: false,
      winByPoints: false,
      board: null,
      boardPoints: null,
      players: null,
      turn: null,
      disconnection: false,
      showRequestModal: false,
      showResultsModal: false,
      requestingGame: false,
      loading: false,
      loaded: false,
      error: null,
    },
    leaderboard: {
      data: [], // Array of user objects
      showLeaderboardModal: false,
      loading: false,
      loaded: false,
      error: null,
    },
    messages: {
      data: [], // Array of message objects
      messageCount: 0,
      showMessagesModal: false,
      loading: false,
      loaded: false,
      error: null,
    },
    friends: {
      data: [], // Array of user objects
      onlineCount: 0,
      showAddFriendModal: false,
      loading: false,
      loaded: false,
      error: null,
    },
  };
}