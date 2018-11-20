class SceneGameOver extends Phaser.Scene {
  constructor(){
    super({key:'SceneGameOver'});
  }
  init(data){
    this.body = data.body;
    this.vyhra = data.vyhra;
  }
  preload(){
    this.load.image('tlacitkoZnovu', 'assets/hero.png');
  }
  create(){
    this.canvas = this.sys.game.canvas;
    var napisX = this.canvas.width/2-50;
    var napisY = this.canvas.height/2-10;
    if(this.vyhra){
      this.text = this.add.text(napisX, napisY, "Výhra");
    }else{
      this.text = this.add.text(napisX, napisY, "Prohra");
    }
    this.textBody = this.add.text(napisX, napisY+30, "body : "+this.body);
		const clickButton = this.add.text(100, 100, 'hrat znovu', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => this.hratZnovu() );

  }
  update(delta){
    this.controls();
  }
  controls(){
    // TODO: restart button
  }
	hratZnovu(){
		console.log("hratZnovu");
    this.game.scene.stop("SceneGameOver");
    this.game.scene.start("SceneGame");
	}
}
