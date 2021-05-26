class Boundry{
    //Color defaults to red
    constructor(xPos, yPos, Width, Height, Origin, Name = "Default") {
        
        //Procedural Fields
        this.height = Height;
        this.width = Width;
        this.name = Name;
        this.x = xPos;
        this.y = yPos;

        //Class Fields
        this.isActive = true; // Does not collide if false;

        //Adjusting Position
        adjustPos(this, Origin);
    }

    //=========================================================
    // Class Functions
    //=========================================================
    //Should only be called by main adjustPos().
    adjustPos(XOffset, YOffset) {
        this.x += XOffset;
        this.y += YOffset;
    }

    //Used to check for player collision.
    checkCollision(Player) {
        if(!this.isActive) { return false; };
        if(Math.abs(this.x - Player.x) < (this.width/2 + Player.width/4) &&
        Math.abs(this.y - Player.y) < (this.height/2 + Player.height/2)) {
            return true; 
        } else {
            return false;
        }
    }
    //=========================================================
    // Getters and Setters
    //=========================================================
    //Used for debug purposes.
    getStats() {
        let Stats = {
            "name":     this.name,
            "x":        this.x,
            "y":        this.y,
            "width":    this.width,
            "height":   this.height
        };
        return Stats;
    }
    //Returns the position.
    getSize() {return{"width": this.width, "height": this.height};}

    //Toggles if the the boundry is ignored.
    setActive(newState) {
        this.isActive = newState;
    }
}