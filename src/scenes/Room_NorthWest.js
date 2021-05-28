class Room_NorthWest extends Phaser.Scene {
    constructor() {
        super("Room_NorthWest");
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

        // Defining static Room Hitboxes.
        this.Hitboxes = {
            //Map Boundries
            "Up":     new Boundry(512, 0, 1024, 100, "Top"),
            "Down1":   new Boundry(0, 576, 798, 50, "BotL"),
            "Down2":   new Boundry(855, 576, 114, 0, "Center"),
            "Down3":   new Boundry(1024, 576, 112, 50, "BotR"),
            "Left":   new Boundry(0, 100, 40, 426, "TopL"),
            "Right":  new Boundry(1024, 100, 40, 426, "TopR")
        };

        // Defining interactable movement objects.
        this.Objects = {
            //Movers
            "Main":    new Mover(this, 855, 540, "Door", 0, "Room_Main").setDepth(10)
        };

        // Comment the next line to make hitboxes invisible.
        // Debug_Hitbox(this, this.Hitboxes);
        //=========================================================
        // Loading visuals
        //=========================================================
        //Player
        this.Player = new Player(
            this, 855, 450, 'Player', 0,
            AnimationIDs.Player,
            this.Hitboxes
        ).setOrigin(0.5, 0.5).setDepth(2);
        //Background
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'BG_NorthWest1'
        ).setOrigin(0, 0).setDepth(0);

        //Shard
        if(!Obtained_Shard.NorthWest) {
            this.Objects.Shard = new Shard(this, 145, 130, 'Shard2', 0)
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
        Object.values(this.Objects).forEach(function(Object){
            if(!isMoving && 
            Object.checkCollision(Scene.Player)) 
            {
                switch(Object.getType()) {
                    case "Mover":
                        isMoving = true;
                        Prev_Room = "Room_NorthWest";
                        let Delay = FadeOut(Scene, Scene.Blackscreen);
                        setTimeout(() => {
                            Scene.scene.start(Object.getTarget());
                        }, Delay);      
                        break;
                    case "Shard":
                        Shard_Count++;
                        Obtained_Shard.NorthWest = true;
                        Scene.Objects.Shard.destroy();
                        delete(Scene.Objects.Shard);
                }
                return;
            }
        });
    }
}