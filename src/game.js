class Game {

  constructor() {
    this.gameCanvas = document.getElementById("gameCanvas")
    this.ctx = this.gameCanvas.getContext("2d")
    this.snake = [ {x: 150, y: 150},
                   {x: 140, y: 150},
                   {x: 130, y: 150},
                   {x: 120, y: 150},
                   {x: 110, y: 150} ]
    this.dx = 0
    this.dy = 0
  }

  fillCanvas() {
    this.ctx.fillStyle = 'white'
    this.ctx.strokestyle = 'black'
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
    console.log(this.dx, this.dy)
    const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy}
    this.snake.unshift(head)
    this.snake.pop()
  }

  checkKey() {
    document.addEventListener("keydown", this.changeDirection.bind(this))
  }

  changeDirection(event) {
    const LEFT_KEY = 37
    const RIGHT_KEY = 39
    const UP_KEY = 38
    const DOWN_KEY = 40

    const keyPressed = event.keyCode
    const goingUp = this.dy === -10
    const goingDown = this.dy === 10
    const goingRight = this.dx === 10
    const goingLeft = this.dx === -10

    if(keyPressed === LEFT_KEY && !goingRight) {
      this.dx = -10
      this.dy = 0
      console.log(this.dx, this.dy)
    }

    if(keyPressed === UP_KEY && !goingDown) {
      this.dx = 0
      this.dy = -10
      console.log(this.dx, this.dy)
    }

    if(keyPressed === RIGHT_KEY && !goingLeft) {
      this.dx = 10
      this.dy = 0
      console.log(this.dx, this.dy)
    }

    if(keyPressed === DOWN_KEY && !goingUp) {
      this.dx = 0
      this.dy = 10
      console.log(this.dx, this.dy)
    }

  }

}
