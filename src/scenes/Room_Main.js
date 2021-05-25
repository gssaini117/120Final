class Room_Main extends Phaser.Scene {
    constructor() {
        super("Room_Main");
    }

    preload() {
        isMoving = false;
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
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Defining Room Hitboxes
        let Dim = game.config;
        this.Hitboxes = {
            //Map Boundries
            "Up":     new Boundry(Dim.width/2, 0, Dim.width, 64, "Top"),
            "Down":   new Boundry(Dim.width/2, Dim.height, Dim.width, 50, "Bot"),
            "Left":   new Boundry(0, Dim.height/2, 35, Dim.height, "Left"),
            "Right":  new Boundry(Dim.width, Dim.height/2, 35, Dim.height, "Right")
        };
        
        // Comment the next line to make hitboxes invisible.
        Debug_Hitbox(this, this.Hitboxes);

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

        //Blackscreen
        this.Blackscreen = new Phaser.GameObjects.Rectangle(
            this, 0, 0, game.config.width, game.config.height, 0x000000, 1, 
        ).setOrigin(0,0).setDepth(101).setAlpha(0);
        this.add.existing(this.Blackscreen);

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
        if(Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("Room_Main")
        }
        if (this.WestDoor.checkCollision(this.Player) &&
        !isMoving) {
            isMoving = true;
            let WaitTime = FadeOut(this, this.Blackscreen);
            setTimeout(() => {
                this.scene.start(this.WestDoor.nextScene);
                console.log("west"); 
            }, WaitTime);
        }
        if (this.EastDoor.checkCollision(this.Player) &&
        !isMoving) {
            isMoving = true;
            let WaitTime = FadeOut(this, this.Blackscreen);
            setTimeout(() => {
                this.scene.start(this.EastDoor.nextScene);
                console.log("east"); 
            }, WaitTime);
        }
        if (this.NorthDoor.checkCollision(this.Player) &&
        !isMoving) {
            isMoving = true;
            let WaitTime = FadeOut(this, this.Blackscreen);
            setTimeout(() => {
                this.scene.start(this.NorthDoor.nextScene);
                console.log("north"); 
            }, WaitTime);
        }
        if (this.SouthDoor.checkCollision(this.Player) &&
        !isMoving) {
            isMoving = true;
            let WaitTime = FadeOut(this, this.Blackscreen);
            setTimeout(() => {
                this.scene.start(this.SouthDoor.nextScene);
                console.log("south"); 
            }, WaitTime);
        }
        if(this.Player.y > game.config.height/2) {
            this.Pylon.setDepth(1);
        } else {
            this.Pylon.setDepth(3);
        }
    }
}