function MainMenu(){
  background(0);
  
  fill(255);
  textSize(100*resizeFactorText);
  
  // Game Title
  let t = "Hamster RoundUP!";
  text(t, width/2 - (textWidth(t)/2), height/4);
  
  // Buttons
  let playButton, quitButton;
  
  // Play Buttion position
  if (mouseX >= width/2 - 130*resizeFactorText
  && mouseX <= width/2 + 130*resizeFactorText
  && mouseY >= height/2 - 50*resizeFactorText
  && mouseY <= height/2 + 50*resizeFactorText){
    playButton = 255;
    mouseOnButton = true;
    if (mouseIsReleased){ mouseIsReleased = false; resetPlay(1); }
  }
  else{ playButton = '#BC0B43'; }
  
  // Quit Button position --> completely exits game
  if (mouseX >= width/2 - 130*resizeFactorText 
  && mouseX <= width/2 + 130*resizeFactorText
  && mouseY >= 3*height/4 - 50*resizeFactorText
  && mouseY <= 3*height/4 + 50*resizeFactorText){
    quitButton = 255;
    mouseOnButton = true;
    if (mouseIsReleased){ mouseIsReleased = false; remove(); }
  }
  else{ quitButton = '#BC0B43'; }
    
  // Drawing the buttons
  fill('#9469F2');
  strokeWeight(6*resizeFactorText);
    
  stroke(playButton);
  rect(width/2, height/2, 260*resizeFactorText, 100*resizeFactorText);
    
  stroke(quitButton);
  rect(width/2, 3*height/4, 260*resizeFactorText, 100*resizeFactorText);
    
  stroke(0);
  fill(255);
  textSize(50*resizeFactorText);
  let p = "Play";
  let q = "Quit";
    
  text(p, width/2 - (textWidth(p)/2), height/2 + 15*resizeFactorText);
  text(q, width/2 - (textWidth(q)/2), 3*height/4 + 15*resizeFactorText);
  
  // Draw instructions
  textSize(25*resizeFactorText);
  text("Instructions\n\nUP arrow key or 'w': move player up\n\nDOWN arrow key or 's': move player down\n\nSPACEBAR: activate claw to grab hamsters for points\n\nBump into hamsters to push them forward\n\nLet a hamster pass, lose a life\n\nESC key: pause during game", 100*resizeFactorText,height/2 + 50 *resizeFactorText);
  
  // UP arrow key or 'w': move player up
// DOWN arrow key or 's': move player down
// SPACEBAR: activate claw
// ESC key: pause during game
}

function LevelProgress(){
  background(0);
  
  // Level Completion Title
  fill(255);
  textSize(100*resizeFactorText);
  let lC = "LEVEL " + nf(levelNum) + " COMPLETED";
  text(lC, width/2 - (textWidth(lC)/2), height/4);
  
  // Display Current Score
  let s = "SCORE: " + nf(score);
  text(s, width/2 - (textWidth(s)/2), (height/4) + 200*resizeFactorY);
  
  // Next Level button position
  let leftButton, rightButton;
  if (mouseX >= width/2 - 330*resizeFactorText
  && mouseX <= width/2 - 70*resizeFactorText
  && mouseY >= 3*height/4 - 50*resizeFactorText
  && mouseY <= 3*height/4 + 50*resizeFactorText){
    leftButton = 255;
    mouseOnButton = true;
    if (mouseIsReleased){ mouseIsReleased = false; resetPlay(levelNum + 1); }
  }
  else{ leftButton = '#BC0B43'; }
  
  // Main Menu button position
  if (mouseX >= width/2 + 70*resizeFactorText
  && mouseX <= width/2 + 330*resizeFactorText
  && mouseY >= 3*height/4 - 50*resizeFactorText
  && mouseY <= 3*height/4 + 50*resizeFactorText){    
    rightButton = 255;
    mouseOnButton = true;
    if (mouseIsReleased){ mouseIsReleased = false; GAMESTATE = 0; }
  }
  else{ rightButton = '#BC0B43'; }
  
  // Drawing the buttons
  fill('#9469F2');
  strokeWeight(6*resizeFactorText);
    
  stroke(leftButton);
  rect(width/2 - 200*resizeFactorText, 3*height/4, 260*resizeFactorText, 100*resizeFactorText);
    
  stroke(rightButton);
  rect(width/2 + 200*resizeFactorText, 3*height/4, 260*resizeFactorText, 100*resizeFactorText);
    
  noStroke();
  fill(255);
  textSize(50*resizeFactorText);
  let nL = "Next Level";
  let mM = "Main Menu";
    
  text(nL, width/2 - (textWidth(nL)/2) - 200*resizeFactorText, 3*height/4 + 15*resizeFactorText);
  text(mM, width/2 - (textWidth(mM)/2) + 200*resizeFactorText, 3*height/4 + 15*resizeFactorText);
}

function GameOver(){
  background(0);
  
  // Game Over Title
  fill(255);
  textSize(100*resizeFactorText);
  let gO = "GAME OVER";
  text(gO, width/2 - (textWidth(gO)/2), height/4);
  
  // Display Final Score
  let s = "SCORE: " + nf(score);
  text(s, width/2 - (textWidth(s)/2), (height/4) + 200*resizeFactorY);
  
  // Play Again button position
  let leftButton, rightButton;
  if (mouseX >= width/2 - 330*resizeFactorText
  && mouseX <= width/2 - 70*resizeFactorText 
  && mouseY >= 3*height/4 - 50*resizeFactorText 
  && mouseY <= 3*height/4 + 50*resizeFactorText){
    leftButton = 255;
    mouseOnButton = true;
    if (mouseIsReleased){ mouseIsReleased = false; resetPlay(1); }
  }
  else{ leftButton = '#BC0B43'; }
  
  // Main Menu button position
  if (mouseX >= width/2 + 70*resizeFactorText
  && mouseX <= width/2 + 330*resizeFactorText 
  && mouseY >= 3*height/4 - 50*resizeFactorText 
  && mouseY <= 3*height/4 + 50*resizeFactorText){
    rightButton = 255;
    mouseOnButton = true;
    if (mouseIsReleased){ mouseIsReleased = false; GAMESTATE = 0; }
  }
  else{ rightButton = '#BC0B43'; }
  
  // Drawing the buttons
  fill('#9469F2');
  strokeWeight(6*resizeFactorText);
    
  stroke(leftButton);
  rect(width/2 - 200*resizeFactorText, 3*height/4, 260*resizeFactorText, 100*resizeFactorText);
    
  stroke(rightButton);
  rect(width/2 + 200*resizeFactorText, 3*height/4, 260*resizeFactorText, 100*resizeFactorText);
    
  noStroke();
  fill(255);
  textSize(50*resizeFactorText);
  let pA = "Play Again";
  let mM = "Main Menu";
    
  text(pA, width/2 - (textWidth(pA)/2) - 200*resizeFactorText, 3*height/4 + 15*resizeFactorText);
  text(mM, width/2 - (textWidth(mM)/2) + 200*resizeFactorText, 3*height/4 + 15*resizeFactorText);
}

function PauseMenu(){
  background(0);
  
  // Pause Title
  fill(255);
  textSize(100*resizeFactorText);
  let p = "PAUSED";
  text(p, width/2 - (textWidth(p)/2), height/4);
  
  // Display Current Score
  let s = "SCORE: " + nf(score);
  text(s, width/2 - (textWidth(s)/2), (height/4) + 200*resizeFactorY);
  
  // Resume Button position
  let leftButton, rightButton;
  if (mouseX >= width/2 - 330*resizeFactorText
  && mouseX <= width/2 - 70*resizeFactorText 
  && mouseY >= 3*height/4 - 50*resizeFactorText 
  && mouseY <= 3*height/4 + 50*resizeFactorText){
    leftButton = 255;
    mouseOnButton = true;
    if (mouseIsReleased){ 
      mouseIsReleased = false;
      GAMESTATE = 1;
      if (levelNum == 3){ lastlevel.play(); }
      else{ bgm.play(); }
    }
  }
  else{ leftButton = '#BC0B43'; }
  
  // Main Menu Button position
  if (mouseX >= width/2 + 70*resizeFactorText
  && mouseX <= width/2 + 330*resizeFactorText 
  && mouseY >= 3*height/4 - 50*resizeFactorText 
  && mouseY <= 3*height/4 + 50*resizeFactorText){
    rightButton = 255;
    mouseOnButton = true;
    if (mouseIsReleased){ mouseIsReleased = false; GAMESTATE = 0; }
  }
  else{ rightButton = '#BC0B43'; }
  
  // Drawing the buttons
  fill('#9469F2');
  strokeWeight(6*resizeFactorText);
    
  stroke(leftButton);
  rect(width/2 - 200*resizeFactorText, 3*height/4, 260*resizeFactorText, 100*resizeFactorText);
    
  stroke(rightButton);
  rect(width/2 + 200*resizeFactorText, 3*height/4, 260*resizeFactorText, 100*resizeFactorText);
    
  noStroke();
  fill(255);
  textSize(50*resizeFactorText);
  let r = "Resume";
  let mM = "Main Menu";
    
  text(r, width/2 - (textWidth(r)/2) - 200*resizeFactorText, 3*height/4 + 15*resizeFactorText);
  text(mM, width/2 - (textWidth(mM)/2) + 200*resizeFactorText, 3*height/4 + 15*resizeFactorText);
}

function WinMenu(){
  background(0);
  
  // Win Title
  fill(255);
  textSize(100*resizeFactorText);
  let yW = "YOU WIN";
  text(yW, width/2 - (textWidth(yW)/2), height/4);
  
  // Display Final Score
  let s = "SCORE: " + nf(score);
  text(s, width/2 - (textWidth(s)/2), (height/4) + 200*resizeFactorY);
  
  // Play Again Button position
  let leftButton, rightButton;
  if (mouseX >= width/2 - 330*resizeFactorText
  && mouseX <= width/2 - 70*resizeFactorText 
  && mouseY >= 3*height/4 - 50*resizeFactorText 
  && mouseY <= 3*height/4 + 50*resizeFactorText){
    leftButton = 255;
    mouseOnButton = true;
    if (mouseIsReleased){ mouseIsReleased = false; resetPlay(1); }
  }
  else{ leftButton = '#BC0B43'; }
  
  // Main Menu Button position
  if (mouseX >= width/2 + 70*resizeFactorText
  && mouseX <= width/2 + 330*resizeFactorText
  && mouseY >= 3*height/4 - 50*resizeFactorText 
  && mouseY <= 3*height/4 + 50*resizeFactorText){
    rightButton = 255;
    mouseOnButton = true;
    if (mouseIsReleased){ mouseIsReleased = false; GAMESTATE = 0; }
  }
  else{ rightButton = '#BC0B43'; }
  
  // Drawing the buttons
  fill('#9469F2');
  strokeWeight(6*resizeFactorText);
    
  stroke(leftButton);
  rect(width/2 - 200*resizeFactorText, 3*height/4, 260*resizeFactorText, 100*resizeFactorText);
    
  stroke(rightButton);
  rect(width/2 + 200*resizeFactorText, 3*height/4, 260*resizeFactorText, 100*resizeFactorText);
    
  noStroke();
  fill(255);
  textSize(50*resizeFactorText);
  let pA = "Play Again";
  let mM = "Main Menu";
    
  text(pA, width/2 - (textWidth(pA)/2) - 200*resizeFactorText, 3*height/4 + 15*resizeFactorText);
  text(mM, width/2 - (textWidth(mM)/2) + 200*resizeFactorText, 3*height/4 + 15*resizeFactorText);
}