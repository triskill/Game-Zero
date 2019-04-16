class SceneGame extends Phaser.Scene {
  constructor(){
    super({key:'SceneGame'});

    this.heroSpeed = 5;
    this.zombieSpeed = 1;
    this.body = 0
    this.paused = false;
    this.smrtelnost = true;
    this.stars = [];
    this.zombies = [];
    this.achievedLevel = 1;
    this.levels = [
      {},
      {
        zombies:[
          {},
          {},
          {}
        ],
        stars:[
          {},
          {},
          {}
        ]
      },
      {
        zombies:[
          {},
          {},
          {},
          {}
        ],
        stars:[
          {},
          {},
          {},
          {}
        ]
      },
      {
        zombies:[
          {},
          {},
          {},
          {},
          {}
        ],
        stars:[
          {},
          {},
          {},
          {},
          {}
        ]
      }
    ];
    this.nesmrtelnost(1000);
  }
  init(data){
    this.level = data.level || 1;
  }
  preload(){
    //načtení obrázků
    this.load.image('hero', 'assets/hero.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('zombie', 'assets/zombie.png');
    this.load.image('gameOverBG', 'assets/gameOverBackground.png');
    //načtení zvuků
    this.load.audio('bod', 'assets/bod.mp3');
  }
  create(){
    // načtení levelu
    var level = this.levels[this.level];
    // vytvoření herního plátna
    this.canvas = this.sys.game.canvas;
    // obrázek hrdiny
    this.hero = this.add.image(200, 200, 'hero');
    //zvuky hry
    this.bodZvuk = this.sound.add('bod');
    // vložení textu
    this.text = this.add.text(0, 0, "Game Zero");
    this.bodyText = this.add.text(400, 0, "body: "+this.body);
    this.add.text(300, 0, "level: "+this.level);
    //ovádání klávesnice
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on('keydown_P', this.pause,this);
		// vytvoření instancí třídy Zombie
    for(var i = 0; i < level.zombies.length; i++){
      this.zombies[i] = new Zombie(this, level.zombies[i]);
    }
    // vytvoření instancí třídy Star
    for(var i = 0; i < level.stars.length; i++){
      this.stars[i] = new Star(this, level.stars[i]);
    }
  }
  update(delta){
    if(!this.paused){
      for(var i = 0; i < this.zombies.length; i++){
        this.zombies[i].update();
      }
      for(var j = 0; j < this.stars.length; j++){
        this.stars[j].update();
      }
      this.controls();
    }
  }
  ziskanBod(){
    this.body++;
    this.bodZvuk.play();
    this.bodyText.text = "body: "+this.body;
    if(this.stars.length == this.body){
      this.vyhra();
    }
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
  gameOver(vyhra){
    this.paused = true;
    this.hero = this.add.image(this.canvas.width/2, this.canvas.height/2, 'gameOverBG');
    var napisX = this.canvas.width/2-50;
    var napisY = this.canvas.height/2-10;
    if(vyhra){
      this.text = this.add.text(napisX, napisY, "Výhra");
      if(this.achievedLevel == this.levels.length){
        this.text = this.add.text(130, napisY -80, "Princezna zachráně", {fill:"#33f", font:"bold 60px Arial"});
      }
    }else{
      this.text = this.add.text(napisX, napisY, "Prohra");
    }
    this.textBody = this.add.text(napisX, napisY+30, "body : "+this.body);
    for (let i = 1; i < (this.levels.length); i++) {
      if(i <= this.achievedLevel){
        this.add.text(100, 100+30*i, 'Level '+i, { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.playLevel(i) );
      }else{
        this.add.text(100, 100+30*i, 'Level '+i, { fill: '#888' })
      }
    }

  }
  pause(){
    this.paused = !this.paused;
  }
  vyhra(){
    if(this.level == this.achievedLevel){
      this.achievedLevel++;
    }
    this.gameOver(true);
  }
  prohra(){
    this.gameOver(false);
  }
  playLevel(lvl){
    this.reset();
    this.paused = false;
    this.game.scene.start("SceneGame", {level: lvl});
	}
  reset(){
    this.zombieSpeed =1;
    this.stars = [];
    this.zombies = [];
    this.body = 0;
  }
}
