class Room_Main extends Phaser.Scene {
    constructor() {
        super("Room_Main");
    }

    preload() {

    }

    create() {
        let Anims = {
            "Up":       "Player_Up",
            "Down":     "Player_Down",
            "Left":     "Player_Left",
            "Right":    "Player_Right",
        };
        this.Player = new Player(
            this, 
            game.config.width /2,
            game.config.height/2, 
            'Player', 0,
            Anims
        ).setOrigin(0.5, 0.5);

         // Defining keys.
         console.log("Keys Defined");
         keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
         keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
         keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
         keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        this.Player.update();
    }
}