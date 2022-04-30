const gameBoard = (() => {
  const _board = new Array(9).fill(null);

  const getCell = (num) => _board[num];

  const setCell = (num, player) => {
    _board[num] = player.getSign();
  };

  return {
    getCell,
    setCell,
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
  const _player1 = Player('X');
  const _player2 = Player('O');
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

  const move = (num) => {
    const cell = gameBoard.getCell(num);
    if (cell === null) {
      gameBoard.setCell(num, _currentPlayer);
      _changeActivePlayer();
    } else {
      console.log('Already filled');
    }
  };

  return {
    getPlayer1,
    getPlayer2,
    getCurrentPlayer,
    move,
  };
})();

const displayController = (() => {
  const _board = document.querySelectorAll('.cell');

  const _drawSign = (cell, player) => {
    cell.textContent = player.getSign();
  };

  const _initialize = (() => {
    _board.forEach((cell, i) => {
      cell.addEventListener('click', () => {
        gameController.move(i);
        _drawSign(cell, gameController.getCurrentPlayer());
      });
    });
  })();
})();
