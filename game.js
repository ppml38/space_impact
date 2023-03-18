import {aircraft} from "./aircraft.js";
import {bullet} from "./bullet.js";
import {obstacle} from "./obstacle.js";
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
        this.obstacle_rate = 2000; // new obstacle will be added every 2 seconds.
        this.aircraft = new aircraft();
        this.bullets=[];
        this.obstacles=[];
        this.previous_second = 0;

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
        this.bullets.push(new bullet(this));
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
        this.aircraft.render(this);

        // add a new obstacle like meteor/missile
        /*let current_second = new Date().getSeconds();
        if(Math.abs(current_second-this.previous_second)>2 && Math.random() < 0.5){
            this.obstacles.push(new obstacle(this));
            this.previous_second = current_second;
        }*/

        // set current position for all bullets and obstacles
        this.obstacles = this.obstacles.filter((obstacle)=>{
            return obstacle.render(this);
        });
        this.bullets = this.bullets.filter((bullet)=>{
            return bullet.render(this);
        });

        // if game over. exit.
    }
    addObstacle(){
        this.obstacles.push(new obstacle(this));
    }
    render(){
        // starting the game
        setInterval(()=>{this.run();}, this.canvas_refresh_rate);
        setInterval(()=>{this.addObstacle();}, this.obstacle_rate);
        return this.canvas;
    }
}