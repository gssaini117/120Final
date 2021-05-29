class Fire extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, animation) {
        super(scene, x, y, texture, frame)

        // Procedural Fields
        this.Active_Animation = animation;

        // Class Fields
        this.isActive = false;

        // Size adjustments 
        this.setScale(0.4);
        this.setOrigin(0.5,0.5);

        //Adding object to scene.
        scene.add.existing(this);
    }

    checkCollision(Player) {
        if(!this.isActive) {return false;};
        let player = Player.getHitbox();
        if(Math.abs(this.x - player.x) < (this.width/18 + player.width/2) &&
        Math.abs(this.y - player.y) < (this.height/18 + player.height/2)) {
            return true; 
        } else {
            return false;
        }
    }

    activate() {
        this.isActive = true;
        this.play(this.Active_Animation);
    }

    deactivate() {
        this.isActive = false;
        this.stop(this.Active_Animation);
    }

    getType() { return "Fire"; }
}