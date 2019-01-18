class Play {

  constructor(snake = new Snake) {
    this.snake = snake
  }

  start(){
    this.snake.fillCanvas()
    this.snake.drawSnake()
  }

}
