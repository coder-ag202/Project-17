
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600, 600);
  
  monkey = createSprite(80, 350);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 370, 900, 10);
  ground.velocityX = -4;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
}


function draw() {

  background("white");
  
  if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")){
    monkey.velocityY = -4;
  }
  
  monkey.velocityY = monkey.velocityY + 0.4;
  
  monkey.collide(ground);
  
  spawnFood();
  spawnObstacles();
  
  drawSprites();
  
  if(obstaclesGroup.isTouching (monkey)){
    ground.velocityX = 0;
    monkey.velocityY = 0;
    foodGroup.setLifetimeEach (-1);
    obsctalesGroup.setLifetimeEach (-1);
    foodGroup.setVelocityXEach (0);
    obstaclesGroup.setVelocityXEach (0);
  }
  
  textSize (22);
  fill ("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text ("Survival Time: "+survivalTime, 95, 45);
}

function spawnFood(){
  
  if(frameCount % 100 === 0){
    banana = createSprite(600, 250);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -3;
    banana.y = random(110, 215);
    banana.lifetime = 300;
    foodGroup.add (banana);   
  }
}

function spawnObstacles(){
  
  if(frameCount % 400 === 0){
    obstacle = createSprite(600, 320);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add (obstacle);
  }
}



