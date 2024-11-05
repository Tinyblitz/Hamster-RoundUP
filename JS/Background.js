var backG;
var backGX1, backGX2;
const backMovespeed = 10;

// Overlap two copies of the same image to create illusion of an endless image scrolling
function DrawBG(){
  
  // Circle back images
  if (backGX1 <= -backG.width*(height - hudLine)/backG.height){backGX1 = backG.width*(height - hudLine)/backG.height;}
  if (backGX2 <= -backG.width*(height - hudLine)/backG.height){backGX2 = backG.width*(height - hudLine)/backG.height;}
  
  // How fast the background is moving
  backGX1 -= backMovespeed;                                                     
  backGX2 -= backMovespeed;
  
  // Display background
  image(backG, backGX1, hudLine, backG.width*(height - hudLine)/backG.height, height - hudLine);
  image(backG, backGX2, hudLine, backG.width*(height - hudLine)/backG.height, height - hudLine);
}