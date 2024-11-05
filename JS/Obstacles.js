let numObsType = 2

class Obstacle {
  constructor(){
    this.xPos = width;
    this.yPos = 0;
    this.movespeed = 10;
    this.type = 0;
    this.active = false;
    this.frames = obsFrames;  
  }
  
  display() {image(this.frames[this.type], this.xPos, this.yPos);}
  
  move() {
    this.xPos -= this.movespeed;
    if (this.xPos <= -this.frames[this.type].width){this.active = false;}
  }
}

function CreateObstacle(){
  let allLanesActive = true;
  
  // Only one obstacle per lane
  for (let i = 0; i < numLanes; i ++){               
    if (!obs[i].active){allLanesActive = false;break;}
  }
    
  if (!allLanesActive){
    let laneNum;

    // Randomize lane placement without an active obstacle
    do {laneNum = int(random(0,4));} while (obs[laneNum].active);
    
    // Set active obstacle in chosen lane
    obs[laneNum].active = true;                       
    obs[laneNum].xPos = width;
    obs[laneNum].yPos =  (laneNum*(height - hudLine - (0.4*height))/numLanes) + hudLine + (0.3*height);
    
    // Only the puddle obstacle is present on level 1
    if (levelNum == 1) {obs[laneNum].type = 0;}                             
    
    // Randomly chooses the type of the obstacle
    else {obs[laneNum].type = int(random(0,numObsType));}          
  }
}