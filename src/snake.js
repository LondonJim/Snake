class Snake {

  constructor() {
    this.borderColour = 'black'
    this.backgroundColour = 'white'
    this.gameCanvas = document.getElementById("gameCanvas")
    this.ctx = gameCanvas.getContext("2d")
    this.snake = [ {x: 150, y: 150},
                   {x: 140, y: 150},
                   {x: 130, y: 150},
                   {x: 120, y: 150},
                   {x: 110, y: 150} ]
    this.dx = 10
    this.dy = 0
  }

  fillCanvas() {
    this.ctx.fillStyle = this.backgroundColour
    this.ctx.strokestyle = this.borderColour
    this.ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height)
    this.ctx.strokeRect(0, 0, this.gameCanvas.width, this.gameCanvas.height)
  }

  drawSnakeSegment(snakePart) {
    this.ctx.fillStyle = 'lightgreen'
    this.ctx.strokestyle = 'darkgreen'
    this.ctx.fillRect(snakePart.x, snakePart.y, 10, 10)
    this.ctx.strokeRect(snakePart.x, snakePart.y, 10, 10)
  }

  drawSnake() {
    this.snake.forEach(function(el) {
      this.drawSnakeSegment(el)
    }.bind(this))
  }

  moveSnake() {
    const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy}
    this.snake.unshift(head)
    this.snake.pop()
  }

}
