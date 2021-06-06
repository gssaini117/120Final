class Room_East extends Phaser.Scene {
    constructor() {
        super("Room_East");
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
        
        //Fields used to manage fire behavior.
        this.TIME = 0;
        this.On_Cooldown = false;
        this.FIRE_DURATION = 2000;
        this.FIRE_TRANSITION_DELAY = 1000;
        this.Active_Time = 0;
        this.Firing = false; //Manages fire delay
        this.FireCount = 0; //Manages pattern

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
            "Main":     new Mover(this, 20, 288, "Door", 0, "Room_Main").setDepth(3),
            //1st Fire Row (Single)
            "Fire1-1":  new Fire(this, 210, 230, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire1-2":  new Fire(this, 244, 230, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire1-3":  new Fire(this, 278, 230, "Fire", 0, "Fire_Loop").setDepth(1),
            //2nd Fire Row (Pair)
            "Fire2-1":  new Fire(this, 310, 152, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire2-2":  new Fire(this, 310, 188, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire3-1":  new Fire(this, 350, 152, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire3-2":  new Fire(this, 350, 188, "Fire", 0, "Fire_Loop").setDepth(1),
            //3th Fire Row (Pair)
            "Fire4-1":  new Fire(this, 490, 152, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire4-2":  new Fire(this, 490, 188, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire5-1":  new Fire(this, 530, 152, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire5-2":  new Fire(this, 530, 188, "Fire", 0, "Fire_Loop").setDepth(1),
            //4th Fire Row (Arrythmic)
            "Fire6-1":  new Fire(this, 670, 152, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire6-2":  new Fire(this, 670, 188, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire7-1":  new Fire(this, 710, 152, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire7-2":  new Fire(this, 710, 188, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire8-1":  new Fire(this, 750, 152, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire8-2":  new Fire(this, 750, 188, "Fire", 0, "Fire_Loop").setDepth(1),
            //5th Fire Row (Pair)
            "Fire9-1":  new Fire(this, 784, 227, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire9-2":  new Fire(this, 818, 227, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire9-3":  new Fire(this, 852, 227, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire10-1":  new Fire(this, 784, 267, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire10-2":  new Fire(this, 818, 267, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire10-3":  new Fire(this, 852, 267, "Fire", 0, "Fire_Loop").setDepth(1),
            //6th Fire Row (Pair)
            "Fire11-1":  new Fire(this, 784, 307, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire11-2":  new Fire(this, 818, 307, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire11-3":  new Fire(this, 852, 307, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire12-1":  new Fire(this, 784, 347, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire12-2":  new Fire(this, 818, 347, "Fire", 0, "Fire_Loop").setDepth(1),
            "Fire12-3":  new Fire(this, 852, 347, "Fire", 0, "Fire_Loop").setDepth(1),
        };

        // Adding audio
        this.Move = this.sound.add('Sfx_Walk');
        this.Move_Config = {mute: false, volume: 1, loop: false, delay: 0};
        this.Rumble = this.sound.add('Sfx_Rumble');
        this.Rumble_Config = {mute: false, volume: 1, loop: false, delay: 0};
        this.Lava = this.sound.add('Sfx_Lava');
        this.Lava_Config = {mute: false, volume: 0.1, loop: true, delay: 0};

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
        //Playing Audio
        if(!Obtained_Shard.East) {this.Lava.play(this.Lava_Config);}
    }
        
    //=================================================================================
    // UPDATE
    //=================================================================================
    update() {
        this.Player.update(); //Updating Player
        if(!this.On_Cooldown) { //Updating Time
            this.On_Cooldown = true;
            if(Died) {
                this.TIME = 0;
                this.Lava.stop();
                this.scene.start("Room_East");
            } else {
                this.TIME+= 100;
                setTimeout(() => {
                    this.On_Cooldown = false;
                }, 100);  
            }
            console.log(this.Player.getHitbox().width);
            console.log(this.Objects["Fire1-1"].width);
        };

        //=========================================================
        // Updating Fire behavior
        //=========================================================
        //Activation
        if(!this.Firing &&
        !Obtained_Shard.East &&
        this.TIME - this.Active_Time >= this.FIRE_TRANSITION_DELAY) {
            this.Active_Time = this.TIME;
            this.Firing = !this.Firing;
            this.ActivateFire();
        } else if(this.Firing &&
        this.TIME - this.Active_Time >= this.FIRE_DURATION) {
            this.Active_Time = this.TIME;
            this.Firing = !this.Firing;
            this.DisableFire();
        }

        //Depth
        let Hitbox = this.Player.getHitbox();
        Object.values(this.Objects).forEach(function(Object){
            if(Object.getType() == "Fire" && Hitbox.y < Object.y){
                Object.setDepth(3);
            } else {
                Object.setDepth(1);
            }
        })

        //=========================================================
        // Object Collision Detection
        //=========================================================
        let Scene = this;
        Object.values(this.Objects).forEach(function(Object){
            if(!isMoving && 
            Object.checkCollision(Hitbox)) 
            {
                switch(Object.getType()) {
                    case "Mover":
                        isMoving = true;
                        Prev_Room = "Room_East";
                        let Delay = FadeOut(Scene, Scene.Blackscreen);
                        Scene.Move.play(Scene.Move_Config);
                        setTimeout(() => {
                            Scene.Lava.stop();
                            Scene.Move.stop();
                            Scene.scene.start(Object.getTarget());
                        }, Delay);      
                        break;
                    case "Shard":
                        Shard_Count++;
                        Obtained_Shard.East = true;
                        Scene.Objects.Shard.destroy();
                        delete(Scene.Objects.Shard);
                        Scene.Lava.stop();
                        Scene.Rumble.play(Scene.Rumble_Config);
                        UpdateMusic();
                        break;
                    case "Fire":
                        Scene.ResetRoom();
                }
                return;
            }
        });
    }
    
    //=================================================================================
    // SCENE FUNCTIONS
    //=================================================================================
    ActivateFire() {
        this.Firing = true;
        this.FireCount++;
        // Single Fires
        this.Objects["Fire1-1"].activate();
        this.Objects["Fire1-2"].activate();
        this.Objects["Fire1-3"].activate();

        // Paired Alternating Fires
        switch(this.FireCount % 2) {
            case 0:
                this.Objects["Fire2-1"].activate();
                this.Objects["Fire2-2"].activate();
                this.Objects["Fire5-1"].activate();
                this.Objects["Fire5-2"].activate();
                this.Objects["Fire10-1"].activate();
                this.Objects["Fire10-2"].activate();
                this.Objects["Fire10-3"].activate();
                this.Objects["Fire12-1"].activate();
                this.Objects["Fire12-2"].activate();
                this.Objects["Fire12-3"].activate();
                break;
            case 1:
                this.Objects["Fire3-1"].activate();
                this.Objects["Fire3-2"].activate();
                this.Objects["Fire4-1"].activate();
                this.Objects["Fire4-2"].activate();
                this.Objects["Fire9-1"].activate();
                this.Objects["Fire9-2"].activate();
                this.Objects["Fire9-3"].activate();
                this.Objects["Fire11-1"].activate();
                this.Objects["Fire11-2"].activate();
                this.Objects["Fire11-3"].activate();
        }

        // Arrythmic Fire
        switch(this.FireCount % 3) {
            case 0:
                this.Objects["Fire6-1"].activate();
                this.Objects["Fire6-2"].activate();
                this.Objects["Fire8-1"].activate();
                this.Objects["Fire8-2"].activate();
                break;
            case 1:
                this.Objects["Fire6-1"].activate();
                this.Objects["Fire6-2"].activate();
                this.Objects["Fire7-1"].activate();
                this.Objects["Fire7-2"].activate();
                break;
            case 2:
                this.Objects["Fire7-1"].activate();
                this.Objects["Fire7-2"].activate();
                this.Objects["Fire8-1"].activate();
                this.Objects["Fire8-2"].activate();
        }
    }

    DisableFire() {
        Object.values(this.Objects).forEach(function(Object){
            if(Object && Object.getType() == "Fire") {Object.deactivate();};
        })
    }

    ResetRoom() {
        isMoving = true;
        this.DisableFire();
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
}