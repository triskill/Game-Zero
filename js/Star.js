class Star{
  constructor(game, x, y){
    this.game = game;
    this.x = x | Math.random()*this.game.canvas.width;
    this.y = y | Math.random()*this.game.canvas.height;

    this.obrazek = this.game.add.image(this.x, this.y, 'star');
  }
  update(){
    if(this.hrdinaMeSnedl()){
      console.log("hrdina ziskal bod");
      this.obrazek.x = -100;
      this.game.ziskanBod();
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
