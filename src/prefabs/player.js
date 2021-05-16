class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, Animations, Boundries) {
        super(scene, x, y, texture, frame);

        //Procedural fields
        this.Scene = scene;
        this.Anim_Up = Animations.Up;
        this.Anim_Down = Animations.Down;
        this.Anim_Left = Animations.Left;
        this.Anim_Right = Animations.Right;
        this.Bounds = Boundries;

        //Class fields
        this.MOVEMENT_SPEED = 1.5; //Pixels per update
        this.IsMoving = false; //Used to update animation
        this.Anim_Curr = this.Anim_Down; //Current Animation
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
        if(Phaser.Input.Keyboard.JustUp(keyW) &&
        this.Pressed.W) {   
            this.Pressed.W = false;
            this.Direction.Y += this.MOVEMENT_SPEED;
        }
        if(Phaser.Input.Keyboard.JustUp(keyA) &&
        this.Pressed.A) {
            this.Pressed.A = false;
            this.Direction.X += this.MOVEMENT_SPEED;
        }
        if(Phaser.Input.Keyboard.JustUp(keyS) &&
        this.Pressed.S) {
            this.Pressed.S = false;
            this.Direction.Y -= this.MOVEMENT_SPEED;
        }
        if(Phaser.Input.Keyboard.JustUp(keyD) &&
        this.Pressed.D) {
            this.Pressed.D = false;
            this.Direction.X -= this.MOVEMENT_SPEED;
        }
        //=========================================================
        // Updating Position and Animation
        //=========================================================
        // Moving X
        let Temp = this.x + this.Direction.X;
        //console.log(this.X);
        //console.log(this.Direction.X);
        if(Temp < game.config.width - this.width/3 - this.Bounds.Right &&
        Temp > this.width/3 + this.Bounds.Left) {
            this.x = Temp;
        }
        // Moving Y
        Temp = this.y + this.Direction.Y;
        if(Temp < game.config.height - this.height/2 - this.Bounds.Down&&
        Temp > this.height/2 + this.Bounds.Up) {
            this.y = Temp;
        }
        //Adjusting Animation (X direction has more priority over Y direction)
        if (this.Direction.X != 0) {
            if(this.Direction.X > 0 &&
            this.Anim_Curr != this.Anim_Right) {
                this.stop();
                this.Anim_Curr = this.Anim_Right;
                this.play(this.Anim_Right);
            } else if(this.Direction.X < 0 &&
            this.Anim_Curr != this.Anim_Left) {
                this.stop();
                this.Anim_Curr = this.Anim_Left;
                this.play(this.Anim_Left);
            }
        } else if(this.Direction.Y != 0) {
            if(this.Direction.Y > 0 &&
            this.Anim_Curr != this.Anim_Down) {
                this.stop();
                this.Anim_Curr = this.Anim_Down;
                this.play(this.Anim_Down);
            } else if(this.Direction.Y < 0 &&
            this.Anim_Curr != this.Anim_Up) {
                this.stop();
                this.Anim_Curr = this.Anim_Up;
                this.play(this.Anim_Up);
            }
        } else {
            this.stop();
            switch(this.Anim_Curr) {
                case this.Anim_Up: 
                    this.setFrame(0);
                    break;
                case this.Anim_Down: 
                    this.setFrame(4);
                    break;
                case this.Anim_Left:
                    this.setFrame(8); 
                    break;
                case this.Anim_Right: 
                    this.setFrame(12);
                    break;
            }
            this.Anim_Curr = null;
        }
    }
}