class Star{
  constructor(game, x, y){
    this.game = game;
    this.x = x | 25 + Math.floor(Math.random()*(this.game.canvas.width - 50));
    this.y = y | 30 + Math.floor(Math.random()*(this.game.canvas.height - 60));

    this.obrazek = this.game.add.image(this.x, this.y, 'star');
  }
  update(){
    if(this.hrdinaMeSnedl()){
      console.log("hrdina ziskal bod");
      this.obrazek.x = -100;
      this.game.ziskanBod();
      this.game.bodZvuk.play();
      if(this.game.pocetStars == this.game.body){
        this.game.vyhra();
      }
    }
  }
  hrdinaMeSnedl(){
    var rozdilX = Math.abs(this.obrazek.x - this.game.hero.x);
    var rozdilY = Math.abs(this.obrazek.y - this.game.hero.y);
    if((rozdilX < 30) && (rozdilY < 10)){
      console.log(this.game.zombieSpeed);
      this.game.zombieSpeed += .5;
      return true;
    }else {
      return false;
    }
  }
}
