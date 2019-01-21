class Play {

  constructor(game = new Game) {
    this.game = game
  }

  start(){
    this.game.keyCheck()
    this.main()
    this.game.makeFood()
  }

  main(){
    setTimeout(function onTick() {
      this.game.fillCanvas()
      this.game.drawFood()
      this.game.moveSnake()
      this.game.drawSnake()
      this.main()
    }.bind(this), 100)
  }

}
