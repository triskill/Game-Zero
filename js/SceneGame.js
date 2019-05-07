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
    this.levels = [
      {},
      {
        zombies:[
          {type:"kruh", x:100, y:100},
          {type:"kruh", x:700, y:100},
          {type:"kruh", x:700, y:500},
          {type:"kruh", x:100, y:500},
        ],
        stars:[
            {x:100, y:100},
            {x:700, y:100},
            {x:700, y:500},
            {x:100, y:500},
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
          {x:100, y:100},
          {x:150, y:100},
          {x:200, y:100},
          {x:250, y:100}
        ]
      },
      {
        zombies:[
          {},
          {},
          {},
          {},
          {},
          {},
        ],
        stars:[
          {x:100, y:100},
          {x:200, y:200},
          {x:100, y:300},
          {x:0, y:200},
        ],
            zombies:[
              {},
              {},
              {}
            ],
            stars:[
              {x:400,y:200},
              {x:400,y:400},


              {x:200,y:300},
              {x:600,y:300},

              {x:300,y:250},
              {x:500,y:250},
              {x:300,y:350},
              {x:500,y:350},
            ]
          },
          {
            zombies:[
              {type:"kruh", x:100, y:500},
              {type:"kruh", x:175, y:450},
              {type:"kruh", x:250, y:400},
              {type:"kruh", x:325, y:350},
              {type:"kruh", x:400, y:300},
              {type:"kruh", x:475, y:250},
              {type:"kruh", x:550, y:200},
              {type:"kruh", x:625, y:150},
              {type:"kruh", x:700, y:100},

                {type:"stop", x:100, y:500},
                {type:"stop", x:175, y:450},
                {type:"stop", x:250, y:400},
                {type:"stop", x:325, y:350},
                {type:"stop", x:400, y:300},
                {type:"stop", x:475, y:250},
                {type:"stop", x:550, y:200},
                {type:"stop", x:625, y:150},
                {type:"stop", x:700, y:100},
            ],
            stars:[
              {x:700,y:500},

            ],
          },
          {
              zombies:[
                {type:"stop", x:50, y:550},
                {type:"stop", x:100, y:500},
                {type:"stop", x:150, y:450},
                {type:"stop", x:200, y:400},
                {type:"stop", x:250, y:350},
                {type:"stop", x:300, y:300},
                {type:"stop", x:350, y:250},
                {type:"stop", x:400, y:200},
                {type:"stop", x:450, y:150},
                {type:"stop", x:500, y:100},
                {type:"stop", x:550, y:50},
              ],
              stars:[
                {x:75, y:525},
                {x:125, y:475},
                {x:175, y:425},
                {x:225, y:375},
                {x:275, y:325},
                {x:325, y:275},
                {x:375, y:225},
                {x:425, y:175},
                {x:475, y:125},
                {x:525, y:75},
                {x:575, y:25},

              ],
            },
            {
              zombies:[
                {x:200,y:200, type:"kruh", posun:1*Math.PI/4},
                {x:200,y:200, type:"kruh", posun:2*Math.PI/4},
                {x:200,y:200, type:"kruh", posun:3*Math.PI/4},
                {x:200,y:200, type:"kruh", posun:4*Math.PI/4},
                {x:200,y:200, type:"kruh", posun:5*Math.PI/4},
                {x:200,y:200, type:"kruh", posun:6*Math.PI/4},
                {x:200,y:200, type:"kruh", posun:7*Math.PI/4},
                {x:200,y:200, type:"kruh", posun:8*Math.PI/4},
                {x:500,y:500, type:"kruh", posun:9*Math.PI/4},
                {x:500,y:500, type:"kruh", posun:10*Math.PI/4},
                {x:500,y:500, type:"kruh", posun:11*Math.PI/4},
                {x:500,y:500, type:"kruh", posun:12*Math.PI/4},
                {x:500,y:500, type:"kruh", posun:13*Math.PI/4},
                {x:500,y:500, type:"kruh", posun:14*Math.PI/4},
                {x:500,y:500, type:"kruh", posun:15*Math.PI/4},
                {x:500,y:500, type:"kruh", posun:16*Math.PI/4},
                       ],
              stars:[
                {x:500,y:500},
              ]
        },
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
    }else{
      this.text = this.add.text(napisX, napisY, "Prohra");
    }
    this.textBody = this.add.text(napisX, napisY+30, "body : "+this.body);
    for (let i = 1; i < (this.levels.length); i++) {
      this.add.text(100, 100+30*i, 'Level '+i, { fill: '#0f0' })
        .setInteractive()
        .on('pointerdown', () => this.playLevel(i) );
    }

  }
  pause(){
    this.paused = !this.paused;
  }
  vyhra(){
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
