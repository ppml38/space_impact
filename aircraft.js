export class aircraft{
    constructor(){
        this.x = 20;
        this.y = 100;
        this.height = 50;
        this.width = 50;
    }
    render(game){
        if(game.up_key_pressed){
            this.y = this.y - 2;
        }
        if(game.down_key_pressed){
            this.y = this.y + 2;
        }
        return new Path2D(`M${this.x} ${this.y} h ${this.width} v ${this.height} h -${this.width} Z`);
    }
}