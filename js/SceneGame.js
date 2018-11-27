class SceneGame extends Phaser.Scene {
  constructor(){
    super({key:'SceneGame'});

    this.heroSpeed = 5;
    this.zombieSpeed = 1;
    this.pocetZombiku = 5;
    this.zombici = [];
    this.pocetStars = 5;
    this.stars = [];
    this.body = 0
    this.paused = false;
    this.smrtelnost = true;
    this.nesmrtelnost(2000);
  }
  preload(){
    //načtení obrázků
    this.load.image('hero', 'assets/hero.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('zombie', 'assets/zombie.png');
    //načtení zvuků
    this.load.audio('bod', 'assets/bod.mp3');
  }
  create(){
    // vytvoření herního plátna
    this.canvas = this.sys.game.canvas;
    // obrázek hrdiny
    this.hero = this.add.image(200, 200, 'hero');
    //zvuky hry
    this.bodZvuk = this.sound.add('bod');
    // vložení textu
    this.text = this.add.text(0, 0, "Game Zero");
    this.bodyText = this.add.text(400, 0, "body: "+this.body);
    //ovádání klávesnice
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown_P', this.pause,this);
		// vytvoření instancí třídy Zombie
    for(var i = 0; i < this.pocetZombiku; i++){
      this.zombici[i] = new Zombie(this);
    }
    // vytvoření instancí třídy Star
    for(var j = 0; j < this.pocetStars; j++){
      this.stars[j] = new Star(this);
    }
  }
  update(delta){
    if(!this.paused){
      for(var i = 0; i < this.pocetZombiku; i++){
        this.zombici[i].update();
      }
      for(var j = 0; j < this.pocetStars; j++){
        this.stars[j].update();
      }
      this.controls();
    }
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
  nesmrtelnost(time){
    this.smrtelnost = false;
    var that = this;
    window.setTimeout(function(){
      that.smrtelnost = true;
    },time);
  }
  pause(){
    console.log("pause",this.paused);
    this.paused = !this.paused;
    console.log("pause",this.paused);
  }
  vyhra(){
    this.scene.stop("SceneGame");
    this.scene.start("SceneGameOver",{body:this.body, vyhra:true});
    this.reset();
  }
  prohra(){
    this.scene.stop("SceneGame");
    this.scene.start("SceneGameOver",{body:this.body, vyhra:false});
    this.reset();
  }
  reset(){
    this.zombieSpeed =1;
    this.body = 0;
  }
}
