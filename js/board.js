(function(root) {
  var Minesweeper = root.Minesweeper = ( root.Minesweeper || {} );

  var Board = Minesweeper.Board = function() {
    this.field = this.makeField();
    this.setBombs();
  };

  Board.SIZE = 10;
  Board.BOMB_COUNT = 10;

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
      if (this.field[x][y] != "hasBomb") {
        this.field[x][y] = "hasBomb";
        bombs.push([x,y]);
      }
    }
  }

  Board.prototype.checkForBomb = function(coords) {
    var row = coords.row;
    var col = coords.col;
    if (this.field[row][col] == "hasBomb") {
      this.field[row][col] = "hitBomb";
    } else {
      this.checkAdj(row, col);
    }
  }

  Board.prototype.checkAdj = function(row, col) {
    var board = this;
    var mineCount = 0;
    var adj = [ [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1], [-1, 0], [-1, 1] ];
    adj.forEach( function(pair) {
      var adjRow = row + pair[0];
      var adjCol = col + pair[1];
      var inBounds = ( adjRow >= 0 && adjRow < Board.SIZE && adjCol >= 0 && adjCol < Board.SIZE )
      if (inBounds && board.field[adjRow][adjCol] == "hasBomb") {
        mineCount++;
      }
    });

    //set # of mines adj to this cell
    board.field[row][col] = mineCount;

    //recursive tile reveal if no bombs
    if (mineCount > 0) return;
    adj.forEach( function(pair) {
      var adjRow = row + pair[0];
      var adjCol = col + pair[1];
      var inBounds = ( adjRow >= 0 && adjRow < Board.SIZE && adjCol >= 0 && adjCol < Board.SIZE );
      if (inBounds && parseInt(board.field[adjRow][adjCol]) != board.field[adjRow][adjCol]) {
        board.checkAdj.call(board, adjRow, adjCol);
      }
    });
  }
})(this);
