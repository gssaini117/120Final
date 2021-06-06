class Room_West extends Phaser.Scene {
    constructor() {
        super("Room_West");
    }

    preload() {
        //Blackscreen
        this.Blackscreen = new Phaser.GameObjects.Rectangle(
            this, 0, 0, game.config.width, game.config.height, 0x000000, 1, 
          ).setOrigin(0,0).setDepth(5);
          this.add.existing(this.Blackscreen);
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

        // Defining Room Hitboxes
        this.Hitboxes = {
            //Map Boundries
            "Top":     new Boundry(512, 0, 1024, 110, "Top"),
            "Down":    new Boundry(512, 576, 1024, 50, "Bot"),
            "Left":    new Boundry(0, 110, 48, 416, "TopL"),
            "Right1":  new Boundry(1024, 110, 48, 264, "TopR"),
            "Right2":  new Boundry(1024, 374, 0, 102, "TopR"),
            "Right3":  new Boundry(1024, 476, 48, 50, "TopR"),
            //Walls
            "R1":      new Boundry(810, 110, 75, 264, "TopR"),
            "R2":      new Boundry(810, 526, 75, 50, "BotR"),
            "R3":      new Boundry(745, 324, 126, 50, "BotR"),
            "L1":      new Boundry(214, 110, 75, 264, "TopL"),
            "L2":      new Boundry(214, 526, 75, 50, "BotL"),
            "L3":      new Boundry(279, 324, 126, 50, "BotL"),
            //Gates
            "TopR":    new Boundry(986, 200, 186, 50, "TopR"),
            "BotR":    new Boundry(800, 374, 55, 102, "TopR"),
            "TopL":    new Boundry(38, 200, 186, 50, "TopL"),
            "BotL":    new Boundry(224, 374, 55, 102, "TopL"),
            "Center":  new Boundry(405, 324, 214, 50, "BotL"),
            //Rocks
        };

        // Defining interactable movement objects.
        this.Objects = {
            //Movers
            "Main":    new Mover(this, 1000, 420, "Door", 0, "Room_Main").setDepth(10)
        };

        // Managing Gate Placement
        this.Gates = {
            "TopR":    new Gate(this, 0, 0, "Gate_Horizontal", 1, this.Hitboxes["TopR"]).setDepth(1),
            "BotR":    new Gate(this, 0, 0, "Gate_Vertical", 1, this.Hitboxes["BotR"]).setDepth(1),
            "TopL":    new Gate(this, 0, 0, "Gate_Horizontal", 1, this.Hitboxes["TopL"]).setDepth(1),
            "BotL":    new Gate(this, 0, 0, "Gate_Vertical", 1, this.Hitboxes["BotL"]).setDepth(1),
            "Center":  new Gate(this, 0, 0, "Gate_Center", 1, this.Hitboxes["Center"]).setDepth(1),
        }

        // Managing Buttons
        this.Buttons = {
            "Right":        new Button(this, 893, 490, 'Button', 0, 'Center').setDepth(1),
            "RightMid":     new Button(this, 650, 490, 'Button', 0, 'Center').setDepth(1),
            "LeftMid":      new Button(this, 374, 490, 'Button', 0, 'Center').setDepth(1),
            "Left":         new Button(this, 131, 490, 'Button', 0, 'Center').setDepth(1),
            "LeftUpper":    new Button(this, 131, 310, 'Button', 0, 'Center').setDepth(1),
            "Center":       new Button(this, 512, 160, 'Button', 0, 'Center').setDepth(1),
        }

        // Managing Rocks
        this.Held_Rock = ""; // Can only hold one rock at a time.
        this.Rocks = {
            '1':  this.add.tileSprite(893, 300, 150, 150, 'Rock').setOrigin(0.5, 0.5).setDepth(2),
            '2':  this.add.tileSprite(131, 490, 150, 150, 'Rock').setOrigin(0.5, 0.5).setDepth(2),
            '3':  this.add.tileSprite(131, 130, 150, 150, 'Rock').setOrigin(0.5, 0.5).setDepth(2)
        }

        // Adding audio
        this.Move = this.sound.add('Sfx_Walk');
        this.Move_Config = {mute: false, volume: 1, loop: false, delay: 0};
        this.Rumble = this.sound.add('Sfx_Rumble');
        this.Rumble_Config = {mute: false, volume: 1, loop: false, delay: 0};
        this.PickUp = this.sound.add('Sfx_Pickup');
        this.Drop = this.sound.add('Sfx_Set');

        // Comment the next line to make hitboxes invisible.
        // Debug_Hitbox(this, this.Hitboxes);

        //=========================================================
        // Loading visuals
        //=========================================================
        // Player
        this.Player = new Player(
            this, 950, 400, 'Player', 8,
            AnimationIDs.Player,
            this.Hitboxes
        ).setOrigin(0.5, 0.5).setDepth(3);
        
        //Background
        this.background1 = this.add.tileSprite(0,0,1024,576,'BG_West1').setOrigin(0, 0).setDepth(0);
        this.background2 = this.add.tileSprite(0,0,1024,576,'BG_West2').setOrigin(0, 0).setDepth(2);
        this.background3 = this.add.tileSprite(0,0,1024,576,'BG_West3').setOrigin(0, 0).setDepth(4);

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
    
    //=================================================================================
    // UPDATE
    //=================================================================================
    update() {
        this.Player.update();
        let Scene = this;
        let Hitbox = this.Player.getHitbox();
        //=========================================================
        // Depth Behavior
        //=========================================================
        if(Hitbox.y > 324) {this.background2.setDepth(2)} else {this.background2.setDepth(4)}

        //=========================================================
        // Player Collision Detection
        //=========================================================
        Object.values(this.Objects).forEach(function(Object){
            if(!isMoving && 
            Object.checkCollision(Hitbox)) 
            {
                switch(Object.getType()) {
                    case "Mover":
                        isMoving = true;
                        Prev_Room = "Room_West";
                        let Delay = FadeOut(Scene, Scene.Blackscreen);
                        Scene.Move.play(Scene.Move_Config);
                        setTimeout(() => {
                            Scene.Move.stop();
                            Scene.scene.start(Object.getTarget());
                        }, Delay);      
                        break;
                    case "Shard":
                        Shard_Count++;
                        Obtained_Shard.West = true;
                        Scene.Objects.Shard.destroy();
                        delete(Scene.Objects.Shard);
                        Scene.Rumble.play(Scene.Rumble_Config);
                        UpdateMusic();
                }
                return;
            }
        });

        //=========================================================
        // Buttons Collision Detection
        //=========================================================
        Object.values(this.Buttons).forEach(function(Button){
            // Player
            let Hitbox = Scene.Player.getHitbox();
            if(Button.checkCollision(Hitbox)) {
                Button.addObject("Player");
            } else {
                Button.removeObject("Player");
            }
            // Rocks
            Object.keys(Scene.Rocks).forEach(function(Key){
                let Rock = Scene.Rocks[Key];
                if(Button.checkCollision(Rock)) {
                    Button.addObject(Key);
                } else {
                    Button.removeObject(Key);
                }
            });
        });

        //=========================================================
        // Updating gate states
        //=========================================================
        // BOTTOM RIGHT GATE
        if(this.Buttons["Right"].isActive() ||
        this.Buttons["RightMid"].isActive()) {
            this.Gates["BotR"].open();
        } else {
            this.Gates["BotR"].close();
        }
        //BOTTOM LEFT GATE
        if(this.Buttons["Left"].isActive() ||
        this.Buttons["LeftMid"].isActive()) {
            this.Gates["BotL"].open();
        } else {
            this.Gates["BotL"].close();
        }
        //TOP RIGHT GATE
        if(this.Buttons["Center"].isActive()) {
            this.Gates["TopR"].open();
        } else {
            this.Gates["TopR"].close();
        }

        //TOP LEFT GATE
        if(this.Buttons["LeftUpper"].isActive()) {
            this.Gates["TopL"].open();
        } else {
            this.Gates["TopL"].close();
        }

        //CENTER GATE
        if(this.Buttons["LeftMid"].isActive() &&
        this.Buttons["RightMid"].isActive()) {
            this.Gates["Center"].open();
        } else {
            this.Gates["Center"].close();
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            if(this.Held_Rock != "") {
                this.SetRock();
            } else {
                this.GetRock();
            }
        }
    }

    //=================================================================================
    // SCENE FUNCTIONS
    //=================================================================================
    //Moving Rocks
    GetRock() {
        //Locating closest rock.
        let Hitbox = this.Player.getHitbox();
        let Scene = this;
        let ClosestDist = 2000;
        let ClosestKey = '1';
        let Closest = this.Rocks[1];
        Object.keys(this.Rocks).forEach(function(Key){
            let Rock = Scene.Rocks[Key];
            let DistX = Math.abs(Hitbox.x - Rock.x);
            let DistY = Math.abs(Hitbox.y - Rock.y);
            let Dist = Math.sqrt(Math.pow(DistX, 2) + Math.pow(DistY, 2));
            if(Dist < ClosestDist) {
                ClosestDist = Dist; 
                Closest = Scene.Rocks[Key]
                ClosestKey = Key;
            }
        });
        if(this.Player.checkCollision(Closest)) {
            this.Held_Rock = ClosestKey;
            this.Rocks[ClosestKey].x = -50;
            this.Rocks[ClosestKey].y = -50;
            this.Rocks[ClosestKey].setAlpha(0); 
            this.PickUp.play();
        }
    }

    SetRock(){
        let Offset = {};
        let Hitbox = this.Player.getHitbox();
        switch(this.Player.getDirection()) {
            case "Up":
                Offset.x = 0;
                Offset.y = -40;
                break;
            case "Down":
                Offset.x = 0;
                Offset.y = 40;
                break;
            case "Left":
                Offset.x = -40;
                Offset.y = 0;
                break;
            case "Right":
                Offset.x = 40;
                Offset.y = 0;
        }
        let Success = true;
        let Scene = this;
        Object.values(this.Hitboxes).forEach(function(Object){
            if(Object.checkCollision(Scene.Rocks[Scene.Held_Rock])) {
                Success = false;
                return false;
            }
        })
        if(Success) {
            this.Drop.play();
            this.Rocks[this.Held_Rock].x = Hitbox.x + Offset.x;
            this.Rocks[this.Held_Rock].y = Hitbox.y + Offset.y;
            this.Rocks[this.Held_Rock].setAlpha(1);
            this.Held_Rock = "";
        }
    }
}