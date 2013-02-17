Cells = new Meteor.Collection("cells");
Turns = new Meteor.Collection("turns");

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

var resetCells = function(){
  Cells.remove({});
  startCells();
};

var resetTurn = function(){
  Turns.remove({});
  Turns.insert({turn: 'x'});
}

var startCells = function(){
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      Cells.insert({ row: i, column: j, move: '' })
    }
  }
};

var findWinner = function(game) {
  var winner = [];

  $.each(winCombinations, function(index, combination){
    cell1 = Cells.findOne({ row: combination[0][0], column: combination[0][1] })
    cell2 = Cells.findOne({ row: combination[1][0], column: combination[1][1] })
    cell3 = Cells.findOne({ row: combination[2][0], column: combination[2][1] })

    if (!!cell1.move &&
          !!cell2.move &&
          !!cell3.move &&
          (cell1.move === cell2.move) &&
          (cell2.move === cell3.move) &&
          (cell3.move === cell1.move)) {
      winner = [cell1, cell2, cell3];
    }
  });

  return winner;
};
