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

        // Defining Room Hitboxes.
        let Dim = game.config;
        this.Hitboxes = {
            //Map Boundries
            "Up":     new Boundry(Dim.width/2, 0, Dim.width, 64, "Top"),
            "Down":   new Boundry(Dim.width/2, Dim.height, Dim.width, 50, "Bot"),
            "Left":   new Boundry(0, Dim.height/2, 35, Dim.height, "Left"),
            "Right":  new Boundry(Dim.width, Dim.height/2, 35, Dim.height, "Right"),
            "Pylon":  new Boundry(Dim.width/2, Dim.height/2 - 10, 60, 20, "Center")
        };
        
        // Defining interactable movement objects.
        this.Objects = {
            //Movers
            "NorthEast":    new Mover(this, 233, 60, "Door", 0, "Room_NorthEast").setDepth(10),
            "NorthWest":    new Mover(this, 791, 60, "Door", 0, "Room_NorthWest").setDepth(10),
            "East":         new Mover(this, 984, 288, "Door", 0, "Room_East").setDepth(10),
            "West":         new Mover(this, 40, 288, "Door", 0, "Room_West").setDepth(10),
            "South":        new Mover(this, 512, 516, "Door", 0, "Menu_GameOver").setDepth(10)
        };

        // Comment the next line to make hitboxes invisible.
        //Debug_Hitbox(this, this.Hitboxes);

        //=========================================================
        // Loading visuals
        //=========================================================
        //Player
        this.Player = new Player(
            this, game.config.width /2, game.config.height*2/3, 'Player', 4,
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

        //Pylon
        console.log('Shard Count: ' + Shard_Count);
        this.Pylon = new Pylon(this, game.config.width/2, game.config.height/2, 'Pylon', Shard_Count).setOrigin(0.5, 1);
    }

    update() {
        this.Player.update();
        if(Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("Room_Main")
        }

        //Checking object collision
        let Temp = this;
        Object.values(this.Objects).forEach(function(Object){
            if(Object != null && 
                Object.checkCollision(Temp.Player)) {
                Temp.scene.start(Object.getTarget());
                return;
            }
        });

        if(this.Player.y > game.config.height/2) {
            this.Pylon.setDepth(1);
        } else {
            this.Pylon.setDepth(3);
        }
    }
}