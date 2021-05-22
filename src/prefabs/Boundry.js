class Boundry extends Phaser.GameObjects.Rectangle {
    //Color defaults to red
    constructor(scene, x, y, width, height, Origin) {
        super(scene, x, y, width, height, 0xff0000, 1);

        // Procedural Fields
        this.origin = Origin;

        // Class Fields
        switch(this.origin) {
            case "Top":
                this.posX = this.x;
                this.posY = this.y + this.height/2;
                break;
            case "Bot":
                this.posX = this.x;
                this.posY = this.y - this.height/2;
                break;
            case "Left":
                this.posX = this.x + this.width/2;
                this.posY = this.y;
                break;
            case "Right":
                this.posX = this.x - this.width/2;
                this.posY = this.y;
                break;

        }

        //Adding object to scene.
        scene.add.existing(this);
    }

    checkCollision(Player) {
        if(Math.abs(this.posX - Player.x) < (this.width/2 + Player.width/4) &&
        Math.abs(this.posY - Player.y) < (this.height/2 + Player.height/2)) {
            return true; 
        } else {
            return false;
        }
    }
}