class Room_North extends Phaser.Scene {
    constructor() {
        super("Room_North");
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
        // Defining Room Hitboxes
        let Dim = game.config;
        this.Hitboxes = {
            //Map Boundries
            "Up":     new Boundry(this, Dim.width/2, 0, Dim.width, 0, "Top").setOrigin(0.5, 0),
            "Down":   new Boundry(this, Dim.width/2, Dim.height, Dim.width, 0, "Bot").setOrigin(0.5, 1),
            "Left":   new Boundry(this, 0, Dim.height/2, 0, Dim.height, "Left").setOrigin(0, 0.5),
            "Right":  new Boundry(this, Dim.width, Dim.height/2, 0, Dim.height, "Right").setOrigin(1, 0.5),
        };
        //=========================================================
        // Loading visuals
        //=========================================================
        //Player
        this.Player = new Player(
            this, game.config.width /2, game.config.height*3/4, 'Player', 4,
            AnimationIDs.Player,
            this.Hitboxes
        ).setOrigin(0.5, 0.5).setDepth(2);
        //Background
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'BG_Temp'
        ).setOrigin(0, 0).setDepth(0);
        //Doors
        this.Door_Main = new Door(this, game.config.width/2, game.config.height - 36, 'Door', 0, "Room_Main");
        //Shard
        if(!Obtained_Shard.North) {
            this.Shard = new Shard(this, game.config.width/2, 36, 'Shard', 0)
        }
    }

    update() {
        this.Player.update();
        //Door collision
        if (this.Door_Main.checkCollision(this.Player)) {
            this.scene.start(this.Door_Main.nextScene);
            console.log("Main")
        }
        //Shard collision
        if(!Obtained_Shard.North &&
        this.Shard.checkCollision(this.Player)) 
        {
            this.Shard.destroy();
            Shard_Count++;
            Obtained_Shard.North = true;
        }
    }
}