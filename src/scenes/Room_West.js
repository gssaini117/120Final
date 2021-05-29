class Room_West extends Phaser.Scene {
    constructor() {
        super("Room_West");
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
        // Defining Room Hitboxes
        this.Hitboxes = {
            //Map Boundries
            "Top":     new Boundry(512, 0, 1024, 110, "Top"),
            "Down":    new Boundry(512, 576, 1024, 50, "Bot"),
            "Left":    new Boundry(0, 110, 38, 416, "TopL"),
            "Right1":  new Boundry(1024, 110, 38, 264, "TopR"),
            "Right2":  new Boundry(1024, 374, 0, 102, "TopR"),
            "Right3":  new Boundry(1024, 476, 38, 50, "TopR"),
            //Walls
            "R1":      new Boundry(800, 110, 55, 264, "TopR"),
            "R2":      new Boundry(800, 526, 55, 50, "BotR"),
            "R3":      new Boundry(745, 324, 126, 50, "BotR"),
            "L1":      new Boundry(224, 110, 55, 264, "TopL"),
            "L2":      new Boundry(224, 526, 55, 50, "BotL"),
            "L3":      new Boundry(279, 324, 126, 50, "BotL"),
            //Doors
            "TopR":    new Boundry(),
            "BotR":    new Boundry(),
            "TopL":    new Boundry(),
            "BotL":    new Boundry(),
        };

        // Defining interactable movement objects.
        this.Objects = {
            //Movers
            "Main":    new Mover(this, 1000, 420, "Door", 0, "Room_Main").setDepth(10)
        };

        // Comment the next line to make hitboxes invisible.
        Debug_Hitbox(this, this.Hitboxes);

        //=========================================================
        // Loading visuals
        //=========================================================
        // Player
        this.Player = new Player(
            this, 950, 400, 'Player', 8,
            AnimationIDs.Player,
            this.Hitboxes
        ).setOrigin(0.5, 0.5).setDepth(2);
        
        //Background
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'BG_West1'
        ).setOrigin(0, 0).setDepth(0);

        //Shard
        if(!Obtained_Shard.West) {
            this.Objects.Shard = new Shard(this, 892, 140, 'Shard3', 0)
        }

        //=========================================================
        // Starting Scene
        //=========================================================
        let Delay = FadeIn(this, this.Blackscreen);
        setTimeout(() => {
            //Unlocks player movement
            isMoving = false;
        }, Delay);  
    }

    update() {
        this.Player.update();
        //Checking Object Collision
        let Scene = this;
        let Hitbox = this.Player.getHitbox();
        Object.values(this.Objects).forEach(function(Object){
            if(!isMoving && 
            Object.checkCollision(Hitbox)) 
            {
                switch(Object.getType()) {
                    case "Mover":
                        isMoving = true;
                        Prev_Room = "Room_West";
                        let Delay = FadeOut(Scene, Scene.Blackscreen);
                        setTimeout(() => {
                            Scene.scene.start(Object.getTarget());
                        }, Delay);      
                        break;
                    case "Shard":
                        Shard_Count++;
                        Obtained_Shard.West = true;
                        Scene.Objects.Shard.destroy();
                        delete(Scene.Objects.Shard);
                }
                return;
            }
        });
    }
}