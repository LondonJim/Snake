class Game {

  constructor() {
    this.gameCanvas = document.getElementById("gameCanvas")
    this.ctx = this.gameCanvas.getContext("2d")
    this.snakeSprites = new Image()
    this.snakeSprites.src = "./img/snake-graphics.png"
    this.snake = [ {x: 150, y: 150},
                   {x: 140, y: 150},
                   {x: 130, y: 150},
                   {x: 120, y: 150},
                   {x: 110, y: 150} ]
    this.dx = 10
    this.dy = 0
    this.direction = 'right'
    this.speed = 100
    this.score = 0
    this.changingDirection = false
    this.makeFood()
  }

  fillCanvas() {
    this.ctx.fillStyle = 'white'
    this.ctx.strokestyle = 'black'
    this.ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height)
    this.ctx.strokeRect(0, 0, this.gameCanvas.width, this.gameCanvas.height)
  }

  drawSnakeSegment(snakePart, index) {
    let partX = this.snake[index].x
    let partY = this.snake[index].y
    let spriteX
    let spriteY

    if (this.snake[0] === this.snake[index]) {
        let partNext = this.snake[index + 1]
        if (partY < partNext.y) {
          spriteX = 30; spriteY = 0
        } else if (partX > partNext.x) {
          spriteX = 40; spriteY = 0
        } else if (partY > partNext.y) {
          spriteX = 40; spriteY = 10
        } else if (partX < partNext.x) {
          spriteX = 30; spriteY = 10
        }

    } else if (this.snake[this.snake.length - 1] === this.snake[index]) {
        let partPrev = this.snake[index - 1]
        if (partPrev.y < partY) {
          spriteX = 30; spriteY = 20
        } else if (partPrev.x > partX) {
          spriteX = 40; spriteY = 20
        } else if (partPrev.y > partY) {
          spriteX = 40; spriteY = 30
        } else if (partPrev.x < partX) {
          spriteX = 30; spriteY = 30
        }

    } else {
        let partPrev = this.snake[index - 1]
        let partNext = this.snake[index + 1]

        if ((partNext.x > partX) && (partPrev.y > partY) || (partNext.y > partY) && (partPrev.x > partX)) {
            spriteX = 0 ; spriteY = 0
        } else if ((partNext.x < partX) && (partPrev.y < partY) || (partNext.y < partY) && (partPrev.x < partX)) {
            spriteX = 20 ; spriteY = 20
        } else if ((partNext.x > partX) && (partPrev.y < partY) || (partNext.y < partY) && (partPrev.x > partX)) {
            spriteX = 0 ; spriteY = 10
        } else if ((partNext.x < partX) && (partPrev.y > partY) || (partNext.y > partY) && (partPrev.x < partX)) {
            spriteX = 20 ; spriteY = 0
        } else if ((partNext.x > partX) && (partPrev.x > partX) || (partNext.y > partY) && (partPrev.x < partX)) {
            spriteX = 20 ; spriteY = 0
        } else if ((partNext.x > partX) && (partPrev.x < partX) || (partPrev.x > partX) && (partNext.x < partX)) {
            spriteX = 10 ; spriteY = 0
        } else if ((partNext.y < partY) && (partPrev.y > partY) || (partPrev.y < partY) && (partNext.y > partY)) {
            spriteX = 20 ; spriteY = 10
        }
    }
    this.ctx.drawImage(this.snakeSprites, spriteX, spriteY, 10, 10, partX, partY, 10, 10)
  }

  drawSnake() {
    for (let i = 0; i < this.snake.length; i++) {
      this.drawSnakeSegment(this.snake[i], i)
    }
  }

  moveSnake() {
    const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy}
    this.snake.unshift(head)

    const eatFood = this.snake[0].x === this.foodX && this.snake[0].y === this.foodY

    if (eatFood) {
      this.makeFood()
      this.speed -= 1
      this.score += 1
      document.getElementById('score_number').innerHTML = this.score
    } else {
      this.snake.pop()
    }

  }

  keyCheck() {
    document.addEventListener("keydown", this.changeDirection.bind(this))
  }

  changeDirection(event) {
    const LEFT_KEY = 37
    const RIGHT_KEY = 39
    const UP_KEY = 38
    const DOWN_KEY = 40

    if (this.changingDirection) return
    this.changingDirection = true

    const keyPressed = event.keyCode
    const goingUp = this.dy === -10
    const goingDown = this.dy === 10
    const goingRight = this.dx === 10
    const goingLeft = this.dx === -10

    if(keyPressed === LEFT_KEY && !goingRight) {
      this.dx = -10
      this.dy = 0
      this.direction = "left"
    }

    if(keyPressed === UP_KEY && !goingDown) {
      this.dx = 0
      this.dy = -10
      this.direction = "up"
    }

    if(keyPressed === RIGHT_KEY && !goingLeft) {
      this.dx = 10
      this.dy = 0
      this.direction = "right"
    }

    if(keyPressed === DOWN_KEY && !goingUp) {
      this.dx = 0
      this.dy = 10
      this.direction = "down"
    }

  }

  randomGen(min, max) {
    return Math.round((Math.random() * (min-max) + max) / 10) * 10
  }

  makeFood() {
    this.foodX = this.randomGen(0, this.gameCanvas.width - 10)
    this.foodY = this.randomGen(0, this.gameCanvas.height - 10)

    this.snake.forEach(function(part) {
      const foodIsOnSnake = (part.x == this.foodX) && (part.y == this.foodY)
      if (foodIsOnSnake)
        this.makeFood()
    }.bind(this))
  }

  drawFood() {
    this.ctx.drawImage(this.snakeSprites, 0, 30, 10, 10, this.foodX, this.foodY, 10, 10)
  }

  endCheck() {
    for (let i = 4; i < this.snake.length; i++) {
      const collide = (this.snake[i].x === this.snake[0].x) &&
        (this.snake[i].y === this.snake[0].y)

      if (collide) return true
    }

    const hitLeft = this.snake[0].x < 0
    const hitRight = this.snake[0].x > this.gameCanvas.width - 10
    const hitTop = this.snake[0].y < 0
    const hitBottom = this.snake[0].y > this.gameCanvas.height - 10

    return hitLeft || hitRight || hitTop || hitBottom
  }

}
