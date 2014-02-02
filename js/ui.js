(function(root) {
  var Minesweeper = root.Minesweeper = ( root.Minesweeper || {} );

  var UI = Minesweeper.UI = function($el) {
    this.board = new Minesweeper.Board();
    this.$el = $el;
  }

  UI.prototype.render = function() {
    var ui = this;
    ui.$el.empty();
    ui.board.field.forEach( function(row, row_index) {
      row.forEach( function(space, col_index) {
        var cell = $("<div class='cell'></div>");
        ui.$el.append(cell);   
        cell.data("x", row_index);
        cell.data("y", col_index);
        cell.mousedown(ui.parseClick.bind(ui)); //add click listener

        if (space == "hasBomb") cell.addClass("hasBomb");
        if (space == "hitBomb") cell.addClass("hitBomb");
      })
    });
  }

  UI.prototype.parseClick = function(event) {
    event.preventDefault();
    if ( event.button == 0) {
      var coords = $(event.currentTarget).data();
      this.board.checkForBomb(coords);
    } else if (event.button == 2) {
      console.log("right click");
    }
    this.render();
  }

})(this);
