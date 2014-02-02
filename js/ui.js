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
      row.forEach( function(fieldSpace, col_index) {
        var cell = $("<div class='cell'></div>");
        ui.$el.append(cell);   
        cell.data("row", row_index);
        cell.data("col", col_index);
        cell.mousedown(ui.parseClick.bind(ui)); //add click listener
        
        ui.addClassToCell(fieldSpace, cell);
      })
    });
  }

  UI.prototype.addClassToCell = function(fieldSpace, cell) {
    if (fieldSpace == "hasBomb") cell.addClass("hasBomb");
    else if (fieldSpace == "hitBomb") cell.addClass("hitBomb");
    else if (fieldSpace == parseInt(fieldSpace)) {
      cell.text(fieldSpace);
    }
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
