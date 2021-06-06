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
            //Doors (Changeable)
            "NorthEast": new Boundry(739.5, 0, 108.5, 105, "TopL"),
            "NorthWest": new Boundry(176, 0, 108.5, 105, "TopL"),
            "East":      new Boundry(1024, 285, 40, 81, "TopR"),
            "West":      new Boundry(0, 285, 40, 81, "TopL"),
            "South":     new Boundry(512, 576, 112, 50, "Bot"),
        };
        
        // Door sprites
        this.Doors = {
            NorthWest:  this.add.tileSprite(
                233, 174, 300, 250, 'Gate_Horizontal'
                ).setOrigin(0.5,1).setDepth(1).setFrame(1),
            NorthEast:  this.add.tileSprite(
                792, 174, 300, 250, 'Gate_Horizontal'
                ).setOrigin(0.5,1).setDepth(1).setFrame(1),
            East:       this.add.tileSprite(
                1008, 300, 300, 250, 'Gate_Vertical'
                ).setOrigin(0.5,0.5).setDepth(1).setFrame(1).setScale(0.8),
            West:       this.add.tileSprite(
                25, 300, 300, 250, 'Gate_Vertical'
                ).setOrigin(0.5,0.5).setDepth(1).setFrame(1).setScale(0.8),
            South:      this.add.tileSprite(
                512,653,300,250,'Gate_Horizontal'
                ).setOrigin(0.5, 1).setDepth(1).setFrame(1),
                
        }
        this.add.existing(this.Doors.South);

        // Defining interactable movement objects.
        this.Objects = {};
        // Adding movers based on player progress
        if(Shard_Count > 0 && Shard_Count < 4) {
            this.Objects.South = new Mover(this,512,516,"Door",0,"Menu_GameOver");
            this.Doors.South.setFrame(0);
            this.Hitboxes.South.setIsActive(false);
            this.Doors.South.setDepth(5);
        }
        if(!Obtained_Shard.NorthEast) {
            this.Objects.NorthEast = new Mover(this, 791, 60, "Door", 0, "Room_NorthEast");
            this.Doors.NorthEast.setFrame(0);
            this.Hitboxes.NorthEast.setIsActive(false);
        }
        if(!Obtained_Shard.NorthWest) {
            this.Objects.NorthWest = new Mover(this, 233, 60, "Door", 0, "Room_NorthWest");
            this.Doors.NorthWest.setFrame(0);
            this.Hitboxes.NorthWest.setIsActive(false);
        }
        if(!Obtained_Shard.East) {
            this.Objects.East = new Mover(this, 1004, 325, "Door", 0, "Room_East");
            this.Doors.East.setFrame(0);
            this.Hitboxes.East.setIsActive(false);
        }
        if(!Obtained_Shard.West) {
            this.Objects.West = new Mover(this, 20, 325, "Door", 0, "Room_West");
            this.Doors.West.setFrame(0);
            this.Hitboxes.West.setIsActive(false);
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
        this.background1 = this.add.tileSprite(
            0, 0, 1024, 576, 'BG_Main1'
        ).setOrigin(0, 0).setDepth(0);
        this.background2 = this.add.tileSprite(
            0, 0, 1024, 576, 'BG_Main2'
        ).setOrigin(0, 0).setDepth(6);
        this.background3 = this.add.tileSprite(
            0, 0, 1024, 576, 'BG_Main3'
        ).setOrigin(0, 0).setDepth(2);

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
            if(Shard_Count == 4) {
                setTimeout(() => {
                    Delay = FadeOut(this, this.Blackscreen);
                    setTimeout(() => {
                        isMoving = true;
                        StopMusic(true);
                        this.scene.start("Menu_GameOver");
                    }, Delay)
                }, 10000)
            }
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
            this.Pylon.setDepth(3);
        } else {
            this.Pylon.setDepth(5);
        }
    }

    SpawnPlayer(PosX, PosY, Frame) {
        this.Player = new Player(
            this, PosX, PosY, 'Player', Frame,
            AnimationIDs.Player,
            this.Hitboxes
        ).setDepth(4);
    }
}