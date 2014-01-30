(function(root) {
  var Minesweeper = root.Minesweeper = ( root.Minesweeper || {} );

  var UI = Minesweeper.UI = function($el) {
    var board = new Minesweeper.Board();
    this.field = board.field;
    this.$el = $el;
  }

  UI.prototype.render = function() {
    var ui = this;
    ui.$el.html();
    ui.field.forEach( function(row) {
      row.forEach( function(space) {
        var cell = $("<div class='cell'></div>");
        if (space === "B") {
          cell.addClass("hasBomb");
        }
        ui.$el.append(cell);   
        cell.click(ui.checkForBomb);
      })
    });

    return this;
  }

  UI.prototype.checkForBomb = function(event) {
    var cell = event.currentTarget;
    console.log($(cell).hasClass("hasBomb"));
//    if (space === "B") console.log("bomb");
  }

})(this);
