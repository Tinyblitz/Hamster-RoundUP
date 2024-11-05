class Player{
  constructor(){
    
    // Array holds keyboard inputs; used to avoid continuous inputs
    this.inputs = [3];              
    for (let i = 0; i < 3; i++){ this.inputs[i] = false; }
    
    this.lives = 3;
    // Status determines whether the Player has hit an obstacle
    this.status = 0;                                  
    this.statusTimer = 0;
  
    // How fast Player can move vertically
    this.baseMovespeed = 10;                              
    this.movespeed = this.baseMovespeed;
  
    // Holds the animation frames of the Player
    this.frames = playerFrames;   
    // Variables used to cycle through animation frames
    this.frameCap = playerFrameCap;
    this.frameTracker = 0;                    
    this.frameSpeed = 6;
    
    // Variables to position Player
    this.xPos = width/4 - 200*resizeFactorY;
    this.yPos = height/2 + (200*resizeFactorY) - this.frames[this.frameTracker].height;
    
    // Variables for the box that holds the claw  
    this.boxFrames = boxFrames;                    
    this.boxXPos; 
    this.boxYPos;
    this.boxFrameTracker = 0;
  
    // Variables for the claw
    this.claw = clawFrames;                         
    this.clawXPos = this.xPos + this.frames[this.frameTracker].width/2 + 60*resizeFactorY;
    this.clawYPos = this.yPos + this.frames[this.frameTracker].height/2;
    this.clawMaxXPos = width/2 + (0.05*width);
    
    // clawHangTime --> Stall time before claw can return; penalty when claw misses
    this.clawHangTime = 20;
    this.clawTicker = 0;
    this.clawReturn = false;
    this.clawMovespeed = 20;
  
    // Images used to display the current status effect
    this.waterdrop = waterStatusFrame;
    this.stop = stopStatusFrame;                                
  }
  
  
  /////////////////////////////////////////~~~ Draw Player ~~~/////////////////////////////////////////////
  display(){
  
    // Slowed status when Player hits a puddle
    if (this.status == 1){ image(this.waterdrop, this.xPos + this.frames[this.frameTracker].width, this.yPos); }
    
    // Stopped status when Player hits a traffic cone
    if (this.status == 2){ image(this.stop, this.xPos + this.frames[this.frameTracker].width, this.yPos); }
    
    // Claw is displayed when "spacebar" action
    if (this.inputs[2]){                                         
      this.clawYPos = this.yPos + this.frames[this.frameTracker].height/2 - this.claw[0].height/2;
      let extClawXPos = this.clawXPos - this.claw[1].width/2;
      let extClawYPos = this.yPos + this.frames[this.frameTracker].height/2 - (25*resizeFactorY) + this.boxFrames[0].height/2 - this.claw[1].height/2;
      
      // Separation distance between "connectors"
      let extSep = this.claw[1].width - (5*resizeFactorY);
      
      // Display the "connectors" of the claw.  The images are uploaded as individual, overlapped segments.
      if (extClawXPos >= this.boxXPos){                          
                                                            
        // Spawn behind box to appear as if emerging from box. 
        image(this.claw[1], extClawXPos, extClawYPos);
        extClawXPos -= extSep;
        while (extClawXPos >= this.boxXPos){
          image(this.claw[1], extClawXPos, extClawYPos);
          image(this.claw[2], extClawXPos + extSep, extClawYPos);
          extClawXPos -= extSep;
        }
        image(this.claw[2], extClawXPos + extSep, extClawYPos);
      }
      
      // Display the claw
      image(this.claw[0], this.clawXPos, this.clawYPos);
      
      // Opened box is used
      this.boxFrameTracker = 1;
      this.boxYPos = this.yPos + this.frames[this.frameTracker].height/2 - (55*resizeFactorY);
    }
    else{
      // Closed box is used
      this.boxFrameTracker = 0;
      this.boxYPos = this.yPos + this.frames[this.frameTracker].height/2 - (25*resizeFactorY);
    }
    this.boxXPos = this.xPos + this.frames[this.frameTracker].width/2 + (60*resizeFactorY);
    
    // Display box
    image(this.boxFrames[this.boxFrameTracker], this.boxXPos, this.boxYPos);
    
    // Displays Player model
    image(this.frames[this.frameTracker], this.xPos, this.yPos);               
    
    // Set the speed at which frames are cycled through
    if (frameCount % this.frameSpeed == 0){                     
      this.frameTracker++;
      if (this.frameTracker >= this.frameCap){ this.frameTracker = 0; }
    }
  }
  
  // Stores keyboard input
  setInput(inn){   
    
    // Play extension sound when claw activated with spacebar
    if (inn == 2 && !this.inputs[inn]){ extend.stop(); extend.play(); }
    
    this.inputs[inn] = true;
  }
  
  // Removes keyboard input
  removeInput(out){ this.inputs[out] = false; }
  
  
  ////////////////////////////////////////~~~ Move Player ~~~///////////////////////////////////////////////
  move(){
    
    // Revert to normal status after hitting an obstacle
    if (this.statusTimer == 0){ this.status = 0; }
    else { this.statusTimer--; }
    
    // Slowed Movement
    if (this.status == 1){ this.movespeed = this.baseMovespeed/4; }
    
    // Stopped Movement
    else if (this.status == 2){ this.movespeed = 0; }
    
    // Normal Movement
    else { this.movespeed = this.baseMovespeed; }
    
    // UP Key --> Move UP
    if (this.inputs[0]  && this.yPos >= hudLine + (180*resizeFactorY)){ this.yPos -= this.movespeed; }
    
    // DOWN Key --> Move Down
    if (this.inputs[1] && this.yPos + (20*resizeFactorY) <= height - this.frames[this.frameTracker].height){ this.yPos += this.movespeed; }
    
    // "spacebar" activates the claw
    if (this.inputs[2]){                                        
      
      // Claw goes out
      if (!this.clawReturn){
        this.clawXPos += this.clawMovespeed;
        
        // Claw returns after reaching max set distance
        if (this.clawXPos >= this.clawMaxXPos){
          this.clawReturn = true;
          this.clawTicker = this.clawHangTime;                       
        }
      }
      
      // Claw returns
      else{
        if (this.clawTicker != 0){
          this.clawTicker--;
          
          // Play restraction sound
          if (this.clawTicker == 0){ retract.stop(); retract.play(); }
        }
        
        // Can return after stall time passes
        else{
          this.clawXPos -= this.clawMovespeed;
          if (this.clawXPos <= this.xPos + this.frames[this.frameTracker].width/2 + (60*resizeFactorY)){
        
            // "spacebar" action is locked until the claw returns to allow for reset
            this.inputs[2] = false;                             
            this.clawReturn = false;
          }
        }
      } 
    }
    
    for (let i = 0; i < numLanes; i++){        
      
      /////////////////////////////////~~~ Hamster + Player Hitbox ~~~////////////////////////////////
      for (let j = 0; j < numHamstersPerLane; j++){
        if (hamsters[i][j].xPos >= this.xPos 
        && hamsters[i][j].xPos <= this.xPos + this.frames[this.frameTracker].width 
        && hamsters[i][j].yPos >= this.yPos + (this.frames[this.frameTracker].height/2) 
        && hamsters[i][j].yPos <= this.yPos + this.frames[this.frameTracker].height){
          
          // Player bumps hamsters forward a certain amount on collision
          // Prevent bump if hamster not in default move status
          if(hamsters[i][j].moveStatus == 0){                       
            for (let k = 0; k < numHamstersPerLane; k++){
              if (hamsters[i][k].alive){
                hamsters[i][k].moveStatus = 2;
                hamsters[i][k].bumpD = bumpDistance + distanceBtwHamsters*k;
              }
            }
            
            // Play hamster bump sound
            hamsterNoise.stop();
            hamsterNoise.play();
            break;
          }
        }
      }
      
      ////////////////////////////////~~~ Obstacle + Player Hitbox ~~~////////////////////////////////////
      
      if (obs[i].active){
        
        // Hitboxes vary per obstacle type
        if (obs[i].type == 0){                                       
          if (this.xPos <= obs[i].xPos + obs[i].frames[obs[i].type].width 
          && this.xPos + this.frames[this.frameTracker].width >= obs[i].xPos 
          && this.yPos + 7*this.frames[this.frameTracker].height/8 <= obs[i].yPos + obs[i].frames[obs[i].type].height 
          && this.yPos + this.frames[this.frameTracker].height >= obs[i].yPos)
          { this.status = 1; this.statusTimer = statusSetTimer;}
        }
        else if (obs[i].type == 1){
          if (this.xPos <= obs[i].xPos + obs[i].frames[obs[i].type].width 
          && this.xPos + this.frames[this.frameTracker].width >= obs[i].xPos 
          && this.yPos + 7*this.frames[this.frameTracker].height/8 <= obs[i].yPos + obs[i].frames[obs[i].type].height 
          && this.yPos + this.frames[this.frameTracker].height >= obs[i].yPos + obs[i].frames[obs[i].type].height/2)
          { this.status = 2; this.statusTimer = statusSetTimer;} 
        }
      }
    }
  }
}