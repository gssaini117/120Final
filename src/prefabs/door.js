class Door extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, nextscene) {
        super(scene, x, y, texture, frame)

        // Procedural Fields
        this.Scene = scene;
        this.nextScene = nextscene;

        //Adding object to scene.
        scene.add.existing(this);
    }

    checkCollision(player) {
        if(Math.abs(this.x - player.x) < (this.width/2 + player.width/2)) {
            return true;
        } else if(Math.abs(this.y - player.y) < (this.height/2 + player.height/2)) {
            return true;
        } else {
            return false;
        }
    }
}