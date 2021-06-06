class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }

    preload() {
        //Blackscreen
        this.Blackscreen = new Phaser.GameObjects.Rectangle(
            this, 0, 0, game.config.width, game.config.height, 0x000000, 1, 
        ).setOrigin(0,0).setDepth(5).setAlpha(0);
        this.add.existing(this.Blackscreen);
    }

    create() {
        //=========================================================
        // Loading Ui
        //=========================================================
        //Background
        this.Background1 = new Phaser.GameObjects.Rectangle(
            this, 0, 0, game.config.width, game.config.height, 0x000000, 1, 
          ).setOrigin(0,0).setDepth(0);
        this.add.existing(this.Background1);

        this.Background2 = new Phaser.GameObjects.Rectangle(
            this, 5, 5, game.config.width - 10, game.config.height - 10, 0x818181, 1, 
          ).setOrigin(0,0).setDepth(1);
        this.add.existing(this.Background2);

        //Bar Background
        this.BarBackground1 = new Phaser.GameObjects.Rectangle(
            this, game.config.width/2, 
            game.config.height/3, 
            game.config.width/1.5, 
            game.config.height/10, 
            0xa9a9a9, 1, 
        ).setOrigin(0.5,0.5).setDepth(3);
        this.add.existing(this.BarBackground1);

        this.BarBackground2 = new Phaser.GameObjects.Rectangle(
            this, this.BarBackground1.x, 
            this.BarBackground1.y, 
            this.BarBackground1.width + 10, 
            this.BarBackground1.height + 10, 
            0x000000, 1, 
        ).setOrigin(0.5,0.5).setDepth(2);
        this.add.existing(this.BarBackground2);

        //Loading Text
        let textConfig = {
            fontFamily: 'Courier',
            backgroundColor: '#ddbf8e',
            fontSize: '35px',
            color: '#000000',
            align: 'center',
            padding: {
                top: 10,
                bottom: 10,
            },
        }
        this.Text_Loading = this.add.text(
            this.BarBackground1.x,
            this.BarBackground1.y - this.BarBackground1.height/2 - 60, 
            " L O A D I N G ! ", 
            textConfig
        ).setDepth(3).setOrigin(0.5, 0.5);
        this.Text_Loading_Frame = new Phaser.GameObjects.Rectangle(
            this, this.Text_Loading.x, 
            this.Text_Loading.y, 
            this.Text_Loading.width + 10, 
            this.Text_Loading.height + 10, 
            0x4b2e1e, 1, 
        ).setOrigin(0.5,0.5).setDepth(2);
        this.add.existing(this.Text_Loading_Frame);

        // Actual Bar
        this.Bar = new Phaser.GameObjects.Rectangle(
            this, this.BarBackground1.x - this.BarBackground1.width/2, 
            this.BarBackground1.y, 
            0, this.BarBackground1.height, 
            0x6ad91b, 1, 
        ).setOrigin(0,0.5).setDepth(4);
        this.add.existing(this.Bar);

        // Update Text
        textConfig.fontSize = "25px";
        this.Text_Update = this.add.text(
            this.BarBackground1.x,
            this.BarBackground1.y + this.BarBackground1.height/2 + 60, 
            " LOADING '' ", 
            textConfig
        ).setDepth(3).setOrigin(0.5, 0.5);
        
        this.Update_Background = new Phaser.GameObjects.Rectangle(
            this, this.Text_Update.x, 
            this.Text_Update.y, 
            this.Text_Update.width + 10, 
            this.Text_Update.height + 10, 
            0x4b2e1e, 1, 
        ).setOrigin(0.5, 0.5).setDepth(2);
        this.add.existing(this.Update_Background);

        //=========================================================
        // Technical
        //=========================================================
        this.IsLoading = false;
        this.Count = 0;
        this.Max = 48; //Num + 1 (The 1 is for animations)
        
        let Scene = this;
        this.load.on('filecomplete', function(){
            Scene.Count++;
        });
    }
 
    update() {
        //Begin loading
        if(!this.IsLoading) {
            this.IsLoading = true;
            this.BeginLoad();
        }
        //Updating loading bar size
        this.UpdateBar();

        //Updating loading bar position
        this.Text_Update.setOrigin(0.5, 0.5);
        this.Text_Update.x = game.config.width/2;

        this.Update_Background.width = this.Text_Update.width + 10;
        this.Update_Background.setOrigin(0.5, 0.5);
        this.Update_Background.x = game.config.width/2;
    } 

    BeginLoad() {
        this.LoadImages();
    }

    LoadImages() {
        this.Text_Update.setText(" Loading Images! ");
        // Room Backgrounds
        this.load.image('BG_Temp', './assets/Art/BG_Placeholder.png');
        this.load.image('BG_Main1', './assets/Art/BG_Main1.png');
        this.load.image('BG_Main2', './assets/Art/BG_Main2.png');
        this.load.image('BG_NorthWest1', './assets/Art/BG_NorthWest1.png');
        this.load.image('BG_NorthWest2', './assets/Art/BG_NorthWest2.png');
        this.load.image('BG_NorthEast1', './assets/Art/BG_NorthEast1.png');
        this.load.image('BG_NorthEast2', './assets/Art/BG_NorthEast2.png');
        this.load.image('BG_NorthEast3', './assets/Art/BG_NorthEast3.png');
        this.load.image('BG_NorthEast4', './assets/Art/BG_NorthEast4.png');
        this.load.image('BG_NorthEast5', './assets/Art/BG_NorthEast5.png');
        this.load.image('BG_NorthEast6', './assets/Art/BG_NorthEast6.png');
        this.load.image('BG_NorthEast7', './assets/Art/BG_NorthEast7.png');
        this.load.image('BG_NorthEast8', './assets/Art/BG_NorthEast8.png');
        this.load.image('BG_NorthEast9', './assets/Art/BG_NorthEast9.png');
        this.load.image('BG_NorthEast10', './assets/Art/BG_NorthEast10.png');
        this.load.image('BG_East1', './assets/Art/BG_East1.png');
        this.load.image('BG_West1', './assets/Art/BG_West1.png');
        this.load.image('BG_West2', './assets/Art/BG_West2.png');
        this.load.image('BG_West3', './assets/Art/BG_West3.png');
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
            this.LoadSpritesheets();
        })
    }

    LoadSpritesheets() {
        this.Text_Update.setText(" Loading Spritesheets! ");
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
            {frameWidth: 90, frameHeight: 90, startFrame: 0, endFrame: 1}
        );

        //Begin Loading
        this.load.start();

        //Completion Event
        this.load.once(Phaser.Loader.Events.COMPLETE, () => {
            this.LoadAudio();
        })
    }

    LoadAudio() {
        this.Text_Update.setText(" Loading Audio! ");
        
        //Sfx (Not Looped)
        this.load.audio('Sfx_Select', './assets/Audio/menu_option_click.wav');
        this.load.audio('Sfx_Walk', './assets/Audio/steps_sound.wav');
        this.load.audio('Sfx_Rumble', './assets/Audio/Rumble.mp3');
        //Sfx (Looped)
        this.load.audio('Sfx_Lava', './assets/Audio/fire_room.mp3');
        // Music
        this.load.audio('Music_0', './assets/Audio/1_Behold_Wonderment.mp3');
        this.load.audio('Music_1', './assets/Audio/2_Morbid_Curiosity.mp3');
        this.load.audio('Music_2', './assets/Audio/3_SuddenChills.mp3');
        this.load.audio('Music_3', './assets/Audio/4_PointOfNoReturn.mp3');
        this.load.audio('Music_4', './assets/Audio/5_SheAwakens.mp3');

        this.load.start();

        this.load.once(Phaser.Loader.Events.COMPLETE, () => {
            this.LoadAnimations();
        })
    }

    LoadAnimations() {
        this.Text_Update.setText(" Loading Animations! ");
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
        setTimeout(() => {
            this.Count++;
            this.CompleteLoading();
        }, 1000);
    }

    CompleteLoading() {
        this.Text_Update.setText(" Loading Complete! ");
        setTimeout(() => {
            let Delay = FadeOut(this, this.Blackscreen);
            setTimeout(() => {
                this.scene.start("Menu_Main");
            }, Delay);
        }, 500);
    }

    UpdateBar() {
        this.tweens.add({ //Updating bar
            targets: this.Bar,
            width: this.BarBackground1.width * (this.Count / this.Max),
            duration: 200
        });
    }
}