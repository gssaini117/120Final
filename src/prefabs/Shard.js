class Shard extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        // Procedural Fields
        // None at the moment.

        // Class Fields
        // None

        //Postload adjustments
        this.setOrigin(0.5, 0.5);
        this.height = this.height/2;
        this.width = this.width/2;
        this.setScale(0.5);

        //Adding object to scene.
        scene.add.existing(this);
    }

    checkCollision(player) {
        if(Math.abs(this.x - player.x) < (this.width/2 + player.width/2) &&
        Math.abs(this.y - player.y) < (this.height/2 + player.height/2)) {
            return true; 
        } else {
            return false;
        }
    }
}