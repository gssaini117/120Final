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
        
    }
    
    openDoor() {
        this.scene.start(nextScene);
    }
}