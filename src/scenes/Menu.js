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
        // Start Hitbox
        this.Start = new Phaser.GameObjects.Rectangle(
            this, 73, 100, 344, 107, 0xffffff, 1, 
        ).setOrigin(0,0).setDepth(1).setAlpha(0.5);
        this.add.existing(this.Start);
        // Credits Hitbox
        this.Credits = new Phaser.GameObjects.Rectangle(
            this, 73, 246, 344, 107, 0xffffff, 1, 
        ).setOrigin(0,0).setDepth(1).setAlpha(0.5);
        this.add.existing(this.Credits);
        // HowTo Hitbox
        this.HowTo = new Phaser.GameObjects.Rectangle(
            this, 73, 386, 344, 107, 0xffffff, 1, 
        ).setOrigin(0,0).setDepth(1).setAlpha(0.5);
        this.add.existing(this.HowTo);

        //=========================================================
        // Technical Config
        //=========================================================
        // Sound Config
        this.Select = this.sound.add('Sfx_Select');
        this.Select_Config = {mute: false, volume: 0.5, loop: false, delay: 0};
        this.Click = this.sound.add('Sfx_Click');
        
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
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
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySPACE) &&
        !this.Locked) {
            this.Select.play(this.Select_Config);
            EnteredMenu = false;
            this.scene.start('Room_Main');
        }
        if (Phaser.Input.Keyboard.JustDown(keyH) &&
        !this.Locked) {
            this.Select.play(this.Select_Config);
            this.scene.start('Menu_HowTo');
        }
        if (Phaser.Input.Keyboard.JustDown(keyC) &&
        !this.Locked) {
            this.Select.play(this.Select_Config);
            this.scene.start('Menu_Credits');
        }
        if (Phaser.Input.Keyboard.JustDown(keyR) &&
        !this.Locked) {
            Reset_Game();
            this.Click.play();
        }
    }
}