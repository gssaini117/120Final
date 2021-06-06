class Menu_Main extends Phaser.Scene {
    constructor() {
        super("Menu_Main");
    }

    preload() {
        if(!EnteredMenu) {
            this.Blackscreen = new Phaser.GameObjects.Rectangle(
                this, 0, 0, game.config.width, game.config.height, 0x000000, 1, 
            ).setOrigin(0,0).setDepth(5);
            this.add.existing(this.Blackscreen);
        }
    }

    create() {
        //=========================================================
        // Loading visuals
        //=========================================================
        // Background sprite
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'Menu_Main'
        ).setOrigin(0, 0).setDepth(0);
        //=========================================================
        // Setting up mouse hitboxes
        //=========================================================
        this.Hitboxes = {
            "Start":    new Boundry(73, 100, 344, 107, "TopL"),
            "Credits":  new Boundry(73, 246, 344, 107, "TopL"),
            "HowTo":    new Boundry(73, 386, 344, 107, "TopL"),
        }
        this.add.existing(this.Hitboxes.Start);
        this.add.existing(this.Hitboxes.Credits);
        this.add.existing(this.Hitboxes.HowTo);

        // Uncomment next line to view hitboxes
        // Debug_Hitbox(this, this.Hitboxes);

        //=========================================================
        // Technical Config
        //=========================================================
        // Sound Config
        this.Select = this.sound.add('Sfx_Select');
        this.Select_Config = {mute: false, volume: 0.5, loop: false, delay: 0};
        this.Click = this.sound.add('Sfx_Click');
        
        // define keys
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        // Locks player inputs
        this.Locked = true;

        // Blackscreen enter
        let Delay = 0;
        if(!EnteredMenu) {
            Delay = FadeIn(this, this.Blackscreen);
            EnteredMenu = true;
        }
        setTimeout(() => {
            this.Locked = false;
        }, Delay); 

        //=========================================================
        // Mouse Hover Behavior
        //=========================================================
        let Scene = this;
        this.input.on('pointerdown', function(pointer){
            let MousePos = {
                'x': pointer.x,
                'y': pointer.y,
                'width': 10,
                'height': 10,
            };
            Object.keys(Scene.Hitboxes).forEach(function(Key){
                let Object = Scene.Hitboxes[Key];
                if(!Scene.Locked && 
                Object.checkCollision(MousePos)) 
                {
                    Scene.Select.play(Scene.Select_Config);
                    switch(Key) {
                        case "Start":
                            Scene.scene.start('Room_Main');
                            break;
                        case "Credits":
                            Scene.scene.start('Menu_Credits');
                            break;
                        case "HowTo":
                            Scene.scene.start('Menu_HowTo');
                    }
                }
            });
         });
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyR) &&
        !this.Locked) {
            Reset_Game();
            this.Click.play();
        }
    }
}