function resetPlay(level){                        
                                                  
  GAMESTATE = 1;                                  
  levelNum = level;
  
  // BGM Reset
  if (levelNum == 3){ lastlevel.stop(); lastlevel.play(); }
  else{ bgm.stop(); bgm.play(); }

  // Reset "spacebar" action incase round ended or paused during claw activation
  kid.inputs[2] = false;
  
  // Full Reset
  if (level == 1){ score = 0; }
  
  // Progression Reset; Increase Level Difficulty
  if (level == 3){ kid.baseMovespeed = 7; }
  else { kid.baseMovespeed = 10; }
  
  // Progress Bar Reset
  rectWid = 0;
  rectXPos = barXPos;
  smallKidXPos = barXPos - smallKid[0].width/2;
  
  // Player Reset
  kid.lives = maxLives;
  kid.status = 0;
  kid.statusTimer = 0;
  kid.clawXPos = kid.xPos + kid.frames[kid.frameTracker].width;
  
  for (let i = 0; i < numLanes; i++){
    
    // Hamster Reset
    for (let j = 0; j < numHamstersPerLane; j++){
      hamsters[i][j].alive = false;
      hamsters[i][j].moveStatus = 0;
    }
    
    // Obstacle Reset
    obs[i].active = false;
    obs[i].xPos = width;
  }
  
  // Spawn Timer Reset
  spawnCount = spawnTimer;
}


function keyPressed(){

  // Move Up
  if (keyCode == UP_ARROW || key == 'w'){
    if (!kid.inputs[2]){ kid.setInput(0); } 
  }
  
  // Move Down
  if (keyCode == DOWN_ARROW || key == 's'){
    if (!kid.inputs[2]){ kid.setInput(1); }
  }
  
  // Activate Claw
  if (key == ' '){
    kid.setInput(2);
    
    // Prevent movement
    kid.removeInput(0);
    kid.removeInput(1);
  }
  
  // Pause
  if (keyCode == ESCAPE){
    key = 0;
    GAMESTATE = 4;
    
    // Stop Music on Pause
    if (levelNum == 3){ lastlevel.pause(); }
    else{ bgm.pause(); }
  }
}

function keyReleased(){
  if (keyCode == UP_ARROW || key == 'w'){ kid.removeInput(0); }
  if (keyCode == DOWN_ARROW || key == 's'){ kid.removeInput(1); }
}

// function mousePressed() {
//   let fs = fullscreen();
//   if (!fs){ fullscreen(!fs); }
// }

function mouseReleased(){ if (mouseOnButton){ mouseIsReleased = true; } }