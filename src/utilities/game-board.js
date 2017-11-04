export function findEmptyRowId(board, colId) {
  let emptyRowId = null;
  for (let rowId = board.length - 1; rowId >= 0; rowId --) {
    if (typeof emptyRowId !== 'number' && board[rowId][colId] === 0) {
      emptyRowId = rowId;
    }
  }
  return emptyRowId;
}

export function getWinner(board) {
  const wRows = getWinningRows(board);
  const wColumns = getWinningColumns(board);
  const wDiagonals = getWinningDiagonals(board);
  const wOptions = [...wRows, ...wColumns, ...wDiagonals];
  return checkForWinner(wOptions);
}

export function checkForTie(board) {
  let tie = true;
  board.forEach((row, rowId) => {
    if (tie) {
      row.forEach((col, colId) => {
        if (board[rowId][colId] === 0) {
          tie = false;
        }
      });
    }
  });
  return tie;
}

export function getWinnerByPoints(p1, p2) {
  if (p1.score > p2.score) {
    return p1.id;
  } else if (p1.score < p2.score) {
    return p2.id;
  }
  return null;
}

function getWinPossibilities(board) {
  const rows = getBoardRows(board);
  const columns = getBoardColumns(board);
  const diagonals = getBoardDiagonals(board);
  return [ ...rows, ...columns, ...diagonals];
}

function getWinningRows(board) {
  let rows = [];
  board.forEach((row) => {
    rows.push(row);
  });
  return rows;
}

function getWinningColumns(board) {
  let columns = [];
  for (let colId = 0; colId < board.length; colId ++) {
    columns[colId] = [];
    board.forEach((row) => {
      columns[colId].push(row[colId]);
    });
  }
  return columns;
}

function getWinningDiagonals(board) {
  let diagonals = [[], []];
  let colId = board.length - 1;
  for (let rowId = 0; rowId < board.length; rowId ++) {
    // top right diag: [row, row], [row, row] ...
    diagonals[0].push(board[rowId][rowId]);
    // bot left diag: [row, size - 1], [row, size - 2] ...
    diagonals[1].push(board[rowId][colId --]);
  }
  return diagonals;
}

function checkForWinner(winOptions) {
  let winner = null;

  winOptions.forEach((option) => {
    const winningPlayer = option.reduce((prevPlayer, nextPlayer) => {
      if (prevPlayer && nextPlayer === prevPlayer) {
        return prevPlayer;
      }
      return null;
    });
    if (winningPlayer) {
      winner = winningPlayer;
    }
  });

  return winner;
}