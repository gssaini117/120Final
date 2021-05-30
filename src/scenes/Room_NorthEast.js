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
            "TopLeft":   new Boundry(141, 100, 32, 38, "TopL"),
            "TopMid":    new Boundry(565, 100, 33, 90, "TopL"),
            "TopRight":  new Boundry(836, 100, 33, 38, "TopL"),
            "LeftIn":    new Boundry(40, 350, 378, 20, "BotL"),
            "BotLeft":   new Boundry(170, 516, 34, 70, "BotL"),
            "BotRight":  new Boundry(587, 516, 34, 190, "BotL"),
            //Island Boundries
            "Chair1":   new Boundry(444, 150, 140, 20, "TopR"),
            "Chair2":   new Boundry(304, 170, 28, 72, "TopL"),
            "Chair3":   new Boundry(444, 242, 280, 20, "TopR"),
            "Dash":     new Boundry(278, 414, 200, 20, "TopL"),
            "C1":       new Boundry(621, 394, 122, 20, "BotL"),
            "C2":       new Boundry(714, 410, 29, 16, "BotL"),
            "C3":       new Boundry(714, 430, 154, 20, "BotL"),
            "C4":       new Boundry(868, 410, 36, 174, "BotR"),
            "C5":       new Boundry(832, 256, 138, 20, "BotR"),
            "C6":       new Boundry(694, 236, 32, 44, "BotL"),
        };

        // Defining interactable movement objects.
        this.Objects = {
            //Movers
            "Main":    new Mover(this, 113, 540, "Door", 0, "Room_Main").setDepth(10)
        };

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

        //Background
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'BG_NorthEast1'
        ).setOrigin(0, 0).setDepth(0);

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
                        Prev_Room = "Room_NorthEast";
                        let Delay = FadeOut(Scene, Scene.Blackscreen);
                        setTimeout(() => {
                            Scene.scene.start(Object.getTarget());
                        }, Delay);      
                        break;
                    case "Shard":
                        Shard_Count++;
                        Obtained_Shard.NorthEast = true;
                        Scene.Objects.Shard.destroy();
                        delete(Scene.Objects.Shard);
                        Scene.FadeDarkness();
                }
                return;
            }
        });
        //Dark Mist
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