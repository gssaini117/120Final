class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        
    }

    create() {
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
        this.load.image('BG_Temp', './assets/Background_Placeholder.png');
        this.load.image('BG_Main1-1', './assets/Background_Main1-1.png');
        this.load.image('BG_Main1-2', './assets/Background_Main1-2.png');
        this.load.image('Door', './assets/Temp_Door.png');
        this.load.image('Shard', './assets/Shard_Placeholder.png');

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
        this.load.spritesheet('Player', './assets/Player.png',
            {frameWidth: 70, frameHeight: 75, startFrame: 0, endFrame: 15}
        );
        this.load.spritesheet('Pylon', './assets/Pylon_Placeholder.png',
            {frameWidth: 128, frameHeight: 128, startFrame: 0, endFrame: 4}
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
        
        //Sfx
        this.load.audio('Sfx_Select', './assets/menu_option_click.wav');
        this.load.audio('Sfx_Walk', './assets/steps_sound.wav');

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
        

        console.log("Preload Complete!");
        this.scene.start("Room_Main");
    }
}