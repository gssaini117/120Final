let config = {
    type: Phaser.AUTO,
    width: 1024 , //Same as background dimensions.
    height: 576, //Same as background dimensions.
    scene: [
        Preload,
        Menu_Main, Menu_GameOver, Menu_Credits, Menu_HowTo,
        Room_Main, Room_North, Room_South, Room_East, Room_West
    ],
    scale: {
      parent: 'mygame',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  }

let game = new Phaser.Game(config);

// Declaring keyboard vars
let keyW, keyA, keyS, keyD;
let keyH, keyC, keySPACE, keyESC, keyR;

// Room Transition management
let Prev_Room = "Room_Main";
let isMoving = false; //Prevents repeated movement call.

// Declaring shard management vars
let Shard_Count = 0;
let Obtained_Shard = {
  "North": false,
  "South": false,
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
};

// Function for hitbox visual debug.
// Spawns a rectangle in the provided scene for each hitbox(boundry) object.
function Debug_Hitbox(Scene, Hitboxes) {
  for(var key in Hitboxes){
      let Obstacle = Hitboxes[key].getStats();
      let Rect = new Phaser.GameObjects.Rectangle(
          Scene, Obstacle.x, Obstacle.y, Obstacle.width, Obstacle.height, 0xff0000, 1, 
      ).setDepth(100).setOrigin(0.5, 0.5);
      Scene.add.existing(Rect);
  };
}

// Transition for moving inbetween rooms.
// Blackscreen is a phaser3 rectangle object.
// Returns the transition Time (Int).
let TRANSITION_TIME = 800; // Delay length in milliseconds.
function FadeOut(Scene, Blackscreen) {
  Scene.tweens.add({ //Alpha from 0 to 1
    targets: Blackscreen,
    alpha: 1,
    duration: TRANSITION_TIME
  });
  return TRANSITION_TIME;
}