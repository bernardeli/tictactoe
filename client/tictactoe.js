var column = 0;
Template.cell.column = function() {
  if (column === 3) { column = 0 }

  return column++;
};

var row = 0;
var row_occurances = 0;
Template.cell.row = function() {
  if (row_occurances === 3) {
    row_occurances = 0;
    row++;
  }

  row_occurances++;
  return row;
};

Template.cell.events({
  'click .movement.available' : function(e){
    cell = $(e.target);
    cell.removeClass("available");

    var attributes = findCellAttributes(cell);
    changeTurn(cell, attributes.turn);

    game = Games.findOne({ name: 'first' });
    setMovement(game, attributes.row, attributes.column, attributes.turn);
    winner = findWinner(game.scoreBoard);
    gameHasWinner(winner);
  }
});

var findCellAttributes = function(cell){
  var row = cell.data('row');
  var column = cell.data('column');
  var turn = $("#turn").data("turn");

  return { row: row, column: column, turn: turn }
};

var changeTurn = function(cell, turn){
  if (turn == "x") {
    template = Template.xmove;
    $("#turn").data("turn", "o");
  } else {
    template = Template.omove;
    $("#turn").data("turn", "x");
  }

  cell.html(template);
};

var gameHasWinner = function(){
  if (winner !== "") {
    $("#winner").text(winner + " is the winner");
    $(".available").removeClass("available");
    resetGame(game);
  }
}
