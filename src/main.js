let config = {
    type: Phaser.AUTO,
    width: 1024 , //Same as background dimensions.
    height: 576, //Same as background dimensions.
    scene: [
        Preload,
        Menu_Main, Menu_GameOver, Menu_Credits,
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