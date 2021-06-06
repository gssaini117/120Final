class Button extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, origin, Start_State) {
        super(scene, x, y, texture, frame)

        // Procedural Fields
        this.Scene = scene;
        this.Curr_State = Start_State;

        // Class Fields
        this.Objects = {}; // Objects that are resting ontop of the button.
        this.ObjectsCount = 0;
        this.Click_Config = {mute: false, volume: 0.4, loop: false, delay: 0};

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
    updateState() {
        if(this.ObjectsCount > 0) {
            this.setFrame(1);
            console.log(this.Curr_State);
            if(!this.Curr_State) {
                this.Curr_State = true;
                this.Scene.Sfx_Button.play();
            }
        } else {
            this.setFrame(0);
            if(this.Curr_State) {
                this.Curr_State = false;
                this.Scene.Sfx_Button.play();
            }
        }
    }
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