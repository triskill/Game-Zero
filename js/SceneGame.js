class SceneGame extends Phaser.Scene {
  constructor(){
    super({key:'SceneGame'});

    this.heroSpeed = 5;
    this.zombieSpeed = 2;
    this.pocetZombiku = 5;
    this.zombici = [];
  }
  preload(){
    this.load.image('hero', 'assets/hero.png');
    this.load.image('zombie', 'assets/zombie.png');
  }
  create(){
    this.canvas = this.sys.game.canvas;
    this.hero = this.add.image(200, 200, 'hero');
    this.text = this.add.text(0, 0, "Game Zero");
    this.cursors = this.input.keyboard.createCursorKeys();

    for(var i = 0; i < this.pocetZombiku; i++){
      this.zombici[i] = new Zombie(this);
    }

  }
  update(delta){
    for(var i = 0; i < this.pocetZombiku; i++){
      this.zombici[i].update();
    }
    this.controls();
  }
  controls(){
    if(this.cursors.left.isDown && this.hero.x > 25){
      this.hero.x -= this.heroSpeed;
    }else if (this.cursors.right.isDown && this.hero.x < (this.canvas.width-25)) {
      this.hero.x += this.heroSpeed;
    }
    if (this.cursors.up.isDown && this.hero.y > 30) {
      this.hero.y -= this.heroSpeed;
    }else if (this.cursors.down.isDown && this.hero.y < (this.canvas.height-30)) {
      this.hero.y += this.heroSpeed;
    }

  }

}
