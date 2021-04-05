
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananaGroup, obstacleGroup;
var score = 0;
var ground;
var backgroundImg;

function preload(){
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x)
  ground.visible = false;

  backgroundImg = loadImage("background1.jpg");
  looseImg = loadImage("loose.gif");
  
  bananaGroup = new Group();
  obstacleGroup = new Group();

}

function draw() {
  background(backgroundImg);
  stroke("black");
  textSize(20);
  fill("black");

  text("Score: "+ score, 100,50);
  
  if(keyDown("space")&& monkey.y >=0){
    monkey.velocityY = -13;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  if(ground.x< 0){
    ground.x = ground.width/2;
  }
  
  monkey.collide(ground);


  
  loose();
  calculateScore();
  spawnBananas();
  spawnObstacles();
  drawSprites();
      
}
  
function spawnBananas(){
  if(frameCount%80===0){
    banana = createSprite(600,250,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;

    bananaGroup.add(banana); 
  }
}

function spawnObstacles(){
  if(frameCount%300===0){
    var obstacle = createSprite(500,310,23,32);
    obstacle.velocityX = -3;
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
  
    obstacleGroup.add(obstacle);
    obstacleGroup.density = monkey.density;
  }
}

function calculateScore() {
  if(bananaGroup.isTouching(monkey)) {
    score = score + 10;
    bananaGroup.destroyEach();
     obstacleGroup.velocityX = -6;
     bananaGroup.velocityX = -6;
  }
}

function loose() {
  if(obstacleGroup.isTouching(monkey)) {
     loose1 = createSprite(200,200,400,400);
     loose1.addImage(looseImg);
     obstacleGroup.destroyEach();
     bananaGroup.destroyEach();
     

  }
}






