var PLAY = 1;
var END = 0;
var gameState = PLAY;

var harry, harry_fly, harry_collided;
var ground, invisibleGround, groundImage;


var obstaclesGroup, obstacle1, obstacle2;

var score;
var gameOverImg,restartImg
var jumpSound , checkPointSound, dieSound

function preload(){
  harry_fly = loadAnimation("harry.png");
  harry_collided = loadAnimation();
 
  groundImage = loadImage("ground2.png");
 
  cloudImage = loadImage("cloud.png");
 
  obstacle1 = loadImage("bludger.png");
  obstacle2 = loadImage("draco.png");



 
  background1 = loadImage("bgimg.png ");

  restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
 
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(displayWidth-250,displayHeight-180);

  var message = "This is a message";
 console.log(message)
 
 harry = createSprite(100,260,20,50);
 harry.addAnimation("flying", harry_fly);
 harry.addAnimation("collided", harry_collided);
 

 harry.scale = 0.4;
 
  //ground = createSprite(200,180,400,20);
  //ground.addImage("ground",groundImage);
  //ground.x = ground.width /2;
 
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
 
  restart = createSprite(300,140);
  restart.addImage(restartImg);
 
 
  gameOver.scale = 0.5;
  restart.scale = 0.5;
 
  invisibleGround = createSprite(200,280,400,10);
  invisibleGround.visible = false;
 
  
  obstaclesGroup = createGroup();
 
  ;
 
  harry.setCollider("rectangle",0,0,harry.width-25,harry.height);
 
 
  score = 0;
 
}

function draw() {
 
  background(background1);
  fill("blue")
  text("Score: "+ score, 800,50);
 
 
  if(gameState === PLAY){

    gameOver.visible = false;
    restart.visible = false;
   

    score = score + Math.round(getFrameRate()/60);
   
    if(score>0 && score%100 === 0){
       checkPointSound.play()
    }
   
  
   
    //jump when the space key is pressed
    if(keyDown("space")&& harry.y >= 155) {
      harry.velocityY = -12.7;
        jumpSound.play();
    }
   
    //add gravity
    harry.velocityY = harry.velocityY + 0.8
 
    //spawn the clouds
    
 
    //spawn obstacles on the ground
    spawnObstacles();
   
    if(obstaclesGroup.isTouching(harry)){
     
        jumpSound.play();
        gameState = END;
        dieSound.play()
     
    }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
    
      harry.changeAnimation("collided", harry_collided);
     
       if(mousePressedOver(restart)) {
    
      reset();
    }
   
      
    harry.velocityY = 0
     
     
     
    obstaclesGroup.setLifetimeEach(-1);
 
     
     obstaclesGroup.setVelocityXEach(0);
    
   }
 
 
  



  drawSprites();
}

function reset(){
  gameState = PLAY;
  obstaclesGroup.destroyEach();
  harry.changeAnimation("running");
  restart.visible = false;
  gameOver.visible = false;
  score = 0;
 
 
 

}


function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.y = Math.round(random(50,530));
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
      obstacle.scale = 0.23;
              break;
      case 2: obstacle.addImage(obstacle2);
      obstacle.scale = 0.35
              break;
    }
   
    //assign scale and lifetime to the obstacle          
    
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}

