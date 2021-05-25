class Boundry extends Phaser.GameObjects.Rectangle {
    //Color defaults to red
    constructor(scene, x, y, width, height, origin, name = "Default") {
        super(scene, x, y, width, height, 0xff0000, 1);

        // Procedural Fields
        this.Origin = origin;
        this.Name = name;

        // Class Fields
        this.isActive = true; // Does not collide if false;
        switch(this.origin) { // Sets the x&y pos to the object's center;
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
            case "TopR":
                this.posX = this.x - this.width/2;
                this.posY = this.y + this.height/2;
                break;
            case "TopL": 
            this.posX = this.x + this.width/2;
                this.posY = this.y + this.height/2;
                break;
            case "BotR":
                this.posX = this.x - this.width/2;
                this.posY = this.y - this.height/2;
                break;
            case "BotL":
                this.posX = this.x + this.width/2;
                this.posY = this.y - this.height/2;
                break;
        }

        //Adding object to scene.
        scene.add.existing(this);
    }

    checkCollision(Player) {
        if(!this.isActive) { return false; };
        if(Math.abs(this.posX - Player.x) < (this.width/2 + Player.width/4) &&
        Math.abs(this.posY - Player.y) < (this.height/2 + Player.height/2)) {
            return true; 
        } else {
            return false;
        }
    }

    setActive(newState) {
        this.isActive = newState;
    }
}