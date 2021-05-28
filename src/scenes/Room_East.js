class Room_East extends Phaser.Scene {
    constructor() {
        super("Room_East");
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
        
        //Adding Audio
        this.Lava = this.sound.add('Sfx_Lava');
        this.Lava_Config = {mute: false, volume: 0.2, loop: true, delay: 0};

         // Defining static Room Hitboxes.
        this.Hitboxes = {
            //Map Boundries
            "Up":     new Boundry(512, 0, 1024, 134, "Top"),
            "Down":   new Boundry(512, 576, 1024, 135, "Bot"),
            "Left1":  new Boundry(0, 134, 195, 111, "TopL"),
            "Left2":  new Boundry(0, 245, 40, 42, "TopL"),
            "Left3":  new Boundry(0, 441, 430, 115, "BotL"),
            "Right":  new Boundry(1024, 134, 160, 307, "TopR"),
            "Mid1":   new Boundry(289, 326, 141, 118, "BotL"),
            "Mid2":   new Boundry(430, 208, 161, 79, "TopL"),
            "Mid3":   new Boundry(591, 208, 178, 156, "TopL"),
        };

        // Defining interactable movement objects.
        this.Objects = {
            //Movers
            "Main":    new Mover(this, 36, 288, "Door", 0, "Room_Main").setDepth(10)
        };

        // Comment the next line to make hitboxes invisible.
        // Debug_Hitbox(this, this.Hitboxes);

        //=========================================================
        // Loading visuals
        //=========================================================
        //Player
        this.Player = new Player(
            this, 80, 270, 'Player', 12,
            AnimationIDs.Player,
            this.Hitboxes
        ).setOrigin(0.5, 0.5).setDepth(2);
        //Background
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'BG_East1'
        ).setOrigin(0, 0).setDepth(0);

        //Shard
        if(!Obtained_Shard.East) {
            this.Objects.Shard = new Shard(this, 512, 330, 'Shard1', 0)
        }
        //=========================================================
        // Starting Scene
        //=========================================================
        let Delay = FadeIn(this, this.Blackscreen);
        setTimeout(() => {
            //Unlocks player movement
            isMoving = false;
        }, Delay);  
        //Playing Audio
        this.Lava.play(this.Lava_Config);
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
                        Prev_Room = "Room_East";
                        let Delay = FadeOut(Scene, Scene.Blackscreen);
                        setTimeout(() => {
                            Scene.Lava.stop();
                            Scene.scene.start(Object.getTarget());
                        }, Delay);      
                        break;
                    case "Shard":
                        Shard_Count++;
                        Obtained_Shard.East = true;
                        Scene.Objects.Shard.destroy();
                        delete(Scene.Objects.Shard);
                }
                return;
            }
        });
    }
}