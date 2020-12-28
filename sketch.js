var bikeManImg, parkImg, trashcanImg, fireHydrantImg, benchImg, lightningBoltImg;
var bikeMan, trashcan, fireHydrant, bench, lightningBolt, ground;
var obstaclesGroup;
var invisGround;
var score = 0;
var PLAY = 1
var END = 0
var gameState = PLAY;
var gameOver, restart;
var gameOverImg, restartImg;
var powerState = "noPower";
var boltGroup, rocketGroup;

function preload()
{
  bikeManImg = loadImage("bikeman.jpg");
  parkImg = loadImage("parkImage.jpg");
  trashcanImg = loadImage("trashimage.jpg");
  lightningBoltImg = loadImage("lighting.jpg");
  benchImg = loadImage("benchImage.jpg");
  fireHydrantImg = loadImage("fireHydrant.jpg");
  gameOverImg = loadImage("gameOver.jpg");
  restartImg = loadImage("restart.jpg");
}

function setup() 
{
  createCanvas(displayWidth,displayHeight);

  bikeMan = createSprite(50, displayHeight - 300, 50, 50);
  bikeMan.addImage(bikeManImg);
  bikeMan.scale = 1.25;

  ground = createSprite(40, displayHeight - 260, displayWidth*2, 10);
  ground.x = ground.width/4;

  invisGround = createSprite(40, displayHeight - 250, displayWidth*2, 10);
  invisGround.visible = false;

  gameOver = createSprite(displayWidth/2,displayHeight/3 - 80);
  restart = createSprite(displayWidth/2,displayHeight/3 + 130);
  
  gameOver.addImage(gameOverImg);

  restart.addImage(restartImg);
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;

  obstaclesGroup = new Group();
  boltGroup = new Group();
  rocketGroup = new Group();
}

function draw() 
{
  background(parkImg);  

  fill("black");
  textSize(36);
  text ("Distance Travelled:" + Math.round(score), displayWidth - 380, displayHeight/3 - 100);
  
  if(gameState === PLAY)
  {

    score = score + 0.1

    bikeMan.collide(invisGround);

  if(keyDown("space") && bikeMan.y > 412)
  {
    bikeMan.velocityY = -21;
  }

  bikeMan.velocityY = bikeMan.velocityY + 1;

  ground.velocityX = -10;

  if(ground.x < 0)
  {
    ground.x = ground.width/4;
  }

  spawnObstacles();

  if(obstaclesGroup.isTouching(bikeMan))
  {
    gameState = END;
  }

  spawnPower();

  if(boltGroup.isTouching(bikeMan))
  {
    bikeMan.changeAnimation("bikeFlash", bikeFlash);
    lightningBolt.destroy();
    powerState = "flash";
  }

  if(powerState === "flash")
  {
    score = score + 1; 
  }

  

    switch (rand) 
    {
      case 1 : lightningBolt = createSprite(1220, displayHeight/2 + 75, 30, 56);
      lightningBolt.addImage("lightningBolt",lightningBoltImg);
      lightningBolt.velocityX = -(6 + score/100*3);
      lightningBolt.scale = 0.389;
      lightningBolt.lifetime = 200;
      boltGroup.add(lightningBolt);
      break;

      case 2 : lightningBolt = createSprite(1220, displayHeight/2 + 75, 30, 56);
      lightningBolt.addImage("lightningBolt",lightningBoltImg);
      lightningBolt.velocityX = -(6 + score/100*3);
      lightningBolt.scale = 0.389;
      lightningBolt.lifetime = 200;
      boltGroup.add(lightningBolt);
      break;

      default : break;
    }
  }
}

function reset()
{
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  
  bikeMan.changeAnimation("bikeMan",bikeManImg);
  
  score = 0;

  powerState = "noPower";
}