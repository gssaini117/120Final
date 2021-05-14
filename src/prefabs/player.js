class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //Procedural fields
        //none atm

        //Class fields
        //none atm

        //Adding object to scene.
        scene.add.existing(this);
    }
}