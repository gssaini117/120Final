class Menu_GameOver extends Phaser.Scene {
    constructor() {
        super("Menu_GameOver");
    }

    preload() {

    }

    create() {
        //Menu Behavior
        if(Shard_Count == 4) {
            this.background = this.add.tileSprite(
                0, 0, 1024, 576, 'Menu_Ending2'
            ).setOrigin(0, 0).setDepth(0);
    
        } else {
            this.background = this.add.tileSprite(
                0, 0, 1024, 576, 'Menu_Ending1'
            ).setOrigin(0, 0).setDepth(0);
            keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        
            //Sound config
            this.Select = this.sound.add('Sfx_Select');
            this.Select_Config = {mute: false, volume: 0.5, loop: false, delay: 0};
        }
    }

    update() {
        if (Shard_Count != 4 &&
        Phaser.Input.Keyboard.JustDown(keyESC)) {
            this.Select.play(this.Select_Config);
            this.scene.start('Menu_Main');
        }
    }
}