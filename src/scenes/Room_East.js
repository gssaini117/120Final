class Room_East extends Phaser.Scene {
    constructor() {
        super("Room_East");
    }

    preload() {

    }

    create() {
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
            this, game.config.width /2, game.config.height/2, 'Player', 4,
            AnimationIDs.Player,
            boundries
        ).setOrigin(0.5, 0.5).setDepth(2);
        //Background
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'BG_Temp'
        ).setOrigin(0, 0).setDepth(0);
        //Doors
        this.Door_Main = new Door(this, 36, game.config.height/2, 'Door', 0, "Room_Main");
        if(!Obtained_Shard.East) {
            this.Shard = new Shard(this, game.config.width - 36, game.config.height/2, 'Shard', 0)
        }
    }

    update() {
        this.Player.update();
        if (this.Door_Main.checkCollision(this.Player)) {
            this.scene.start(this.Door_Main.nextScene);
            console.log("Main")
        }
        //Shard collision
        if(!Obtained_Shard.East &&
            this.Shard.checkCollision(this.Player)) 
            {
                Shard_Count++;
                Obtained_Shard.East = true;
                this.Shard.destroy();
            }
    }
}