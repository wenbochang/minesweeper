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
        ui.addClassToCell(fieldSpace, cell);

        //add click listener only if game is still going
        if (ui.board.state === "playing") cell.mousedown(ui.parseClick.bind(ui));                 
      })
    })
    ui.updateBombCount();
  }

  UI.prototype.updateBombCount = function() {
    var $display = $("#bombCountDisplay");
    var flagCount = $(".flag").length;
    $display.text("Bombs left: " + (window.BOMB_COUNT - flagCount));
  }

  UI.prototype.addClassToCell = function(fieldSpace, cell) {
    if (this.board.state == "lost" && fieldSpace.hasBomb) cell.addClass("hasBomb");
    if (fieldSpace.hitBomb) cell.addClass("hitBomb");
    if (fieldSpace.flag == "flag") cell.addClass("flag");
    else if (fieldSpace.flag == "?") cell.text("?");
    else if (fieldSpace.mineCount == parseInt(fieldSpace.mineCount)) {
      cell.addClass("safe");
      cell.text(fieldSpace.mineCount);
    }
  }

  UI.prototype.parseClick = function(event) {
    var coords = $(event.currentTarget).data();
    if (event.button == 0) {
      this.board.checkForBomb(coords);
    } else if (event.button == 2) {
      this.board.flagForBomb(coords);
    }
    this.render();
  }

})(this);
