function cell(x, y, w){
  this.x = x;
  this.y = y;
  this.w = w;
  this.tile = false;
  this.revealed = true;
}

cell.prototype.show = function(){
  stroke(255);
  fill('#000000');
  rect(this.x, this.y, this.w, this.w);
  if (this.revealed) {
    if (this.tile) {
      stroke(0);
      fill('#39FF77');
      ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.6);
    }
    else {
      fill('#ED363C');
      rect(this.x, this.y, this.w, this.w);
    }
  }
}

cell.prototype.contains = function(x, y){
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

cell.prototype.reveal = function(){
  this.revealed = true;
}
