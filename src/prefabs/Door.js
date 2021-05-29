class Door extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, Hitbox) {
        super(scene, x, y, texture, frame)

        // Procedural Fields
        this.Hitbox = Hitbox; //Boundry Object

        // Class Fields
        this.isActive = false;

        //Adding object to scene.
        scene.add.existing(this);
    }

    checkCollision(Player) {
        if(!this.isActive) {return false;};
        if(Math.abs(this.Hitbox.x - Player.x) < (this.Hitbox.width/2 + Player.width/2) &&
        Math.abs(this.Hitbox.y - Player.y) < (this.Hitbox.height/2 + Player.height/2)) {
            return true; 
        } else {
            return false;
        }
    }

    open() {

    }

    close() {

    }

    getType() { return this.Hitbox.getType(); }
}