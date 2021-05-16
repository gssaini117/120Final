class Room_East extends Phaser.Scene {
    constructor() {
        super("Room_East");
    }

    preload() {
        //=========================================================
        // Loading Assets
        //=========================================================
        this.load.spritesheet('Player', './assets/Player.png',
            {frameWidth: 70, frameHeight: 75, startFrame: 0, endFrame: 15}
        );
        this.load.image('Background', './assets/Background_Placeholder.png');
        this.load.image('Door', './assets/Temp_Door.png');
    }

    create() {
        //=========================================================
        // Animation Setup
        //=========================================================
        let Anims = { // Convinient for referencing/changing player anim names
            "Up":       "Player_Up",
            "Down":     "Player_Down",
            "Left":     "Player_Left",
            "Right":    "Player_Right"
        };
        this.anims.create({ //Player Up
            key: Anims.Up, frameRate: 8, repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', { start: 0, end: 3, first: 0}),
        });
        this.anims.create({ //Player Down
            key: Anims.Down, frameRate: 8, repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', { start: 4, end: 7, first: 0}),
        });
        this.anims.create({ //Player Left
            key: Anims.Left, frameRate: 8, repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', { start: 8, end: 11, first: 0}),
        });
        this.anims.create({ //Player Right
            key: Anims.Right, frameRate: 8, repeat: -1,
            frames: this.anims.generateFrameNumbers('Player', { start: 12, end: 15, first: 0}),
        });
        //=========================================================
        // Technical
        //=========================================================
        // Defining keys.
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // Defining map boundries
        let boundries = {
            "Up": 0,
            "Down": 0,
            "Left": 0,
            "Right": 0,
        };
        //=========================================================
        // Loading visuals
        //=========================================================
        //Player
        this.Player = new Player(
            this, game.config.width/4, game.config.height/2, 'Player', 4,
            Anims,
            boundries
        ).setOrigin(0.5, 0.5).setDepth(1);
        //Background
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'Background'
        ).setOrigin(0, 0).setDepth(0);
        //Doors
        this.Door_Main = new Door(this, 36, game.config.height/2, 'Door', 0, "Room_Main");
    }

    update() {
        this.Player.update();
        if (this.Door_Main.checkCollision(this.Player)) {
            this.scene.start(this.Door_Main.nextScene);
            console.log("Main")
        }
    }
}