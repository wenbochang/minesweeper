(function(root) {
  var Minesweeper = root.Minesweeper = ( root.Minesweeper || {} );

  var Board = Minesweeper.Board = function() {
    this.field = this.makeField();
    this.setBombs();
  };

  Board.SIZE = 20;
  Board.BOMB_COUNT = 20;

  Board.prototype.makeField = function() {
    var field = [];
    for (var i=0; i < Board.SIZE; i++ ) {
      field.push( [] );
      for (var j=0; j < Board.SIZE; j++ ) {
        field[i].push(null);
      }  
    }
    return field;
  }

  Board.prototype.setBombs = function() {
    var bombs = [];
    while (bombs.length < Board.BOMB_COUNT) {
      var x = Math.floor((Math.random() * Board.SIZE));
      var y = Math.floor((Math.random() * Board.SIZE));
      this.field[x][y] = "B";
      bombs.push([x,y]);
    }
  }
})(this);
