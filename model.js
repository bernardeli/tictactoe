Games = new Meteor.Collection("games");
Players = new Meteor.Collection("players");

var winCombinations = [
  [ [0,0], [0,1], [0,2] ],
  [ [1,0], [1,1], [1,2] ],
  [ [2,0], [2,1], [2,2] ],
  [ [0,0], [1,0], [2,0] ],
  [ [0,1], [1,1], [2,1] ],
  [ [0,2], [1,2], [2,2] ],
  [ [0,0], [1,1], [2,2] ],
  [ [0,2], [1,1], [2,0] ]
];

var resetGame = function(game) {
  var scoreBoard = newGameBoard();
  Games.update(game._id, { scoreBoard: scoreBoard, name: 'first' });
};

var startNewGame = function() {
  var scoreBoard = newGameBoard();
  Games.insert({ scoreBoard: scoreBoard, name: 'first' });
};

var newGameBoard = function() {
  var scoreBoard = new Array(3);

  for (var i = 0; i < 3; i++) {
    scoreBoard[i] = new Array(3);
    for (var j = 0; j < 3; j++) {
      scoreBoard[i][j] = '';
    }
  }

  return scoreBoard;
};

var setMovement = function(game, row, column, type) {
  game.scoreBoard[row][column] = type;
  Games.update(game._id, { scoreBoard: game.scoreBoard, name: 'first' });
};

var findWinner = function(game) {
  var winner = '';

  $.each(winCombinations, function(index, combination){
    ax = combination[0][0]
    ay = combination[0][1]

    bx = combination[1][0]
    by = combination[1][1]

    cx = combination[2][0]
    cy = combination[2][1]

    if (!!game[ax][ay] && !!game[bx][by] && !!game[cx][cy] &&
          (game[ax][ay] === game[bx][by]) && (game[bx][by] === game[cx][cy]) && (game[cx][cy] === game[ax][ay])) {
      winner = game[ax][ay];
    }
  });

  return winner;
};
