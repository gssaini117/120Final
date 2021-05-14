class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, Animations) {
        super(scene, x, y, texture, frame);

        //Procedural fields
        this.Anim_Up = Animations.Up;
        this.Anim_Down = Animations.Down;
        this.Anim_Left = Animations.Left;
        this.Anim_Right = Animations.Right;

        //Class fields
        this.MOVEMENT_SPEED = 6; //Pixels per update
        this.IsMoving = false; //Used to update animation
        this.Anim_Curr = null; //Current Animation
        this.Direction = { //Movement Direction
            "X": 0,
            "Y": 0
        }
        this.Pressed = { //Checks if pressed before release
            "W": false,
            "A": false,
            "S": false,
            "D": false
        }

        //Adding object to scene.
        scene.add.existing(this);
    }

    update() {
        //=========================================================
        // Detecting input
        //=========================================================
        //KeyDown
        if(Phaser.Input.Keyboard.JustDown(keyW) &&
        !this.Pressed.W) {   
            this.Pressed.W = true;
            this.Direction.Y -= this.MOVEMENT_SPEED;
        }
        if(Phaser.Input.Keyboard.JustDown(keyA) &&
        !this.Pressed.A) {
            this.Pressed.A = true;
            this.Direction.X -= this.MOVEMENT_SPEED;
        }
        if(Phaser.Input.Keyboard.JustDown(keyS) &&
        !this.Pressed.S) {
            this.Pressed.S = true;
            this.Direction.Y += this.MOVEMENT_SPEED;
        }
        if(Phaser.Input.Keyboard.JustDown(keyD) &&
        !this.Pressed.D) {
            this.Pressed.D = true;
            this.Direction.X += this.MOVEMENT_SPEED;
        }
        //KeyUp
        if(Phaser.Input.Keyboard.JustDown(keyW) &&
        this.Pressed.W) {   
            this.Pressed.W = false;
            this.Direction.Y += this.MOVEMENT_SPEED;
        }
        if(Phaser.Input.Keyboard.JustDown(keyA) &&
        this.Pressed.A) {
            this.Pressed.A = false;
            this.Direction.X += this.MOVEMENT_SPEED;
        }
        if(Phaser.Input.Keyboard.JustDown(keyS) &&
        this.Pressed.S) {
            this.Pressed.S = false;
            this.Direction.Y -= this.MOVEMENT_SPEED;
        }
        if(Phaser.Input.Keyboard.JustDown(keyD) &&
        this.Pressed.D) {
            this.Pressed.D = false;
            this.Direction.X -= this.MOVEMENT_SPEED;
        }
        //=========================================================
        // Updating Position and Animation
        //=========================================================
        // Moving X
        let Temp = this.X += this.Direction.X;
        if(Temp < game.config.width &&
        Temp > 0) {
            this.X = Temp;
        }
        // Moving Y
        Temp = this.Y += this.Direction.Y;
        if(Temp < game.config.height &&
        Temp > 0) {
            this.Y = Temp;
        }
        //Adjusting Animation;
        //Implement later
    }



}