class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, origin) {
        super(scene, x, y, texture, frame)

        // Procedural Fields
        // None at the moment

        // Class Fields
        this.Objects = {}; // Objects that are resting ontop of the button.
        this.ObjectsCount = 0;

        // Adjusting position
        adjustPos(this, origin);

        //Adding object to scene.
        scene.add.existing(this);
    }

    //Used to check for object collision.
    checkCollision(Object) {
        if(Math.abs(this.x - Object.x) < (this.width/2 + Object.width/2) &&
        Math.abs(this.y - Object.y) < (this.height/2 + Object.height/2)) {
            return true; 
        } else {
            return false;
        }
    }

    addObject(Target) {
        if(!this.Objects[Target]) {
            this.Objects[Target] = true;
            this.ObjectsCount++;
            this.updateState();
        }
    }

    removeObject(Target) {
        if(this.Objects[Target]) {
            delete(this.Objects[Target]);
            this.ObjectsCount--;
            this.updateState();
        }
    }

    //Updates the color of the buttons to reflect if its active or not.
    updateState() {if(this.ObjectsCount > 0) {this.setFrame(1)} else {this.setFrame(0)};}

    getSize() {
        return {
            "height":   this.height,
            "width":    this.width
        }
    }

    getType() { return "Button"; }

    isActive() {
        return this.ObjectsCount > 0;
    }

    adjustPos(addX, addY) {
        this.x += addX;
        this.y += addY;
    }
}