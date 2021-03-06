const gameBoard = (() => {
  let _board = new Array(9).fill(null);

  const getCell = (num) => _board[num];

  const setCell = (num, player) => {
    _board[num] = player.getSign();
  };

  const resetBoard = () => {
    const newBoard = _board.map((cell) => (cell = null));
    _board = newBoard;
  };

  return {
    getCell,
    setCell,
    resetBoard,
  };
})();

const Player = (sign) => {
  const _sign = sign;

  const getSign = () => _sign;
  return {
    getSign,
  };
};

const gameController = (() => {
  const _player1 = Player('O');
  const _player2 = Player('X');

  let _currentPlayer = _player1;

  const getPlayer1 = () => _player1;
  const getPlayer2 = () => _player2;
  const getCurrentPlayer = () => _currentPlayer;

  const setCurrentPlayer = (player) => {
    _currentPlayer = player;
  };

  const _changeActivePlayer = () => {
    setCurrentPlayer(_currentPlayer === _player1 ? _player2 : _player1);
  };

  const _checkForWin = (board) => {
    return _checkRows(board) || _checkColumns(board) || _checkDiagonals(board);
  };

  const _checkForDraw = (board) => {
    for (let i = 0; i < 9; i++) {
      if (board.getCell(i) === null) return false;
    }
    return true;
  };

  const _checkRows = (board) => {
    for (let i = 0; i <= 6; i = i + 3) {
      let row = [];
      for (let j = i; j <= i + 2; j++) {
        row.push(board.getCell(j));
      }
      if (
        row.every((field) => field == 'X') ||
        row.every((field) => field == 'O')
      ) {
        return true;
      }
    }
    return false;
  };

  const _checkColumns = (board) => {
    for (let i = 0; i <= 2; i++) {
      let col = [];
      for (let j = i; j <= 8; j = j + 3) {
        col.push(board.getCell(j));
      }
      if (
        col.every((field) => field == 'X') ||
        col.every((field) => field == 'O')
      ) {
        return true;
      }
    }
    return false;
  };

  const _checkDiagonals = (board) => {
    const diag1 = [board.getCell(0), board.getCell(4), board.getCell(8)];
    const diag2 = [board.getCell(2), board.getCell(4), board.getCell(6)];

    return (
      diag1.every((field) => field === 'X') ||
      diag1.every((field) => field === 'O') ||
      diag2.every((field) => field === 'X') ||
      diag2.every((field) => field === 'O')
    );
  };

  const move = (num) => {
    const cell = gameBoard.getCell(num);
    if (cell === null) {
      gameBoard.setCell(num, _currentPlayer);
      if (_checkForWin(gameBoard)) displayController.showWinner(_currentPlayer);
      else if (_checkForDraw(gameBoard)) console.log('DRAW');
      _changeActivePlayer();
      return 1;
    } else {
      console.log('Already filled');
      return -1;
    }
  };

  const restart = () => {
    gameBoard.resetBoard();
    _currentPlayer = _player1;
  };

  return {
    getPlayer1,
    getPlayer2,
    getCurrentPlayer,
    move,
    restart,
  };
})();

const displayController = (() => {
  const _board = document.querySelectorAll('.cell');
  const newGameButton = document.querySelector('.new-game-btn');
  const winnerDiv = document.querySelector('.win');
  const winner = document.querySelector('.winner');

  newGameButton.addEventListener('click', () => {
    gameController.restart();
    _reset();
  });

  const _drawSign = (cell, player) => {
    cell.textContent = player.getSign();
  };

  const _deleteSign = (cell) => {
    cell.textContent = '';
  };

  const _reset = () => {
    _board.forEach((cell) => {
      _deleteSign(cell);
    });
    winnerDiv.classList.add('hidden');
  };

  const showWinner = (player) => {
    winnerDiv.classList.remove('hidden');
    winner.textContent = player.getSign();
  };

  const _initialize = (() => {
    _board.forEach((cell, i) => {
      cell.addEventListener('click', () => {
        const player = gameController.getCurrentPlayer();
        // Take a move and only change the text content if the move was successful
        if (gameController.move(i) === 1) _drawSign(cell, player);
      });
    });
  })();

  return { showWinner };
})();
