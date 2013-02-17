Template.turn.turn = function(){
  return Turns.findOne();
};

Template.listRows.rows = function(){
  return [1,2,3];
};

var row = 0;
Template.listCells.cells = function(){
  return Cells.find({ row: row++ });
};

Template.cell.events({
  'click .movement.available' : function(e){
    cell = $(e.target);
    cell.removeClass("available");

    turn = Turns.findOne();
    Cells.update(this._id, { row: this.row, column: this.column, move: turn.turn });
    changeTurn(turn);

    winner = findWinner();
    gameHasWinner(winner);
  }
});

Template.resetCells.events({
  'click button': function(){
    resetCells();
    resetTurn();
  }
});

var changeTurn = function(turn){
  if (turn.turn == "x") {
    Turns.update(turn._id, { turn: 'o' } );
  } else {
    Turns.update(turn._id, { turn: 'x' } );
  }
};

var gameHasWinner = function(winner){
  if (winner.length > 0) {
    $(".available").removeClass("available");
    $.each(winner, function(index, cell){
      Cells.update(cell._id, { row: cell.row, column: cell.column, move: cell.move, winner: true })
    });
  };
}

