class Menu_Main extends Phaser.Scene {
    constructor() {
        super("Menu_Main");
    }

    preload() {
        // load background
        this.preload.image('menuBackground', './assets/menu_main_noname.png');

        // load audio
        this.preload.audio('Sfx_Select', './assets/menu_option_click.wav');
    }

    create() {
        this.background = this.add.tileSprite(
            0, 0, 1024, 576, 'menuBackground'
        ).setOrigin(0, 0).setDepth(0);

        // Sound Config
        this.Select = this.sound.add('Sfx_Select');
        this.Select_Config = {mute: false, volume: 0.5, loop: false, delay: 0};

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keySpace)) {
            this.Select.play(this.Select_Config);
            this.scene.start('Preload');
        }
        if (Phaser.Input.Keyboard.JustDown(keyH)) {
            this.Select.play(this.Select_Config);
            this.scene.start('Menu_HowTo');
        }
        if (Phaser.Input.Keyboard.JustDown(keyC)) {
            this.Select.play(this.Select_Config);
            this.scene.start('Menu_Credits');
        }
    }
}