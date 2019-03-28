class Star{
  constructor(game, properties){
    this.game = game;
    this.x = properties.x || 25 + Math.floor(Math.random()*(this.game.canvas.width - 50));
    this.y = properties.y || 30 + Math.floor(Math.random()*(this.game.canvas.height - 60));

    this.obrazek = this.game.add.image(this.x, this.y, 'star');
  }
  update(){
    if(this.hrdinaMeSnedl()){
      this.obrazek.x = -100;
      this.game.ziskanBod();
    }
  }
  hrdinaMeSnedl(){
    var rozdilX = Math.abs(this.obrazek.x - this.game.hero.x);
    var rozdilY = Math.abs(this.obrazek.y - this.game.hero.y);
    if((rozdilX < 30) && (rozdilY < 10)){
        this.game.zombieSpeed += .2;
      return true;
    }else {
      return false;
    }
  }
}
