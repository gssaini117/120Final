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

// Menu Blackscreen trigger
let EnteredMenu = false;

// Room Transition management
let Prev_Room = "Room_Main";
let Died = false; //Determines if the entry color is black or red.
let isMoving = true; //Prevents repeated movement call.
let RESET_TIME = 100; //Fields used to manage reset behavior.

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

// Declaring MusicIDs
// Convinient for referencing/changing audio names
let AudioIDs = {
  "Shard_0": "Music_0",
  "Shard_1": "Music_1",
  "Shard_2": "Music_2",
  "Shard_3": "Music_3",
  "Shard_4": "Music_4"
};

//===================================================================================
// GLOBAL TECHNICAL FUNCTIONS
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
  keySPACE = Scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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
// Reset_Game()
//
// Function for resetting progress flags.
// Should only ever be called in the main menu.
function Reset_Game() {
  console.log("Progress Reset");
  Obtained_Shard.NorthEast = false;
  Obtained_Shard.NorthWest = false;
  Obtained_Shard.East = false;
  Obtained_Shard.West = false;
  Shard_Count = 0;
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
//===================================================================================
// GLOBAL TRANSITION FUNCTIONS
//===================================================================================
//
// FadeOut(Scene[Phaser3 Scene], Blackscreen[Phaser3 Rectangle])
//
// Transition for moving inbetween rooms.
// Blackscreen is a phaser3 rectangle object.
// Returns the transition Time in milliseconds (Int).
let TRANSITION_TIME = 1000 // Delay length in milliseconds.
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
//===================================================================================
// GLOBAL AUDIO FUNCTIONS
//===================================================================================
// Manages audio behavior
let isPlaying = false;
let Music_Scene = null; // The scene which the music is playing from.
let Music_Config = {mute: false, volume: 0, loop: true, delay: 0};
//
// PlayMusic(Scene[Phaser3 Scene])
//
// Initiates the recursive music process.
function PlayMusic(Scene) {
  if(isPlaying) {return;} // Doesn't play multiple times.
  isPlaying = true;
  Music_Scene = Scene; // Updates music scene (Should always be main room.)
  Music_Scene.Music = {
    0: Music_Scene.sound.add(AudioIDs.Shard_0),
    1: Music_Scene.sound.add(AudioIDs.Shard_1),
    2: Music_Scene.sound.add(AudioIDs.Shard_2),
    3: Music_Scene.sound.add(AudioIDs.Shard_3),
    4: Music_Scene.sound.add(AudioIDs.Shard_4)
  }
  Music_Scene.Music[0].play(Music_Config);
  Music_Scene.Music[1].play(Music_Config);
  Music_Scene.Music[2].play(Music_Config);
  Music_Scene.Music[3].play(Music_Config);
  Music_Scene.Music[4].play(Music_Config);
  Music_Scene.Music[Shard_Count].volume = 0.3;
}
//
// UpdateMusic()
//
// Updates the soundtrack when the player collects a shard.
// Should only ever be called if music is already playing.
function UpdateMusic() {
  Music_Scene.Music[Shard_Count].volume = 0.1;
  Music_Scene.Music[Shard_Count-1].volume = 0;
}
//
// StopMusic(boolean)
//
// doFade determines if the music fades away or stop instantly.
// Stops the audio from playing, and ends the 
function StopMusic(doFade = false) {
  isPlaying = false;
  if(doFade) {
    Music_Scene.tweens.add({
      targets:  [
        Music_Scene.Music[0],
        Music_Scene.Music[1],
        Music_Scene.Music[2],
        Music_Scene.Music[3],
        Music_Scene.Music[4]
      ],
      volume: 0,
      duration: TRANSITION_TIME
    });
  } else {
    Music_Scene.Music[0].stop();
    Music_Scene.Music[1].stop();
    Music_Scene.Music[2].stop();
    Music_Scene.Music[3].stop();
    Music_Scene.Music[4].stop();
  }
}