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
        let Dim = game.config;
        this.Hitboxes = {
            //Map Boundries
            "Up":     new Boundry(Dim.width/2, 0, Dim.width, 0, "Top"),
            "Down":   new Boundry(Dim.width/2, Dim.height, Dim.width, 0, "Bot"),
            "Left":   new Boundry(0, Dim.height/2, 0, Dim.height, "Left"),
            "Right":  new Boundry(Dim.width, Dim.height/2, 0, Dim.height, "Right")
        };

        // Defining interactable movement objects.
        this.Objects = {
            //Movers
            "Main":    new Mover(this, 982, 288, "Door", 0, "Room_Main").setDepth(10)
        };

        // Comment the next line to make hitboxes invisible.
        // Debug_Hitbox(this, this.Hitboxes);

        //=========================================================
        // Loading visuals
        //=========================================================
        // Player
        this.Player = new Player(
            this, game.config.width*3/4, game.config.height/2, 'Player', 4,
            AnimationIDs.Player,
            this.Hitboxes
        ).setOrigin(0.5, 0.5).setDepth(2);
        
        //Background
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'BG_Temp'
        ).setOrigin(0, 0).setDepth(0);

        //Shard
        if(!Obtained_Shard.West) {
            this.Objects.Shard = new Shard(this, 36, game.config.height/2, 'Shard3', 0)
        }
        //Darkness
        this.Darkness = this.add.sprite(
            this.Player.x, this.Player.y, "Darkness"
        ).setOrigin(0.5, 0.5).setDepth(10).setAlpha(0.1);

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
        //Darkscreen
        this.Darkness.x = this.Player.x;
        this.Darkness.y = this.Player.y;
    }
}