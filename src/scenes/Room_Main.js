class Room_Main extends Phaser.Scene {
    constructor() {
        super("Room_Main");
    }

    preload() {
        //Blackscreen
        this.Blackscreen = new Phaser.GameObjects.Rectangle(
          this, 0, 0, game.config.width, game.config.height, 0x000000, 1, 
        ).setOrigin(0,0).setDepth(101);
        this.add.existing(this.Blackscreen);
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

        // Defining static Room Hitboxes.
        this.Hitboxes = {
            //Map Boundries
            "Top":    new Boundry(512, 0, 455, 105, "Top"),
            "TopR1":  new Boundry(0, 0, 176, 105, "TopL"),
            "TopR2":  new Boundry(0, 105, 40, 180, "TopL"),
            "TopL1":  new Boundry(1024, 0, 176, 105, "TopR"),
            "TopL2":  new Boundry(1024, 105, 40, 180, "TopR"),
            "DownL1": new Boundry(0, 576, 456, 50, "BotL"),
            "DownL2": new Boundry(0, 526, 40, 160, "BotL"),
            "DownR1": new Boundry(1024, 576, 456, 50, "BotR"),
            "DownR2": new Boundry(1024, 526, 40, 160, "BotR"),
            //Objects (Static)
            "Pylon":  new Boundry(512, 205, 100, 25, "Center"),
        };
        
        // Defining interactable movement objects.
        this.Objects = {
            //Movers
            "NorthEast":    new Mover(this, 791, 60, "Door", 0, "Room_NorthEast").setDepth(10),
            "NorthWest":    new Mover(this, 233, 60, "Door", 0, "Room_NorthWest").setDepth(10),
            "East":         new Mover(this, 984, 288, "Door", 0, "Room_East").setDepth(10),
            "West":         new Mover(this, 40, 288, "Door", 0, "Room_West").setDepth(10),
            "South":        new Mover(this, 512, 516, "Door", 0, "Menu_GameOver").setDepth(10)
        };

        // Comment the next line to make hitboxes invisible.
        // Debug_Hitbox(this, this.Hitboxes);

        //=========================================================
        // Loading visuals
        //=========================================================
        //Player
        this.Player = new Player(
            this, game.config.width /2, game.config.height*2/3, 'Player', 4,
            AnimationIDs.Player,
            this.Hitboxes
        ).setDepth(2);
        
        //Background
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'BG_Main1'
        ).setOrigin(0, 0).setDepth(0);
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'BG_Main2'
        ).setOrigin(0, 0).setDepth(4);

        //Pylon
        console.log('Shard Count: ' + Shard_Count);
        this.Pylon = new Pylon(this, game.config.width/2, game.config.height/2.5, 'Pylon', Shard_Count).setOrigin(0.5, 1);
        //=========================================================
        // Starting Game
        //=========================================================
        let Delay = FadeIn(this, this.Blackscreen);
        setTimeout(() => {
            //Unlocks player movement
            isMoving = false;
        }, Delay);  
    }

    update() {
        this.Player.update();
        if(Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.start("Room_Main")
        }

        //Checking Object Collision
        let Scene = this;
        Object.values(this.Objects).forEach(function(Object){
            if(!isMoving && 
            Object.checkCollision(Scene.Player)) 
            {
                switch(Object.getType()) {
                    case "Mover":
                        isMoving = true;
                        let Delay = FadeOut(Scene, Scene.Blackscreen)
                        setTimeout(() => {
                            Scene.scene.start(Object.getTarget());
                        }, Delay);       
                }
                return;
            }
        });

        if(this.Player.y > 190) {
            this.Pylon.setDepth(1);
        } else {
            this.Pylon.setDepth(3);
        }
    }
}