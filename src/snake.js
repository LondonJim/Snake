class Snake {

  constructor() {
    this.borderColour = 'black'
    this.backgroundColour = 'white'
    this.gameCanvas = document.getElementById("gameCanvas")
    this.ctx = gameCanvas.getContext("2d")
    this.fillCanvas()
  }

  fillCanvas() {
    this.ctx.fillStyle = this.backgroundColour
    this.ctx.strokestyle = this.borderColour
    this.ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height)
    this.ctx.strokeRect(0, 0, this.gameCanvas.width, this.gameCanvas.height)
  }

}
