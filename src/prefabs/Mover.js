class Mover extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, targetScene, origin = "Center") {
        super(scene, x, y, texture, frame);

        //Procedural fields
        this.Target = targetScene;

        //Class fields
        this.Width = 60;
        this.Height = 60;

        //Adjusting Position
        adjustPos(this, origin);

        //Adding object to scene.
        scene.add.existing(this);
    }

    //=========================================================
    // Class Functions
    //=========================================================
    //Should only be called by main adjustPos().
    adjustPos(XOffset, YOffset) {
        this.x += XOffset;
        this.y += YOffset;
    }

    //Returns true if colliding with the Player
    //Assumes object2 is another sprite
    checkCollision(Player) {
        if(Math.abs(this.x - Player.x) < (this.Width/2 + Player.width/4) &&
        Math.abs(this.y - Player.y) < (this.Height/2 + Player.height/2)) {
            return true;
        } else {
            return false;
        }
    }

    //=========================================================
    // Getters and Setters
    //=========================================================
    //Helps the game indicate that the object is a mover.
    getType() { return "Mover"; }

    //Returns the target scene *String*
    getTarget() { return this.Target; }

    //Returns the position.
    getSize() {return{"width": this.width, "height": this.height};}
}