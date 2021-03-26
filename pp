var rabbit,rabbit_Img
var carrot,carrotImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;
var ground;
var survivalTime=0;

function preload(){
  
  rabbit_Img=loadAnimation("sprite_1.png","sprite_2.png");
  carrotImage = loadImage("carrot.jpg");
  obstacleImage = loadImage("stone.jpg");
  landImage=loadImage("grassland.jpg");
}



function setup() {
  createCanvas(800,400);
  
  land=createSprite(0,0,405,250);
  land.addImage(grassland);
  land.scale=1.0;
  land.x = land.width/2;
  land.velocityX=-4;
  
  rabbit=createSprite(50,200,20,20);
  rabbit.addAnimation("running",rabbit_Img);
  rabbit.scale=0.1;
  ground=createSprite(300,240,405,20);
  ground.x = ground.width/2;
  ground.velocityX=-2;
  //console.log(ground.x);
  ground.visible=false;
  obstacleGroup=createGroup();
  foodGroup = createGroup();
}

function draw() {
  background("white");
  
//calling the groups
  carrot();
  stone();
    
//`` jumps
  if(keyDown("space")&& rabbit.y >= 150) {
        rabbit.velocityY = -12;
    }
  
//ground and background resets
  if (land.x < 0){
      land.x = land.width/2;
    }
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
//add gravity
  rabbit.velocityY = rabbit.velocityY + 0.8

//rabbit collides with the ground
  rabbit.collide(ground);

// adds to score and carrot dissapears after touching monkey 
  if (foodGroup.isTouching(carrot)){
    score=score+2;
    foodGroup.destroyEach();
    }
  switch(score){
    case 10: player.scale=0.12;
            break;
    case 20: player.scale=0.14;
            break;
    case 30: player.scale=0.16;
            break;
    case 40: player.scale=0.18;
            break;
    default: break;
  }
  
  
  
  
    drawSprites();
    
    // score texts
  stroke("Black");
  textSize(15);
  fill("white");
  text("Score: "+ score, 10,20);
  
}

function carrot() {
  if (frameCount % 80 === 0){
  carrot=createSprite(600,110,10,10);
  carrot.addImage(carrotImage);
  carrot.scale=0.1;
  carrot.velocityX=-5;
  carrot.lifetime = 200;

    foodGroup.add(carrot);
  }
}
function obstacles() {
  if (frameCount % 200 === 0){
  obstacle=createSprite(600,220,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX=-4;
  obstacle.lifetime = 200;
  if (obstacleGroup.isTouching(carrot)){
    carrot.scale=0.2;
    
  }  
  obstacleGroup.add(obstacle);

  }
}