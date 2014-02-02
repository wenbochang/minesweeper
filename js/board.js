(function(root) {
  var Minesweeper = root.Minesweeper = ( root.Minesweeper || {} );

  var Board = Minesweeper.Board = function() {
    this.field = this.makeField();
    this.setBombs();
  };

  Board.SIZE = 10;
  Board.BOMB_COUNT = window.BOMB_COUNT = 10;

  Board.prototype.makeField = function() {
    var field = [];
    for (var i=0; i < Board.SIZE; i++ ) {
      field.push( [] );
      for (var j=0; j < Board.SIZE; j++ ) {
        field[i].push({});
      }  
    }
    return field;
  }

  Board.prototype.setBombs = function() {
    var bombs = [];
    while (bombs.length < Board.BOMB_COUNT) {
      var x = Math.floor((Math.random() * Board.SIZE));
      var y = Math.floor((Math.random() * Board.SIZE));
      if (!this.field[x][y].hasBomb) {
        this.field[x][y].hasBomb = true;
        bombs.push([x,y]);
      }
    }
  }

  Board.prototype.checkGameOver = function() {
    var gameOver = true;
    this.field.forEach( function(row) {
      row.forEach( function(fieldSpace) {
        if (fieldSpace.mineCount === undefined && !fieldSpace.hasBomb) {
          gameOver = false;
        }
      })
    })
    return gameOver;
  }

  Board.prototype.checkForBomb = function(coords) {
    var row = coords.row;
    var col = coords.col;
    if (this.field[row][col].hasBomb) {
      alert("You lose!");
    } else {
      this.checkAdj(row, col);
    }
    if (this.checkGameOver()) alert("You win!");
  }

  Board.prototype.flagForBomb = function(coords) {
    var row = coords.row;
    var col = coords.col;
    if (this.field[row][col].flag === undefined ) {
      this.field[row][col].flag = "flag";
    } 
    else if (this.field[row][col].flag === "flag") {
      this.field[row][col].flag = "?";
    } 
    else if (this.field[row][col].flag === "?") {
      this.field[row][col].flag = undefined;
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
      if (inBounds && board.field[adjRow][adjCol].hasBomb) {
        mineCount++;
      }
    });

    //set # of mines adj to this cell
    board.field[row][col].mineCount = mineCount;

    //recursive tile reveal if no bombs
    if (mineCount > 0) return;
    adj.forEach( function(pair) {
      var adjRow = row + pair[0];
      var adjCol = col + pair[1];
      var inBounds = ( adjRow >= 0 && adjRow < Board.SIZE && adjCol >= 0 && adjCol < Board.SIZE );
      if (inBounds && board.field[adjRow][adjCol].mineCount === undefined) {
        board.checkAdj.call(board, adjRow, adjCol);
      }
    });
  }
})(this);
