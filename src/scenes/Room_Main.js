class Room_Main extends Phaser.Scene {
    constructor() {
        super("Room_Main");
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
            "Up":     new Boundry(this, Dim.width/2, 0, Dim.width, 64, "Top").setOrigin(0.5, 0),
            "Down":   new Boundry(this, Dim.width/2, Dim.height, Dim.width, 50, "Bot").setOrigin(0.5, 1),
            "Left":   new Boundry(this, 0, Dim.height/2, 35, Dim.height, "Left").setOrigin(0, 0.5),
            "Right":  new Boundry(this, Dim.width, Dim.height/2, 35, Dim.height, "Right").setOrigin(1, 0.5),
        };
        
        // Comment the next line to make hitboxes invisible.
        this.Debug_Hitbox();

        //=========================================================
        // Loading visuals
        //=========================================================
        //Player
        this.Player = new Player(
            this, game.config.width /2, game.config.height/2, 'Player', 4,
            AnimationIDs.Player,
            this.Hitboxes
        ).setOrigin(0.5, 0.5).setDepth(2);
        
        //Background
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'BG_Main1-1'
        ).setOrigin(0, 0).setDepth(0);
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'BG_Main1-2'
        ).setOrigin(0, 0).setDepth(4);
        //Doors
        this.WestDoor = new Door(this, 36, game.config.height/2, 'Door', 0, "Room_West");
        this.EastDoor = new Door(this, game.config.width-36, game.config.height/2, 'Door', 0, "Room_East");
        this.NorthDoor = new Door(this, game.config.width/2, 70, 'Door', 0, "Room_North");
        this.SouthDoor = new Door(this, game.config.width/2, game.config.height-60, 'Door', 0, "Room_South");
        //Pylon
        console.log('Shard Count: ' + Shard_Count);
        this.Pylon = new Pylon(this, game.config.width/2, game.config.height/2, 'Pylon', Shard_Count).setOrigin(0.5, 1);
    }

    update() {
        this.Player.update();
        if (this.WestDoor.checkCollision(this.Player)) {
            this.scene.start(this.WestDoor.nextScene);
            console.log("west");
        }
        if (this.EastDoor.checkCollision(this.Player)) {
            this.scene.start(this.EastDoor.nextScene);
            console.log("east");
        }
        if (this.NorthDoor.checkCollision(this.Player)) {
            this.scene.start(this.NorthDoor.nextScene);
            console.log("north");
        }
        if (this.SouthDoor.checkCollision(this.Player)) {
            this.scene.start(this.SouthDoor.nextScene);
            console.log("south");
        }
        if(this.Player.y > game.config.height/2) {
            this.Pylon.setDepth(1);
        } else {
            this.Pylon.setDepth(3);
        }
    }

    Debug_Hitbox() {
        Object.values(this.Hitboxes).forEach(function(Obstacle){
            if(Obstacle != null) {
                Obstacle.setDepth(100);
            }
        });
    }
}