//Create variables here
var dog, happyDog, database, foodS, foodStock,bg;
var dogImage;

function preload()
{
	//load images here

  dogImage=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
  bg=loadImage("images/room.jpg");

}

function setup() {

  database=firebase.database();
	createCanvas(500, 500);
  


  dog=createSprite(250,400,150,150);
  dog.addImage(dogImage);
  dog.scale=0.15;

 
  
}


function draw() {  
background(bg);

if(keyIsDown(UP_ARROW) || touches.length>0){

  writeStock(foodStock);
  dog.addImage(happyDog);
}


foodStock=database.ref('Food');
foodStock.on("value",readStock);


  drawSprites();
  //add styles here
  fill("red");
  stroke("red");
  strokeWeight(1);
  text("FOOD LEFT : "+ foodStock , 230,175);
  fill("Blue");
  stroke("Blue");
  strokeWeight(1);
  text("Press UP_ARROW OR JUST TOUCH SCREEN TO FEED DOG",120,50)

}

function readStock(data){
  foodStock=data.val();
  
}

function writeStock(x){

 if(x<=0){
   x=0
 }else{
   x-=0.25;
 }


  database.ref('/').update({
    Food:x
  })

  
}
