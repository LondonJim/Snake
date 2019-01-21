class Game {

  constructor() {
    this.gameCanvas = document.getElementById("gameCanvas")
    this.ctx = this.gameCanvas.getContext("2d")
    this.snake = [ {x: 150, y: 150},
                   {x: 140, y: 150},
                   {x: 130, y: 150},
                   {x: 120, y: 150},
                   {x: 110, y: 150} ]
    this.dx = 10
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
    const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy}
    this.snake.unshift(head)
    this.snake.pop()
  }

  keyCheck() {
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
    }

    if(keyPressed === UP_KEY && !goingDown) {
      this.dx = 0
      this.dy = -10
    }

    if(keyPressed === RIGHT_KEY && !goingLeft) {
      this.dx = 10
      this.dy = 0
    }

    if(keyPressed === DOWN_KEY && !goingUp) {
      this.dx = 0
      this.dy = 10
    }

  }

  randomGen(min, max) {
    return Math.round((Math.random() * (min-max) + max) / 10) * 10
  }

  makeFood() {
    console.log("make food")
    this.foodX = this.randomGen(0, this.gameCanvas.width - 10)
    this.foodY = this.randomGen(0, this.gameCanvas.height - 10)

    console.log(this.foodX, this.foodY)

    this.snake.forEach(function(part) {
      console.log(this.foodX, this.foodY, part)
      const foodIsOnSnake = (part.x == this.foodX) && (part.y == this.foodY)
      if (foodIsOnSnake)
        makeFood()
    }.bind(this))
  }

  drawFood() {
    console.log('draw food')
    this.ctx.fillStyle = 'red'
    this.ctx.strokestyle = 'darkred'
    console.log(this.foodX, this.foodY)
    this.ctx.fillRect(this.foodX, this.foodY, 10, 10)
    this.ctx.strokeRect(this.foodX, this.foodY, 10, 10)
  }



}
