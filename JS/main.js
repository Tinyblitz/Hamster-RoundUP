// Check Readme File

var fps = 60;
var mouseIsReleased = false;
var mouseOnButton = false;

/////~~~ GAME STATS ~~~//////////

const maxLives = 3;
var GAMESTATE;
var levelNum;
const numLanes = 4;
var score;

// Main Player
var kid;
const statusSetTimer = 100;

// Hamsters
// Main array matches the number of lanes, and the inner arrays stores how many hamsters per lane
var hamsters = [];    
var distanceBtwHamsters;
var bumpDistance;
const numHamstersPerLane = 2;

// Obstacles
var obs = [];
var spawnCount, spawnTimer = 10;

var secondTracker;

function draw() {
  
  resizeFactorY = height/baseHeight;
  resizeFactorX = width/baseWidth;
  if (resizeFactorY < resizeFactorX) { resizeFactorText = resizeFactorY }
  else { resizeFactorText = resizeFactorX }
  
  // Clear screen if resizing to avoid bleeding
  if (initWidth != width || initHeight != height){ 
    clear();
    initWidth = width;
    initHeight = height;
  }
  
  mouseOnButton = false;
  
  // MAIN MENU
  if (GAMESTATE == 0){ MainMenu(); }
  
  // LEVEL PROGRESSION
  else if (GAMESTATE == 2){ LevelProgress(); }
  
  // GAME OVER
  else if (GAMESTATE == 3){ GameOver(); }
  
  // PAUSE MENU
  else if (GAMESTATE == 4){ PauseMenu(); }
  
  // WIN
  else if (GAMESTATE == 5){ WinMenu(); }
  
  // PLAYING STATE
  else if (GAMESTATE == 1){ 
    
    DrawBG();
    DrawHUD();
  
    // SPAWN OBSTACLES
    // Spawn counter dependent on computer's internal clock
    if (secondTracker != second()){                      
      spawnCount--;
      secondTracker = second();
    }
                  
    if (spawnCount == 0){                                            
      CreateObstacle();
    
      // Spawn rate increases with level
      if (levelNum == 1) {spawnCount = spawnTimer;}                               
      else if (levelNum == 2){spawnCount = spawnTimer/2;}
      else {spawnCount = spawnTimer/5;}
    }
  
    // Draw active obstacles
    for (let i = 0; i < numLanes; i++){
      if (obs[i].active){
        obs[i].display();
        obs[i].move();
      }
    }
  
    // SPAWN HAMSTERS
    for (let i = 0; i < numLanes; i++){
      let allHamstersInLaneDead = true;
    
      // New hamsters only spawn in empty lanes
      for (let j = 0; j < numHamstersPerLane; j++){ 
      
        // Draw Hamsters
        if (hamsters[i][j].alive){
          hamsters[i][j].display();
          hamsters[i][j].move();
        
          allHamstersInLaneDead = false;
        }
      }
      if (allHamstersInLaneDead){ CreateHamsters(i); }
    }
  
    // SPAWN PLAYER
    kid.display();
    kid.move();
  
    if (kid.lives <= 0){
    
      // Game Over
      GAMESTATE = 3;
    
      // Reset background music
      if (levelNum == 3){ lastlevel.stop(); }
      else{ bgm.stop(); }
    }
  }
}