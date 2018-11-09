class SceneGame extends Phaser.Scene {
  constructor(){
    super({key:'SceneGame'});

    this.heroSpeed = 5;
    this.zombieSpeed = 2;
    this.pocetZombiku = 5;
    this.zombici = [];
    this.pocetStars = 5;
    this.stars = [];
    this.body = 0
  }
  preload(){
    this.load.image('hero', 'assets/hero.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('zombie', 'assets/zombie.png');
  }
  create(){
    this.canvas = this.sys.game.canvas;
    this.hero = this.add.image(200, 200, 'hero');
    this.text = this.add.text(0, 0, "Game Zero");
    this.bodyText = this.add.text(400, 0, "body: "+this.body);
    this.cursors = this.input.keyboard.createCursorKeys();

    for(var i = 0; i < this.pocetZombiku; i++){
      this.zombici[i] = new Zombie(this);
    }
    for(var i = 0; i < this.pocetStars; i++){
      this.stars[i] = new Star(this);
    }

  }
  update(delta){
    for(var i = 0; i < this.pocetZombiku; i++){
      this.zombici[i].update();
    }
    for(var i = 0; i < this.pocetStars; i++){
      this.stars[i].update();
    }
    this.controls();
  }
  ziskanBod(){
    this.body++;
    this.bodyText.text = "body: "+this.body;


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
