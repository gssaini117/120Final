class Room_NorthWest extends Phaser.Scene {
    constructor() {
        super("Room_NorthWest");
    }

    preload() {
        // Generating entry screens.
        if(Died) {this.Generate_Screens(0, 1);} else {this.Generate_Screens(1, 0);};
    }

    //=================================================================================
    // CREATE
    //=================================================================================
    create() {
        //=========================================================
        // Technical
        //=========================================================
        // Defining keys.
        Define_Keys(this);

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
            "Main":    new Mover(this, 855, 540, "Door", 0, "Room_Main").setDepth(10),
            //Death Points
            "Left1":    new Boundry(40, 186, 20, 86, "BotL"),
            "Left2":    new Boundry(40, 275, 39, 89, "BotL"),
            "Left3":    new Boundry(40, 444, 114, 169, "BotL"),
            "Left4":    new Boundry(40, 526, 745, 82, "BotL"),
            "Center1":  new Boundry(154, 275, 351, 20, "TopL"),
            "Center2":  new Boundry(234, 295, 271, 65, "TopL"),
            "Center3":  new Boundry(338, 275, 167, 87, "BotL"),
            "Center4":  new Boundry(784, 298, 194, 60, "TopR"),
            "Center5":  new Boundry(840, 298, 110, 100, "BotR"),
            "Right1":   new Boundry(984, 526, 58, 190, "BotR"),
            "Right2":   new Boundry(984, 336, 200, 38, "BotR"),
            "Right3":   new Boundry(984, 298, 80, 198, "BotR"),
            "Top1":     new Boundry(904, 100, 316, 40, "TopR"),
            "Top2":     new Boundry(588, 100, 359, 17, "TopR"),
            "Top3":     new Boundry(663, 140, 75, 88, "TopR"),
            "Top4":     new Boundry(229, 117, 40, 99, "TopL"),
            "Top5":     new Boundry(229, 187, 63, 29, "TopR"),
        };

        // Adding audio
        this.Move = this.sound.add('Sfx_Walk');
        this.Move_Config = {mute: false, volume: 1, loop: false, delay: 0};
        this.Rumble = this.sound.add('Sfx_Rumble');
        this.Rumble_Config = {mute: false, volume: 1, loop: false, delay: 0};

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
        this.background = this.add.tileSprite( // Main
            0, 0, 1024, 576, 'BG_NorthWest1'
        ).setOrigin(0, 0).setDepth(0);
        let Alpha;
        if(Obtained_Shard.NorthWest) {Alpha = 1} else {Alpha = 0.1};
        this.background2 = this.add.tileSprite( // Path
            0, 0, 1024, 576, 'BG_NorthWest2'
        ).setOrigin(0, 0).setDepth(1).setAlpha(Alpha);
        //Shard
        if(!Obtained_Shard.NorthWest) {
            this.Objects.Shard = new Shard(this, 145, 130, 'Shard2', 0)
        }

        //=========================================================
        // Starting Scene
        //=========================================================
        let Delay;
        if(Died) {
            Delay = FadeIn(this, this.Redscreen);
            Died = false;
        } else {
            Delay = FadeIn(this, this.Blackscreen);
        };
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
        //Restarting room if died.
        if(Died) {
            this.scene.start("Room_NorthWest");
        }

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
                        Prev_Room = "Room_NorthWest";
                        let Delay = FadeOut(Scene, Scene.Blackscreen);
                        Scene.Move.play(Scene.Move_Config);
                        setTimeout(() => {
                            Scene.Move.stop();
                            Scene.scene.start(Object.getTarget());
                        }, Delay);      
                        break;
                    case "Boundry":
                        Scene.ResetRoom();
                        break;
                    case "Shard":
                        Shard_Count++;
                        Obtained_Shard.NorthWest = true;
                        Scene.Objects.Shard.destroy();
                        delete(Scene.Objects.Shard);
                        Scene.Rumble.play(Scene.Rumble_Config);
                        UpdateMusic();
                        Scene.FadeInPath();
                }
                return;
            }
        });
    }

    //=================================================================================
    // SCENE FUNCTIONS
    //=================================================================================
    ResetRoom() {
        isMoving = true;
        this.tweens.add({ //Alpha from 0 to 1
            targets: this.Redscreen,
            alpha: 1,
            duration: RESET_TIME
        });
        setTimeout(() => {
            Died = true;
        }, RESET_TIME);
    }

    Generate_Screens(BlackAlpha, RedAlpha) {
        //Blackscreen
        this.Blackscreen = new Phaser.GameObjects.Rectangle(
            this, 0, 0, game.config.width, game.config.height, 0x000000, 1, 
        ).setOrigin(0,0).setDepth(4).setAlpha(BlackAlpha);
        this.add.existing(this.Blackscreen);
        //Redscreen (On touching fire)
        this.Redscreen = new Phaser.GameObjects.Rectangle(
            this, 0, 0, game.config.width, game.config.height, 0xff0000, 1, 
        ).setOrigin(0,0).setDepth(4).setAlpha(RedAlpha);
        this.add.existing(this.Redscreen);
    }

    FadeInPath() {
        this.tweens.add({ //Alpha from 0 to 1
            targets: this.background2,
            alpha: 1,
            duration: 500
        });
    }
}