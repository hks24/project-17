
var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage
var bananaGroup, obstacleGroup;
var score;
var PLAY = 0;
var END;
var gameState;

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  

  
monkey = createSprite(80,315,20,20);
  monkey.addAnimation("monkeyRunning",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = width/2;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
 score = 0;
  
  gameState = PLAY;
  
}


function draw() {
background("white");
  
        monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  spawnObstacles();
  spawnBananas();
  
  textSize(15);
  stroke("black");
  fill("black");
  text("Survival Time = "+score,150,30);
  
  if(gameState===PLAY){
  
   if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(keyDown("space")&&monkey.y >= 300 ) {
      monkey.velocityY = -15;
    }
  
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
   // monkey.scale = monkey.scale + 0.01;
  }
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;
  }
  
  
  if(frameCount%30===0){
    score = score+1;
  }
  
  
   
  }

  if(gameState === END){
    monkey.visible = false;
    obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0);
    ground.velocityX = 0;
  }
 
  
  drawSprites();
  
}

function spawnObstacles(){
  if(frameCount%200===0){
    obstacle1 = createSprite(800,320,10,40);
   obstacle1.addImage(obstacleImage);
    obstacle1.velocityX = -5;
    obstacle1.scale = 0.2
    
    obstacleGroup.add(obstacle1);
    
  }
}

function spawnBananas(){
  if(frameCount%160===0){
    banana1 = createSprite(800,random(170,230),10,40);
   banana1.addImage(bananaImage);
    banana1.velocityX = -5;
    banana1.scale = 0.1
    
    bananaGroup.add(banana1);
    
  }
}







