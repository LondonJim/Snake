class Play {

  constructor(game = new Game) {
    this.game = game
  }

  start(){
    this.game.checkKey()
    this.main()
  }

  main(){
    setTimeout(function onTick() {
      this.game.fillCanvas()
      this.game.moveSnake()
      this.game.drawSnake()
      this.main()
    }.bind(this), 100)
  }

}
