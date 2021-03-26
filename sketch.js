var rabbit , rabbit_running
var carrot ,carrotImage, rock, rockImage
var FoodGroup, rockGroup
var score=0;
var ground;
var survivalTime=0;

function preload(){
  
  rabbit_running =            
  loadAnimation("sprite_1.png","sprite_2.png");
  carrotImage = loadImage("carrot.png");
  carrotImage = loadImage("stone.jpg");
  grasslandImage=loadImage("grassland.jpg");
}



function setup() {
    createCanvas(405, 250);
  
  grassland=createSprite(0,0,405,250);
  grassland.addImage(grasslandImage);
  grassland.scale=1.0;
  grassland.x = grassland.width/2;
  grassland.velocityX=-4;
  
  carrot=createSprite(50,200,20,20);
  carrot.addAnimation("running",monkey_running);
  carrot.scale=0.1;
  
  ground=createSprite(300,240,405,20);
  ground.x = ground.width/2;
  ground.velocityX=-2;
  //console.log(ground.x);
  ground.visible=false;
  
  
  rockGroup=createGroup();
  foodGroup = createGroup();

  
}


function draw() {
  background("white");
  
//calling the groups
  carrot();
  rock();
    
//monkey jumps
  if(keyDown("space")&& rabbit.y >= 150) {
        rabbit.velocityY = -12;
    }
  
//ground and background resets
  if (grassland.x < 0){
      grassland.x = grassland.width/2;
    }
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
//add gravity
  rabbit.collidevelocityY = rabbit.velocityY + 0.8

//rabbit collides with the ground
  rabbit.collide(ground);

// adds to score and banana dissapears after touching monkey 
  if (foodGroup.isTouching(rabbit)){
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
function rock() {
  if (frameCount % 200 === 0){
  rock=createSprite(600,220,10,10);
  rock.addImage(obstacleImage);
  rock.scale=0.1;
  rock.velocityX=-4;
  rock.lifetime = 200;
  if (rockGroup.isTouching(rabbit)){
    rabbit.scale=0.2;
    
  }  
  rockGroup.add(rock);

  }
}