class SceneGameOver extends Phaser.Scene {
  constructor(){
    super({key:'SceneGameOver'});
  }
  preload(){
    // this.load.image('hero', 'assets/hero.png');
  }
  create(){
    this.canvas = this.sys.game.canvas;
    var napisX = this.canvas.width/2-50;
    var napisY = this.canvas.height/2-10;
    this.text = this.add.text(napisX, napisY, "Game Over");
  }
  update(delta){
    this.controls();
  }
  controls(){
    // TODO: restart button
  }

}
