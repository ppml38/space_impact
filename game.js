import {aircraft} from "./aircraft.js";
export class game{
    constructor(){
        // game view
        this.canvas = document.createElement("canvas");
        this.canvas_height = 300;
        this.canvas_width = 300;
        this.canvas.height = this.canvas_height;
        this.canvas.width = this.canvas_width;
        this.ctx = this.canvas.getContext("2d");


        // game states and constants
        this.up_key_pressed = false;
        this.down_key_pressed = false;
        this.space_key_pressed = false;
        this.canvas_refresh_rate = 10; // one frame for 10ms i.e 100 frames/second
        this.aircraft = new aircraft();
        this.bullets=[
        ];

        // adding event listeners for user input
        document.onkeydown = (event)=>{
            let e=event||window.event;
            if (e.keyCode == '38') {
                this.up_key_pressed = true;
            }
            else if (e.keyCode == '40') {
                this.down_key_pressed = true;
            }
            else if (e.keyCode == '32') {
                this.shoot();
            }
        }
        document.onkeyup = (event)=>{
            let e=event||window.event;
            if (e.keyCode == '38') {
                this.up_key_pressed = false;
            }
            else if (e.keyCode == '40') {
                this.down_key_pressed = false;
            }
        }

    }
    shoot(){
    }
    getBackground(){

    }
    run(){
        /*
            Method that gets executed once per canvas refresh rate and updates canvas with latest view
        */
        // clear canvas for redrawing
        this.ctx.clearRect(0,0,this.canvas_width, this.canvas_height);

        // set background
        //this.ctx.fill(this.getBackground());

        // set spacecraft position
        this.ctx.fill(this.aircraft.render(this));

        // add a new bullet
        // set current position for all bullets
        // if game over. exit.
    }
    render(){
        // starting the game
        setInterval(()=>{this.run();}, this.canvas_refresh_rate);
        return this.canvas;
    }
}