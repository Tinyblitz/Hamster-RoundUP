class Hamster{
  constructor(){
    this.xPos = width;
    this.yPos = 0;
    this.bumpD = 0;
    this.baseMovespeed = 5;
    this.movespeed;
    this.baseMovespeed;
    this.bumpSpeed = 10;
  
    this.alive = false;
    this.moveStatus = 0;
  
    this.frames = hamsterFrames;
    this.frameCap = hamsterFrameCap;
    this.frameTracker = 0;
    this.frameSpeed = 10;
  }
  
  display(){
    image(this.frames[this.frameTracker], this.xPos, this.yPos);
  
    if (frameCount % this.frameSpeed == 0){      
      this.frameTracker++;
      if (this.frameTracker >= this.frameCap){this.frameTracker = 1;}
    }
  }
  
  move(){
    // Gerbil moves with the claw
    if (this.moveStatus == 1){                     
      this.xPos = kid.clawXPos;
      if (!kid.clawReturn){
        
        // Set to not alive to prevent bump
        this.alive = false;
        this.xPos = width;
        
        // Score when hamster reaches Player while being grabbed
        score += 100;                        
        pointScore.stop();
        pointScore.play();
      }
    }
    // Gerbil is bumped forward
    else if (this.moveStatus == 2){               
      this.xPos += this.bumpSpeed;
      
      // Reset movement when reach end of bump
      if (this.xPos >= this.bumpD){this.moveStatus = 0;}
    }
    // Normal movement
    else {
      this.xPos -= this.movespeed;
      
      // Hamster "died" when fully goes off screen
      if (this.xPos <= -this.frames[this.frameTracker].width){
        this.alive = false;
        this.xPos = width;
        
        // Player loses a life
        kid.lives--;                          
        damage.stop();
        damage.play();
      }
    }
  
    /////////////////////~~~ Claw + Hamster Hitbox ~~~///////////////////////////////
    if (kid.inputs[2] 
        && !kid.clawReturn 
        && dist(kid.clawXPos, kid.clawYPos, this.xPos, this.yPos) < (kid.claw[0].height/2) + (this.frames[this.frameTracker].height/2))
    { kid.clawReturn = true; this.moveStatus = 1; }
  }
}

function CreateHamsters(laneNumber){
  
  // 3 different movespeeds randomized
  let moveS = int(random(0,3));                      
  let gSpeed;
  if (moveS == 0){ gSpeed = 0.5; }
  else if (moveS == 1){ gSpeed = 1; }
  else { gSpeed = 1.5; }
    
  for (let j = 0; j < numHamstersPerLane; j++){
    hamsters[laneNumber][j].alive = true;
    
    // Hamsters are set a distance apart from each other in the same lane
    hamsters[laneNumber][j].xPos = width*1.25 + distanceBtwHamsters*j;
    
    // y positions of hamsters centered in respective lane
    hamsters[laneNumber][j].yPos = (laneNumber*(height - hudLine - (0.4*height))/numLanes) + hudLine + (0.4*height);
    
    // Set movement
    hamsters[laneNumber][j].moveStatus = 0;
    hamsters[laneNumber][j].movespeed = hamsters[laneNumber][j].baseMovespeed*gSpeed;
  }
}