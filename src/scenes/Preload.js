class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        
    }

    create() {
        //=========================================================
        // Loading Bar Ui
        //=========================================================

        //=========================================================
        // Technical
        //=========================================================
        this.IsLoading = false;
    }
 
    update() {
        if(!this.IsLoading) {
            this.IsLoading = true;
            this.BeginLoad();
        }
    } 

    BeginLoad() {
        console.log("Initiating Loading Process!");
        this.LoadImages();
    }

    LoadImages() {
        console.log("Loading Images!");
        // Room Backgrounds
        this.load.image('BG_Temp', './assets/Art/BG_Placeholder.png');
        this.load.image('BG_Main1', './assets/Art/BG_Main1.png');
        this.load.image('BG_Main2', './assets/Art/BG_Main2.png');
        this.load.image('BG_NorthWest1', './assets/Art/BG_NorthWest1.png');
        this.load.image('BG_NorthWest2', './assets/Art/BG_NorthWest2.png');
        this.load.image('BG_NorthEast1', './assets/Art/BG_NorthEast1.png');
        this.load.image('BG_East1', './assets/Art/BG_East1.png');
        this.load.image('BG_West1', './assets/Art/BG_West1.png');
        //Menus
        this.load.image('Menu_Main', './assets/Art/Menu_Main.png');
        this.load.image('Menu_Ending1', './assets/Art/Menu_Ending1.png');
        this.load.image('Menu_Ending2', './assets/Art/Menu_Ending2.png');
        this.load.image('Menu_Credits', './assets/Art/Menu_Credits.png');
        this.load.image('Menu_HowTo', './assets/Art/Menu_HowTo.png');
        //Assets
        this.load.image('Door', './assets/Art/Temp_Door.png');
        //this.load.image('Door', './assets/Art/Transparent_Temp.png');
        this.load.image('Shard1', './assets/Art/Shard1.png');
        this.load.image('Shard2', './assets/Art/Shard2.png');
        this.load.image('Shard3', './assets/Art/Shard3.png');
        this.load.image('Shard4', './assets/Art/Shard4.png');
        this.load.image('Darkness', './assets/Art/Darkness.png');
        this.load.image('Rock', './assets/Art/Rock.png');

        //Begin Loading
        this.load.start();

        //Completion Event
        this.load.once(Phaser.Loader.Events.COMPLETE, () => {
            console.log("Image Loading Complete!");
            this.LoadSpritesheets();
        })
    }

    LoadSpritesheets() {
        console.log("Loading Spritesheets!");
        this.load.spritesheet('Player', './assets/Art/Player.png',
            {frameWidth: 70, frameHeight: 75, startFrame: 0, endFrame: 15}
        );
        this.load.spritesheet('Pylon', './assets/Art/Pylon.png',
            {frameWidth: 180, frameHeight: 192, startFrame: 0, endFrame: 4}
        );
        this.load.spritesheet('Fire', './assets/Art/fire.png',
            {frameWidth: 89, frameHeight: 90, startFrame: 0, endFrame: 8}
        );
        this.load.spritesheet('Gate_Center', './assets/Art/Gate_Center.png',
            {frameWidth: 300, frameHeight: 250, startFrame: 0, endFrame: 1}
        );
        this.load.spritesheet('Gate_Horizontal', './assets/Art/Gate_Horizontal.png',
            {frameWidth: 300, frameHeight: 250, startFrame: 0, endFrame: 1}
        );
        this.load.spritesheet('Gate_Vertical', './assets/Art/Gate_Vertical.png',
            {frameWidth: 300, frameHeight: 250, startFrame: 0, endFrame: 1}
        );
        this.load.spritesheet('Button', './assets/Art/Temp_Button.png',
            {frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 1}
        );

        //Begin Loading
        this.load.start();

        //Completion Event
        this.load.once(Phaser.Loader.Events.COMPLETE, () => {
            console.log("Image Loading Complete!");
            this.LoadAudio();
        })
    }

    LoadAudio() {
        console.log('Loading Audio!');
        
        //Sfx (Not Looped)
        this.load.audio('Sfx_Select', './assets/Audio/menu_option_click.wav');
        this.load.audio('Sfx_Walk', './assets/Audio/steps_sound.wav');
        //Sfx (Looped)
        this.load.audio('Sfx_Lava', './assets/Audio/fire_room.mp3');
        // Music
        // None atm

        this.load.start();
        this.load.once(Phaser.Loader.Events.COMPLETE, () => {
            console.log("Audio Loading Complete!");
            this.LoadAnimations();
        })
    }

    LoadAnimations() {
        console.log("Setting up animations!");
        this.anims.create({ //Player Up
            key: AnimationIDs.Player.Up, frameRate: 8, repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', { start: 0, end: 3, first: 0}),
        });
        this.anims.create({ //Player Down
            key: AnimationIDs.Player.Down, frameRate: 8, repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', { start: 4, end: 7, first: 0}),
        });
        this.anims.create({ //Player Left
            key: AnimationIDs.Player.Left, frameRate: 8, repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', { start: 8, end: 11, first: 0}),
        });
        this.anims.create({ //Player Right
            key: AnimationIDs.Player.Right, frameRate: 8, repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', { start: 12, end: 15, first: 0}),
        });
        this.anims.create({ //Fire effect
            key: AnimationIDs.Fire, frameRate: 10, repeat: -1,
            frames: this.anims.generateFrameNumbers('Fire', {start: 1, end: 6, first: 0}),
        });

        console.log("Preload Complete!");
        this.scene.start("Menu_Main");
    }
}