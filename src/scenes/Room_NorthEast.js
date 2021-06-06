class Room_NorthEast extends Phaser.Scene {
    constructor() {
        super("Room_NorthEast");
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
            "Up":       new Boundry(512, 0, 1024, 100, "Top"),
            "Down1":    new Boundry(0, 576, 54, 60, "BotL"),
            "Down2":    new Boundry(1024, 576, 854, 60, "BotR"),
            "Left":     new Boundry(0, 100, 40, 416, "TopL"),
            "Right":    new Boundry(1024, 100, 40, 416, "TopR"),
            //Interior Boundries
            "TopLeft":   new Boundry(158, 100, 56, 38, "Top"),
            "TopMid":    new Boundry(582, 100, 56, 90, "Top"),
            "TopRight":  new Boundry(853, 100, 56, 38, "Top"),
            "LeftIn":    new Boundry(40, 350, 378, 20, "BotL"),
            "BotLeft":   new Boundry(170, 516, 34, 70, "BotL"),
            "BotRight":  new Boundry(604, 516, 54, 190, "Bot"),
            //Island Boundries
            "Chair1":   new Boundry(444, 150, 153, 20, "TopR"),
            "Chair2":   new Boundry(291, 170, 54, 72, "TopL"),
            "Chair3":   new Boundry(444, 242, 280, 20, "TopR"),
            "Dash":     new Boundry(278, 414, 200, 20, "TopL"),
            "C1":       new Boundry(631, 394, 126, 20, "BotL"),
            "C2":       new Boundry(714, 410, 43, 16, "BotL"),
            "C3":       new Boundry(714, 430, 168, 20, "BotL"),
            "C4":       new Boundry(882, 410, 64, 174, "BotR"),
            "C5":       new Boundry(832, 256, 150, 20, "BotR"),
            "C6":       new Boundry(682, 236, 56, 44, "BotL"),
        };

        // Defining interactable movement objects.
        this.Objects = {
            //Movers
            "Main":    new Mover(this, 113, 540, "Door", 0, "Room_Main").setDepth(10)
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
            this, 113, 400, 'Player', 16,
            AnimationIDs.Player,
            this.Hitboxes
        ).setOrigin(0.5, 0.5).setDepth(2);

        //Backgrounds
        this.Backgrounds = {
            1: this.add.tileSprite(0,0,1024,576,'BG_NorthEast1').setOrigin(0, 0).setDepth(0),
            2: this.add.tileSprite(0,0,1024,576,'BG_NorthEast2').setOrigin(0, 0).setDepth(4),
            3: this.add.tileSprite(0,0,1024,576,'BG_NorthEast3').setOrigin(0, 0).setDepth(3),
            4: this.add.tileSprite(0,0,1024,576,'BG_NorthEast4').setOrigin(0, 0).setDepth(3),
            5: this.add.tileSprite(0,0,1024,576,'BG_NorthEast5').setOrigin(0, 0).setDepth(3),
            6: this.add.tileSprite(0,0,1024,576,'BG_NorthEast6').setOrigin(0, 0).setDepth(3),
            7: this.add.tileSprite(0,0,1024,576,'BG_NorthEast7').setOrigin(0, 0).setDepth(3),
            8: this.add.tileSprite(0,0,1024,576,'BG_NorthEast8').setOrigin(0, 0).setDepth(4),
            9: this.add.tileSprite(0,0,1024,576,'BG_NorthEast9').setOrigin(0, 0).setDepth(3),
            10:this.add.tileSprite(0,0,1024,576,'BG_NorthEast10').setOrigin(0, 0).setDepth(4),
        }

        //Darkness
        let Alpha;
        if(Obtained_Shard.NorthEast) {Alpha = 0;} else {Alpha = 1;}
        this.Darkness = this.add.sprite(
            this.Player.x, this.Player.y, "Darkness"
        ).setOrigin(0.5, 0.5).setDepth(10).setAlpha(Alpha).setScale(1.4);

        //Shard
        if(!Obtained_Shard.NorthEast) {
            this.Objects.Shard = new Shard(this, 668, 410, 'Shard4', 0)
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
        let Scene = this;
        let Hitbox = this.Player.getHitbox();
        //=========================================================
        // Wall Depth Behavior
        //=========================================================
        if(Hitbox.y > 434) {this.Backgrounds[3].setDepth(1)} else {this.Backgrounds[3].setDepth(3)}
        if(Hitbox.y > 350) {this.Backgrounds[4].setDepth(1)} else {this.Backgrounds[4].setDepth(3)}
        if(Hitbox.y > 242) {this.Backgrounds[5].setDepth(1)} else {this.Backgrounds[5].setDepth(3)}
        if(Hitbox.y > 150) {this.Backgrounds[6].setDepth(1)} else {this.Backgrounds[6].setDepth(3)}
        if((Hitbox.y > 430 && Hitbox.x > 714) ||
        (Hitbox.y > 394 && Hitbox.x < 714)) {
            this.Backgrounds[7].setDepth(1);
        } else {
            this.Backgrounds[7].setDepth(3);
        }
        if(Hitbox.y > 256) {this.Backgrounds[9].setDepth(1)} else {this.Backgrounds[9].setDepth(3)}

        //=========================================================
        // Object Collision
        //=========================================================
        Object.values(this.Objects).forEach(function(Object){
            if(!isMoving && 
            Object.checkCollision(Hitbox)) 
            {
                switch(Object.getType()) {
                    case "Mover":
                        isMoving = true;
                        Prev_Room = "Room_NorthEast";
                        let Delay = FadeOut(Scene, Scene.Blackscreen);
                        Scene.Move.play(Scene.Move_Config);
                        setTimeout(() => {
                            Scene.Move.stop();
                            Scene.scene.start(Object.getTarget());
                        }, Delay);      
                        break;
                    case "Shard":
                        Shard_Count++;
                        Obtained_Shard.NorthEast = true;
                        Scene.Objects.Shard.destroy();
                        delete(Scene.Objects.Shard);
                        Scene.Rumble.play(Scene.Rumble_Config);
                        Scene.FadeDarkness();
                        UpdateMusic();
                }
                return;
            }
        });
        //=========================================================
        // Dark Mist
        //=========================================================
        this.Darkness.x = this.Player.x;
        this.Darkness.y = this.Player.y;
    }

    FadeDarkness() {
        this.tweens.add({ //Alpha from 0 to 1
            targets: this.Darkness,
            scaleX: 20,
            scaleY: 20,
            alpha: 0,
            duration: 800
        });

    }
}