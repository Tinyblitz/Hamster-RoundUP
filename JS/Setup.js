///////~~~ SOUNDS ~~~//////////////

// Background Music
var bgm, lastlevel;

// Sound Effects
var pointScore, damage, hamsterNoise, extend, retract;           

//////~~~ IMAGES ~~~///////////////

// Used to resize for different size desktop windows
var resizeFactorY;
var resizeFactorX;
var resizeFactorText;

// Reference height and width used to help resize images for different size desktop windows
const baseHeight = 1000;                                             
const baseWidth = 2000;

// Variables to check if resized window
var initWidth = 0;
var initHeight = 0;

// Player Model
var playerFrames = [];
const playerFrameCap = 6;

// Box Model
var boxFrames = [];
const boxFrameCap = 2;

// Claw Model
var clawFrames = [];
const clawFrameCap = 3;

// Statuses
var waterStatusFrame;
var stopStatusFrame;

// Hamster Model
var hamsterFrames = [];
const hamsterFrameCap = 3;

// Obstacle Model
var obsFrames = [];
const obsFrameCap = 2;

// Hearts --> Lives
var heart = [];
const heartFramesCap = 2;

// Finish Line
var flag;

// Represent Current Progress in Level
var smallKid = [];
const smallKidFrameCap = 6;

function preload(){
  ///////~~~ Initialize Sounds ~~~//////////////
  bgm = loadSound("Sounds/bgm.mp3");
  lastlevel = loadSound("Sounds/lastlevel.mp3");
  pointScore = loadSound("Sounds/bikebell.mp3");
  damage = loadSound("Sounds/damage.mp3");
  hamsterNoise = loadSound("Sounds/hamster.mp3");
  extend = loadSound("Sounds/extend.mp3");
  retract = loadSound("Sounds/retract.mp3");
  
  ///////~~~ Initialize Images ~~~//////////////
  // Player Frames
  for (let i = 0; i < playerFrameCap; i++){ playerFrames[i] = loadImage("Images/Character/kid_" + nf(i) + ".png"); }
  
  // Box Frames
  for (let i = 0; i < boxFrameCap; i++){ boxFrames[i] = loadImage("Images/Character/box_" + nf(i) + ".png"); }
  
  // Claw Frames
  for (let i = 0; i < clawFrameCap; i++){ clawFrames[i] = loadImage("Images/Character/claw_" + nf(i) + ".png"); }
  
  // Status Frames
  waterStatusFrame = loadImage("Images/Status/waterdrop.png");
  stopStatusFrame = loadImage("Images/Status/stop.png");
  
  // Hamster Frames
  for (let i = 0; i < hamsterFrameCap; i++){ hamsterFrames[i] = loadImage("Images/Hamster/hamster_" + nf(i) + ".png"); }
  
  // Obstacle Frames
  for (let i = 0; i < obsFrameCap; i++){ obsFrames[i] = loadImage("Images/Hazards/hazard_" + nf(i) + ".png"); }
  
  // HUD Frames
  for (let i = 0; i < heartFramesCap; i++){ heart[i] = loadImage("Images/HUD/Heart_" + nf(i) + ".png"); }
  
  flag = loadImage("Images/HUD/flag.png");
  
  for (let i = 0; i < smallKidFrameCap; i++){ smallKid[i] = loadImage("Images/HUD/smallkid_" + nf(i) + ".png"); }
  
  // Background Frames
  backG = loadImage("Images/Backgrounds/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  // Debugging Game States
  
  // Main Menu
  GAMESTATE = 0;
  
  // Playing State
  //GAMESTATE = 1;   
  
  // Level Progression Screen
  //GAMESTATE = 2;
  
  // Game Over
  //GAMESTATE = 3;
  
  // Pause Menu
  //GAMESTATE = 4;
  
  // Win Screen
  //GAMESTATE = 5;
  
  // Resizing Images to match window size
  resizeFactorY = height/baseHeight;
  resizeFactorX = width/baseWidth;
  if (resizeFactorY < resizeFactorX) { resizeFactorText = resizeFactorY }
  else { resizeFactorText = resizeFactorX }
  
  // Player Resize
  for (let i = 0; i < playerFrameCap; i++){ playerFrames[i].resize(0,playerFrames[i].height * resizeFactorY); }
  
  // Box Resize
  for (let i = 0; i < boxFrameCap; i++){ boxFrames[i].resize(0,boxFrames[i].height * resizeFactorY); }
  
  // Claw Resize
  for (let i = 0; i < clawFrameCap; i++){ clawFrames[i].resize(0,clawFrames[i].height * resizeFactorY); }
  
  // Status Resize
  waterStatusFrame.resize(0,waterStatusFrame.height * resizeFactorY);
  stopStatusFrame.resize(0,stopStatusFrame.height * resizeFactorY);
  
  // Hamster Resize
  for (let i = 0; i < hamsterFrameCap; i++){ hamsterFrames[i].resize(0,hamsterFrames[i].height * resizeFactorY); }
  
  // Obstacle Resize
  for (let i = 0; i < obsFrameCap; i++){ obsFrames[i].resize(0,obsFrames[i].height * resizeFactorY); }
  
  // HUD and Background
  
  hudLine = height * 0.05;
  
  levelNum = 1;
  score = 0;
  backGX1 = 0;
  backGX2 = backG.width*(height - hudLine)/backG.height;
  
  barLength = 0.25 * width;
  barMover = barLength/barTime/fps;
  
  barXPos = width - barLength - (0.075 * width);
  rectWid = 0;
  rectXPos = barXPos;
  smallKidXPos = barXPos - smallKid[0].width/2;
  
  // Objects
  kid = new Player();
  
  for (let i = 0; i < numLanes; i++){
    obs[i] = new Obstacle();
    
    hamsters[i] = [];
    for (let j = 0; j < numHamstersPerLane; j++){ hamsters[i][j] = new Hamster(); }
  }
  
  // Miscellaneous
  bumpDistance = width - (0.05 * width);
  distanceBtwHamsters = 200*resizeFactorY;
  
  spawnCount = spawnTimer;
  secondTracker = second();
  
  frameRate(fps);
}

function windowResized() { resizeCanvas(windowWidth, windowHeight); }