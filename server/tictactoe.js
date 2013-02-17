Meteor.startup(function () {
  Games.remove({ name: 'first' });
  startNewGame();
});
