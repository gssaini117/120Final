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
        Define_Keys(this);

        // Defining static Room Hitboxes.
        this.Hitboxes = {
            //Map Boundries
            "Top":    new Boundry(512, 0, 455, 105, "Top"),
            "TopD1":  new Boundry(176, 0, 109, 0, "TopL"),
            "TopD2":  new Boundry(848, 0, 109, 0, "TopR"),
            "TopR1":  new Boundry(0, 0, 176, 105, "TopL"),
            "TopR2":  new Boundry(0, 105, 40, 180, "TopL"),
            "TopL1":  new Boundry(1024, 0, 176, 105, "TopR"),
            "TopL2":  new Boundry(1024, 105, 40, 180, "TopR"),
            "TopD":   new Boundry(512, 576, 108, 0, "Bot"),
            "DownL1": new Boundry(0, 576, 456, 50, "BotL"),
            "DownL2": new Boundry(0, 526, 40, 160, "BotL"),
            "DownR1": new Boundry(1024, 576, 456, 50, "BotR"),
            "DownR2": new Boundry(1024, 526, 40, 160, "BotR"),
            //Objects (Static)
            "Pylon":  new Boundry(512, 205, 100, 25, "Center"),
        };
        
        // Defining interactable movement objects.
        this.Objects = {};
        // Adding movers based on player progress
        if(Shard_Count > 0) {
            this.Objects.South = new Mover(this,512,516,"Door",0,"Menu_GameOver");
        }
        if(!Obtained_Shard.NorthEast) {
            this.Objects.NorthEast = new Mover(this, 791, 60, "Door", 0, "Room_NorthEast");
        }
        if(!Obtained_Shard.NorthWest) {
            this.Objects.NorthWest = new Mover(this, 233, 60, "Door", 0, "Room_NorthWest");
        }
        if(!Obtained_Shard.East) {
            this.Objects.East = new Mover(this, 1004, 325, "Door", 0, "Room_East");
        }
        if(!Obtained_Shard.South) {
            this.Objects.West = new Mover(this, 20, 325, "Door", 0, "Room_West");
        }

        // Adding audio
        this.Move = this.sound.add('Sfx_Walk');
        this.Move_Config = {mute: false, volume: 1, loop: false, delay: 0};

        // Comment the next line to make hitboxes invisible.
        // Debug_Hitbox(this, this.Hitboxes);

        //=========================================================
        // Loading visuals
        //=========================================================
        //Player
        switch(Prev_Room) {
            case "Room_East":
                this.SpawnPlayer(864, 288, 8);
                break;
            case "Room_West":
                this.SpawnPlayer(160, 288, 12);
                break;
            case "Room_NorthEast":
                this.SpawnPlayer(791, 180, 4);
                break;
            case "Room_NorthWest":
                this.SpawnPlayer(233, 180, 4);
                break;
            case "Room_Main":
                this.SpawnPlayer(game.config.width /2, game.config.height*2/3);
        }
        Prev_Room = "Room_Main"
        
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
        PlayMusic(this);
        setTimeout(() => {
            //Unlocks player movement
            isMoving = false;
        }, Delay);  
    }

    //=================================================================================
    // UPDATE
    //=================================================================================
    update() {
        this.Player.update();

        //=========================================================
        // Object Collision Detection
        //=========================================================
        let Scene = this;
        let Hitbox = this.Player.getHitbox();
        Object.values(this.Objects).forEach(function(Object){
            if(!isMoving && 
            Object.checkCollision(Hitbox)) 
            {
                switch(Object.getType()) {
                    case "Mover":
                        isMoving = true;
                        let Delay = FadeOut(Scene, Scene.Blackscreen);
                        Scene.Move.play(Scene.Move_Config);
                        if(Object.getTarget() == "Menu_GameOver") {StopMusic(true)};
                        setTimeout(() => {
                            Scene.Move.stop();
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

    SpawnPlayer(PosX, PosY, Frame) {
        this.Player = new Player(
            this, PosX, PosY, 'Player', Frame,
            AnimationIDs.Player,
            this.Hitboxes
        ).setDepth(2);
    }
}