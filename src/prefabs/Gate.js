class Gate extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, hitbox) {
        super(scene, x, y, texture, frame)

        // Procedural Fields
        this.Hitbox = hitbox; //Boundry Object

        // Class Fields
        // None at the moment
        
        // Adjusting Position
        let Stats = this.Hitbox.getStats();
        switch(texture) {
            case "Gate_Center":
                this.x = Stats.x;
                this.y = Stats.y -40;     
                break;
            case "Gate_Horizontal":
                this.x = Stats.x;
                this.y = Stats.y -20;   
                break;
            case "Gate_Vertical":
                this.x = Stats.x + 7;
                this.y = Stats.y - 20;   
        }

        //Adding object to scene.
        scene.add.existing(this);
    }

    open() {
        this.Hitbox.setIsActive(false);
        this.setFrame(0);
    }

    close() {
        this.Hitbox.setIsActive(true);
        this.setFrame(1);
    }

    getType() { return "Gate"; }
}