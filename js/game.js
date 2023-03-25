import {aircraft} from "./aircraft.js";
import {bullet} from "./bullet.js";
import {obstacle} from "./obstacle.js";
import {audio} from "./audio.js";
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
        this.canvas_height = window.innerHeight-10; //600;
        this.canvas_width = window.innerWidth-10; //1200;
        this.canvas.height = this.canvas_height;
        this.canvas.width = this.canvas_width;
        this.ctx = this.canvas.getContext("2d");
        /*
        this.launch_sound = new Audio("audio/launch.wav");
        this.launch_sound.preload = 'auto';
        this.launch_sound.load();*/
        this.bullet_launch_sound = new audio('audio/launch.wav');
        this.explosion_sound = new audio('audio/explosion.wav');
        this.explosion_image = new Image();
        this.explosion_image.src = 'img/explosion.png';

        // game states and constants
        this.missiles_left = 120;
        this.obstacles_left = 100;
        this.obstacle_miss = 5;
        this.aircraft_life=3;
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
            else if(e.keyCode=='82'){
                if(this.gameover()===true){
                    this.restart();
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
      /*var click=this.launch_sound.cloneNode();
      click.play();*/
      this.bullet_launch_sound.play();
    }
    getBackground(){
        this.ctx.font = "30px serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Missile: ${this.missiles_left}`, 50, 50);
        this.ctx.fillText(`EarthLife: ${this.obstacle_miss}`, Math.floor(this.canvas_width/2), 50);
        this.ctx.fillText(`SpaceshipLife: ${this.aircraft_life}`, this.canvas_width-200, 50);
    }
    clearCanvas(){
        this.ctx.clearRect(0,0,this.canvas_width, this.canvas_height);
    }
    run(timestamp){
        /*
            Method that gets executed once per canvas refresh rate and updates canvas with latest view
        */
        if(!this.currentTimeStamp) this.currentTimeStamp = timestamp;
        let timeDelta = Math.floor(timestamp - this.currentTimeStamp);
        if(Math.floor(timeDelta / this.obstacle_rate) > 0) // after every second
        {
         this.addObstacle();
         this.currentTimeStamp = timestamp;
        }
        // clear canvas for redrawing
        this.clearCanvas();

        // set background
        this.getBackground();

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
        if(this.gameover()===true){
            //clearInterval(this.runid);
            //clearInterval(this.obsid);
            this.showResult();
        }
        else{
            requestAnimationFrame((timestamp)=>{this.run(timestamp);});
        }
    }
    showResult(){
        this.clearCanvas();
        this.getBackground();
        this.ctx.font = "50px serif";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(`Game over. ${this.result}.`, Math.floor(this.canvas_width/3), Math.floor(this.canvas_height/2));
        this.ctx.fillText(`Press 'r' to restart.`, Math.floor(this.canvas_width/2.8), Math.floor(this.canvas_height/1.5));
    }
    gameover(){
        let message=null;
        if(this.obstacle_miss<=0 || this.aircraft_life<=0){
            this.result="You lost";
        }
        else if(this.missiles_left>=0 && this.obstacles_left<=0){
            this.result="YOU WON !!";
        }
        else if(this.missiles_left<=0){
            this.result="You lost";
        }
        else{
            return false;
        }
        return true;
    }
    shoot(){
        if(this.missiles_left>0){
            this.missiles_left-=1;
            let new_bullet = new bullet(this);
            this.obstacles.map((obs)=>{
                if(new_bullet.onThePath(obs)===true){
                    this.crossoverMap[new_bullet.y].push(obs);
                    //console.log("added to map");
                    //console.log(this.crossoverMap[new_bullet.y])
                }
            });
            this.bullets.push(new_bullet);
        }
        this.playLaunchSound();
        //console.log(this.crossoverMap);
    }
    addObstacle(){
        if(this.obstacles_left>0){
            this.obstacles_left-=1;
            let new_obs = new obstacle(this);
            this.bullets.map((bullet)=>{
                if(bullet.onThePath(new_obs)){
                    this.crossoverMap[bullet.y].push(new_obs);
                }
            });
            this.obstacles.push(new_obs);
        }
    }

    restart(){
        this.missiles_left = 120;
        this.obstacles_left = 100;
        this.obstacle_miss = 5;
        this.aircraft_life=3;

        this.bullets=[];
        this.obstacles=[];

        this.run();
    }
    render(){
        this.run();
        return this.canvas;
    }
}