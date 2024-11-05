/////////////////////////~~~ Variables ~~~/////////////////////////

// Variables used for drawing the progress bar
var barXPos, barLength;

// Level Time in Seconds
const barTime = 60;

// Variables that syncs prograss bar with barTime
var barMover;
var rectWid;
var rectXPos;

// Sets the position of hud
var hudLine;

// Miniature kid
var smallkidFrameTracker = 0;
var smallKidXPos;

/////////////////////////~~~ Functions ~~~/////////////////////////

function DrawHUD(){
  
  DrawStats();
  
  ProgressBar();
  
  PauseButton();
  
  // HUD line
  stroke(0);
  strokeWeight(4);
  line(0, hudLine, width, hudLine);
}

function DrawStats(){
  
  // Variable helps space the items on the HUD
  let xText = 0;                                                                
  
  // Backdrop of HUD
  fill('#D18585');                                                              
  rect(width/2, hudLine/2, width, hudLine);
  
  noStroke();
  fill(0);
  textSize(hudLine);
  
  // Displays Current Level
  let levelName = "LEVEL: " + nf(levelNum) + "  ";
  text(levelName, xText, 0.045*height);                                    
  xText += textWidth(levelName);
  
  // Displays amount of lives
  for (let i = 0; i < kid.lives; i++){                                          
    image(heart[0],xText,2.5, hudLine - 5, hudLine - 5);
    xText += 1.1*hudLine;
  }
  
  // Displays amount of lives lost <-- empty hearts
  for (let i = 0; i < maxLives - kid.lives; i++){                               
    image(heart[1],xText,0, hudLine, hudLine);
    xText += 1.1*hudLine;
  }
  
  xText += 0.0125 * width;

  // Displays Current Score
  text("SCORE: " + nf(score), xText, 0.045*height);
}

function ProgressBar(){
  fill('#08FF75');
  noStroke();
  
  // Logic for movement of bar
  if (rectWid + barMover < barLength){ rectXPos += barMover/2; rectWid += barMover; }
  else {
    // Player has completed the game
    if (levelNum == 3){ GAMESTATE = 5; lastlevel.stop(); }
    // When progress bar is full, player completes level
    else{ GAMESTATE = 2; bgm.stop(); }
  }
  
  // Display Bar
  rect(rectXPos, hudLine/2, rectWid, 0.6*hudLine);
  
  // Display Bar Holder
  stroke(0);
  strokeWeight(4);
  arc(barXPos, hudLine/2, 0.6*hudLine, 0.6*hudLine, HALF_PI, 3*HALF_PI);
  noFill();
  line(barXPos, (hudLine/2) - (0.3*hudLine), barXPos + barLength, (hudLine/2) - (0.3*hudLine));
  line(barXPos, (hudLine/2) + (0.3*hudLine), barXPos + barLength, (hudLine/2) + (0.3*hudLine));
  fill(255);
  arc(barXPos + barLength, hudLine/2, 0.6*hudLine, 0.6*hudLine, -HALF_PI, HALF_PI);
  
  // Finish line flag
  image(flag, barXPos + barLength,2.5, flag.width*((hudLine - 5)/flag.height), hudLine - 5);                   
  
  // Miniature kid frame cycle speed
  if (frameCount % 10 == 0){                                                     
    smallkidFrameTracker++;
    if (smallkidFrameTracker >= smallKid.length){ smallkidFrameTracker = 0; }
  }
  
  // Display Miniature Kid
  image(smallKid[smallkidFrameTracker], smallKidXPos, 0, hudLine, hudLine);
  smallKidXPos += barMover;
}

function PauseButton(){
  let pauseColor = 0;
  
  // Pause Button position
  if (mouseX >= width - (0.045*width) 
  && mouseX <= width - (0.03*width) 
  && mouseY >= hudLine/2 - (0.3*hudLine) 
  && mouseY <= hudLine/2 + (0.3*hudLine)){
    mouseOnButton = true;
    if (mouseIsReleased){
      mouseIsReleased = false;
      GAMESTATE = 4;
      if (levelNum == 3){ lastlevel.pause(); }
      else{ bgm.pause(); }
    }
    pauseColor = 255;
  }
  
  // Drawing pause button
  stroke(pauseColor);
  fill('#786FFA');
  strokeWeight(4);
  rect(width - (0.0375*width), hudLine/2, 0.6*hudLine, 0.6*hudLine);
  fill(0);
  strokeWeight(0);
  rect(width - (0.04*width), hudLine/2, 0.1*hudLine, 0.3*hudLine);
  rect(width - (0.035*width), hudLine/2, 0.1*hudLine, 0.3*hudLine);
}