class Boundry{
    //Color defaults to red
    constructor(x, y, width, height, origin, name = "Default") {

        // Procedural Fields
        this.Height = height;
        this.Width = width;
        this.Origin = origin;
        this.Name = name;

        // Class Fields
        this.isActive = true; // Does not collide if false;
        switch(this.Origin) { // Sets the x&y pos to the object's center;
            case "Center":
                this.PosX = x;
                this.PosY = y;
                break;
            case "Top":
                this.PosX = x;
                this.PosY = y + height/2;
                break;
            case "Bot":
                this.PosX = x;
                this.PosY = y - height/2;
                break;
            case "Left":
                this.PosX = x + width/2;
                this.PosY = y;
                break;
            case "Right":
                this.PosX = x - width/2;
                this.PosY = y;
                break;
            case "TopR":
                this.PosX = x - width/2;
                this.PosY = y + height/2;
                break;
            case "TopL": 
                this.PosX = x + width/2;
                this.PosY = y + height/2;
                break;
            case "BotR":
                this.PosX = x - width/2;
                this.PosY = y - height/2;
                break;
            case "BotL":
                this.PosX = x + width/2;
                this.PosY = y - height/2;
                break;
        }
    }

    checkCollision(Player) {
        if(!this.isActive) { return false; };
        if(Math.abs(this.PosX - Player.x) < (this.Width/2 + Player.width/4) &&
        Math.abs(this.PosY - Player.y) < (this.Height/2 + Player.height/2)) {
            console.log("Hit!");
            return true; 
        } else {
            return false;
        }
    }

    getStats() {
        let Stats = {
            "name":     this.Name,
            "x":        this.PosX,
            "y":        this.PosY,
            "width":    this.Width,
            "height":   this.Height,
            "origin":   this.Origin
        };
        return Stats;
    }

    setActive(newState) {
        this.isActive = newState;
    }
}