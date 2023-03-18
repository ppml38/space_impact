import {aircraft} from "./aircraft.js";
import {bullet} from "./bullet.js";
import {obstacle} from "./obstacle.js";
class defaultdict {
  constructor(defaultVal) {
    return new Proxy({}, {
      get: (target, name) => name in target ? target[name] : defaultVal
    })
  }
}
export class game{
    constructor(){
        // game view
        this.canvas = document.createElement("canvas");
        this.canvas_height = 600;
        this.canvas_width = 1200;
        this.canvas.height = this.canvas_height;
        this.canvas.width = this.canvas_width;
        this.ctx = this.canvas.getContext("2d");
        this.launch_sound = new Audio("./launch.wav");
        this.launch_sound.preload = 'auto';
        this.launch_sound.load();


        // game states and constants
        this.up_key_pressed = false;
        this.down_key_pressed = false;
        this.space_key_pressed = false;
        this.canvas_refresh_rate = 10; // one frame for 10ms i.e 100 frames/second
        this.obstacle_rate = 1000; // new obstacle will be added every 2 seconds.
        this.aircraft = new aircraft();
        this.bullets=[];
        this.obstacles=[];
        this.previous_second = 0;
        this.crossoverMap=new defaultdict([]);// map that tracks bullets with obstacle on same y axis path {bullet.y: obstacle}

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
                if(this.space_key_pressed===false){
                    this.space_key_pressed = true;
                    this.shoot();
                    this.space_key_pressed = false;
                }
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
    playLaunchSound() {
      var click=this.launch_sound.cloneNode();
      click.play();
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

        // set current position for all bullets and obstacles
        this.bullets = this.bullets.filter((bullet)=>{
            return bullet.render(this);
        });
        this.obstacles = this.obstacles.filter((obstacle)=>{
            return obstacle.render(this);
        });

        // if game over. exit.
    }
    shoot(){
        let new_bullet = new bullet(this);
        this.obstacles.map((obs)=>{
            if(new_bullet.onThePath(obs)===true){
                this.crossoverMap[new_bullet.y].push(obs);
                //console.log("added to map");
                //console.log(this.crossoverMap[new_bullet.y])
            }
        });
        this.bullets.push(new_bullet);
        //this.playLaunchSound();
        //console.log(this.crossoverMap);
    }
    addObstacle(){
        let new_obs = new obstacle(this);
        this.bullets.map((bullet)=>{
            if(bullet.onThePath(new_obs)){
                this.crossoverMap[bullet.y].push(new_obs);
            }
        });
        this.obstacles.push(new_obs);
    }
    render(){
        // starting the game
        setInterval(()=>{this.run();}, this.canvas_refresh_rate);
        setInterval(()=>{this.addObstacle();}, this.obstacle_rate);
        return this.canvas;
    }
}