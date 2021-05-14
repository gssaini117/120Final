class Menu_Main extends Phaser.Scene {
    constructor() {
        super("Menu_Main");
    }

    preload() {

    }

    create() {

    }

    update() {
        this.scene.start('Room_Main');
    }
}