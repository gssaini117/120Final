let config = {
    type: Phaser.AUTO,
    width: 1024 , //Same as background dimensions.
    height: 576, //Same as background dimensions.
    scene: [
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

// reserve keyboard vars
let keyW, keyA, keyS, keyD

// Declaring shard count
let Shard_Count = 0;
let Obtained_Shard = {
  "North": false,
  "South": false,
  "East": false,
  "West": false,
};