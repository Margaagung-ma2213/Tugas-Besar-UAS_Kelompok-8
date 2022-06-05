class orang{
  
  constructor(jarijari){
    this.r = jarijari;
    this.waktusakit = 0;
    
    this.kondisi = "sehat";
    
    this.pos = createVector(random()*width,random()*height);
    this.gerak = createVector(random(-1,1),random(-1,1));
    this.gerak.mult(4);
  }
  
  pantulan(teman){
    var jarak = dist(this.pos.x, this.pos.y, teman.pos.x, teman.pos.y);
    if(jarak <= this.r+teman.r){
      return true;
    }
    return false
  }
  
  gantiarah(teman,time){
    var tmp = this.gerak;
    this.gerak = teman.gerak;
    teman.gerak = tmp;
    
    if(this.kondisi == "sakit" && teman.kondisi == "sehat"){
      teman.kondisi = "sakit";
      teman.waktusakit = time;
    }
    
    if(this.kondisi == "sehat" && teman.kondisi == "sakit"){
      this.kondisi = "sakit";
      this.waktusakit = time;
    }
    
  }
  
  tampil(){
    noStroke();
    
    switch(this.kondisi){
      case "sehat":fill(0,255,0);break;
      case "sakit":fill(255,0,0);break;
      case "sembuh":fill(0,0,255);break;
    }
    ellipseMode(RADIUS);
    ellipse(this.pos.x,this.pos.y,this.r,this.r);
  }
  
  update(){
    this.pos.add(this.gerak);
    
    if(this.pos.x-this.r <= 0 || this.pos.x+this.r >= width){
      this.gerak.x = this.gerak.x * (-1);
    }
    
    if(this.pos.y-this.r <= 0 || this.pos.y+this.r >= height){
      this.gerak.y = this.gerak.y * (-1);
    }
  }
  
  ceksembuh(time){
    var waktu = time - this.waktusakit;
    if(waktu>400){
       this.kondisi = "sembuh";
    }
  }
}


var jarijari = 10; //ukuran orangnya
var banyakorang = new Array(30); //jumlah orangnya

var time = 0;

function setup() {
  createCanvas(600, 600);
  
  for(var i=0; i<banyakorang.length; i++){
    banyakorang[i] = new orang(jarijari)
  }
  
  banyakorang[0].kondisi = "sakit";
  banyakorang[0].waktusakit = 0;
  
}

function draw() {
  background(255);
  
  for(var i=0; i<banyakorang.length; i++){
    var o = banyakorang[i];
    
    for(var j = i+1; j<banyakorang.length; j++){
      var teman = banyakorang[j];
      var pantulan = o.pantulan(teman);
      if(pantulan){
         o.gantiarah(teman,time);
      }
    }
      if(o.kondisi == "sakit"){
        o.ceksembuh(time);
      }
      o.update();
      o.tampil();
  }
  time++;
}