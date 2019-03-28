class Zombie{
  constructor(game, properties){
    this.game = game;
    this.x = properties.x || Math.random()*this.game.canvas.width;
    this.y = properties.y || Math.random()*this.game.canvas.height;

    this.obrazek = this.game.add.image(this.x, this.y, 'zombie');
    this.i=0; //pro potreby vypoctu kruhove drahy
  }
  update(){
    this.utok();
    if(this.narazilJsemDoHrdiny() && this.game.smrtelnost){
      this.game.prohra();
    }
  }

  utok(){
    var x,y;
    x=this.game.hero.x-this.obrazek.x;
    y=this.game.hero.y-this.obrazek.y;
    if(x>0){
      this.obrazek.x += this.game.zombieSpeed;
    }else{
      this.obrazek.x -= this.game.zombieSpeed;
    }
    if(y>0){
      this.obrazek.y += this.game.zombieSpeed;
    }else{
      this.obrazek.y -= this.game.zombieSpeed;
    }
  }
  chodimVKruhu(){
    this.obrazek.x = this.x + Math.sin(this.i/50)*100;
    this.obrazek.y = this.y + Math.cos(this.i/50)*100;
    this.i++;
  }
  narazilJsemDoHrdiny(){
    var rozdilX = Math.abs(this.obrazek.x - this.game.hero.x);
    var rozdilY = Math.abs(this.obrazek.y - this.game.hero.y);
    if((rozdilX < 30)&&(rozdilY < 10)){
      return true;
    }else {
      return false;
    }
  }
}
