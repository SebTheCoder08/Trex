//trex animations
var trex, trex_running, edges;
//ground
var groundImage;
var ground;
var invisibleGround;
//clouds
var cloud, cloudImage;
//score and obstacles
var obstacle, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
//groups
var obstacleGroup, cloudGroup;
//gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY;
//trex collides
var trex_collided;
//end of the game 
var gameOverImage, gameOver;
var restartImage, restart;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}

function setup(){
  createCanvas(600,200);
  
  // creating trex and animations
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  edges = createEdgeSprites();
  
  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50

  //creating the ground!!
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width / 2;

  //making invisible ground!!
  invisibleGround = createSprite (200, 190, 400, 10);
  invisibleGround.visible = false;

 


  //making groups
  obstacleGroup = new Group();
  cloudGroup = new Group();
}


function draw(){
  //set background color 
  background(180);
  //score
  text("Score = "+score, 500, 50)


if(gameState === PLAY){
  ground.velocityX = -2;
  score = score+Math.round(frameCount/60)
   
  //making the ground repeat 
  if(ground.x<0){
  ground.x = ground.width / 2;
  }
      
  //jump when space key is pressed
  if(keyDown("SPACE") && trex.y >= 100){
  trex.velocityY = -10;
  }
  //add gravity
  trex.velocityY = trex.velocityY + 0.7;
    
  
  spawnClouds();
  spawnObstacle();
  if(obstacleGroup.isTouching(trex)){
  gameState = END;
  }
}
else if( gameState === END){
ground.velocityX = 0;
trex.changeAnimation("collided",trex_collided);
obstacleGroup.setVelocityXEach(0);
cloudGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
  cloudGroup.setLifetimeEach(-1);
   //game over
   gameOver = createSprite(300, 100);
   gameOver.addImage(gameOverImage)
   restart = createSprite(300, 140);
   restart.addImage(restartImage)
   restart.scale = 0.5;
}
  
//stop trex from falling down 
trex.collide(invisibleGround)
  drawSprites();
}

//this spawns in the clouds!! (i wouldn't recommend messing this up)
function spawnClouds(){
if (frameCount % 60 === 0) {
  cloud = createSprite(600, 40, 10);
cloud.addImage(cloudImage)
//Random is used to to create something completely random
cloud.y = Math.round(random(10, 60))
cloud.velocityX = -3;
cloud.scale = 0.5;
//adding a life-time to the clouds
cloud.lifetime=200;
//This makes the T-rex apear above the clouds 
cloud.depth = trex.depth;
trex.depth = trex.depth + 1;
cloudGroup.add(cloud)
}
}

function spawnObstacle(){
if (frameCount % 60 === 0){
var obstacle = createSprite(600, 165, 10, 40)
obstacle.velocityX= -6;
var rand = Math.round(random(1, 6))
switch(rand){
  case 1: obstacle.addImage(obstacle1);
  break;
  case 2: obstacle.addImage(obstacle2);
  break;
  case 3: obstacle.addImage(obstacle3);
  break;
  case 4: obstacle.addImage(obstacle4);
  break;
  case 5: obstacle.addImage(obstacle5);
  break;
  case 6: obstacle.addImage(obstacle6);
  break;
  default: break;
}
obstacle.scale = 0.5;
obstacle.lifetime = 200;
obstacleGroup.add(obstacle);
}
}