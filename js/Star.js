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
    }
  }
  hrdinaMeSnedl(){
    var rozdilX = Math.abs(this.obrazek.x - this.game.hero.x);
    var rozdilY = Math.abs(this.obrazek.y - this.game.hero.y);
    if((rozdilX < 30) && (rozdilY < 10)){
      return true;
    }else {
      return false;
    }
  }
}
