class Mover extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, targetScene) {
        super(scene, x, y, texture, frame);

        //Procedural fields
        this.Target = targetScene;

        //Class fields
        //None

        //Adding object to scene.
        scene.add.existing(this);
    }

    //Returns true if colliding with object 2
    //Assumes object2 is another sprite
    checkCollision(object2) {
        if(Math.abs(this.x - object2.x) < (this.width/2 + object2.width/2)) {
            return true;
        } else if(Math.abs(this.y - object2.y) < (this.height/2 + object2.height/2)) {
            return true;
        }
        return false;
    }

    //Returns the target scene *String*
    getTarget() { return this.Target; }
}