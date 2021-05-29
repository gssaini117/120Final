//===================================================================================
// Phaser3 Setup
//===================================================================================
let config = {
    type: Phaser.AUTO,
    width: 1024 , //Same as background dimensions.
    height: 576, //Same as background dimensions.
    scene: [
        Preload,
        Menu_Main, Menu_GameOver, Menu_Credits, Menu_HowTo,
        Room_Main, Room_NorthEast, Room_NorthWest, Room_East, Room_West
    ],
    scale: {
      parent: 'mygame',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  }

let game = new Phaser.Game(config);

//===================================================================================
// GLOBAL VARIABLES
//===================================================================================
// Declaring keyboard vars
let keyW, keyA, keyS, keyD;
let keyH, keyC, keySPACE, keyESC, keyR;

// Room Transition management
let Prev_Room = "Room_Main";
let Died = false; //Determines if the entry color is black or red.
let isMoving = false; //Prevents repeated movement call.
let RESET_TIME = 100; //Fields used to manage reset behavior.

// Room Music management. Used to prevent overlapping music.
let PlayingMusic = {

};

// Declaring shard management vars
let Shard_Count = 0;
let Obtained_Shard = {
  "NorthEast": false,
  "NorthWest": false,
  "East": false,
  "West": false,
};

// Declaring AnimationID vars
// Convinient for referencing/changing player anim names
let AnimationIDs = {
    "Player": {
        "Up":       "Player_Up",
        "Down":     "Player_Down",
        "Left":     "Player_Left",
        "Right":    "Player_Right"
    },
    "Fire": "Fire_Loop"
};

//===================================================================================
// GLOBAL FUNCTIONS
//===================================================================================
//
// Define_Keys(Scene[Phaser3 Scene])
//
// Function for saving key definition lines.
function Define_Keys(Scene) {
  keyW = Scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  keyA = Scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  keyS = Scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  keyD = Scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
}
//
// Debug_Hitbox(Scene[Phaser3 Scene], Hitboxes[Dictionary<String, Boundry>])
//
// Function for hitbox visual debug.
// Spawns a rectangle in the provided scene for each hitbox(boundry) object.
function Debug_Hitbox(Scene, Hitboxes) {
  for(var key in Hitboxes){
      let Obstacle = Hitboxes[key].getStats();
      let Rect = new Phaser.GameObjects.Rectangle(
          Scene, Obstacle.x, Obstacle.y, Obstacle.width, Obstacle.height, 0xff0000, 0.8, 
      ).setDepth(100).setOrigin(0.5, 0.5);
      Scene.add.existing(Rect);
  };
}
//
// FadeOut(Scene[Phaser3 Scene], Blackscreen[Phaser3 Rectangle])
//
// Transition for moving inbetween rooms.
// Blackscreen is a phaser3 rectangle object.
// Returns the transition Time in milliseconds (Int).
let TRANSITION_TIME = 800; // Delay length in milliseconds.
function FadeOut(Scene, Blackscreen) {
  Scene.tweens.add({ //Alpha from 0 to 1
    targets: Blackscreen,
    alpha: 1,
    duration: TRANSITION_TIME
  });
  return TRANSITION_TIME;
}
//
// FadeIn(Scene[Phaser3 Scene], Blackscreen[Phaser3 Rectangle])
//
// Transition for moving inbetween rooms.
// Blackscreen is a phaser3 rectangle object.
// Returns the transition Time in milliseconds (Int).
function FadeIn(Scene, Blackscreen) {
  Scene.tweens.add({ //Alpha from 0 to 1
    targets: Blackscreen,
    alpha: 0,
    duration: TRANSITION_TIME
  });
  return TRANSITION_TIME;
}
//
// AdjustPos(Object, Origin[String])
//
// Adjusts the X and Y positions of an object so it references the center.
// ASSUMPTION: Object has function adjustPos().
function adjustPos(Object, Origin) {
  let size = Object.getSize();
  switch(Origin) { // Sets the x&y pos to the object's center;
    case "Top":
      Object.adjustPos(0, size.height/2);
      break;
    case "Bot":
      Object.adjustPos(0, -size.height/2);
      break;
    case "Left":
      Object.adjustPos(size.width/2, 0);
      break;
    case "Right":
      Object.adjustPos(-size.width/2, 0);
      break;
    case "TopR":
      Object.adjustPos(-size.width/2, size.height/2);
      break;
    case "TopL": 
      Object.adjustPos(size.width/2, size.height/2);
      break;
    case "BotR":
      Object.adjustPos(-size.width/2, -size.height/2);
      break;
    case "BotL":
      Object.adjustPos(size.width/2, -size.height/2);
      break;
  }
}