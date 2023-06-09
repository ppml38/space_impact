export class bullet{
    constructor(game){
        this.width = 100;
        this.height = 60;
        this.x = game.aircraft.x + game.aircraft.width;
        this.y = game.aircraft.y + (game.aircraft.height-this.height)/2;
        this.speed = 10;
        this.image = null;
        this.isactive = true;
        this.defaultHitCheckTimeout = 6;
        this.hitCheckTimeout = 6;
    }
    getBulletSVG(){
        return `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" width="100px" height="60px" fill="#000000" transform="rotate(45)" stroke="#000000" stroke-width="3.5840000000000005">
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                <g id="SVGRepo_iconCarrier"> <g> <polygon style="fill:#E6E6E6;" points="121.025,431.577 83.695,480.292 105.232,512 133.13,484.1 "/> <polygon style="fill:#E6E6E6;" points="230.152,317.757 203.772,360.216 230.804,411.38 253.169,389.015 "/> <polygon style="fill:#E6E6E6;" points="385.626,152.897 305.889,258.099 332.921,309.276 389.2,252.984 "/> <polygon style="fill:#E6E6E6;" points="80.426,390.977 31.71,428.306 0.003,406.772 27.901,378.872 "/> <polygon style="fill:#E6E6E6;" points="194.244,281.852 151.786,308.23 100.622,281.198 122.987,258.833 "/> <polygon style="fill:#E6E6E6;" points="359.106,126.377 253.903,206.113 202.726,179.081 259.018,122.802 "/> </g> <path style="fill:#B3B3B3;" d="M400.187,59.975l51.826,51.826c-1.654,1.76-3.362,3.52-5.078,5.236L305.872,258.099l-70.809,70.826 l-31.295,31.277l-80.524,80.541l-39.549,39.55l-51.984-51.984l222.193-222.193l80.824-80.841l0.009,0.009l58.197-58.215l2.015-2.015 C396.666,63.336,398.427,61.63,400.187,59.975z"/> <path style="fill:#999999;" d="M440.607,100.396l11.474,11.474c-1.695,1.719-3.424,3.459-5.14,5.175L305.88,258.106l-70.815,70.819 l-31.287,31.283l-80.531,80.535l-39.55,39.55l-11.509-11.509l222.193-222.193l80.83-80.834l0.003,0.002l58.204-58.209l2.015-2.015 C437.148,103.818,438.888,102.091,440.607,100.396z"/> <path style="fill:#F95428;" d="M511.997,0c-5.184,22.151-13.403,43.377-24.333,63.072c-9.311,16.721-20.575,32.386-33.644,46.563 c-0.66,0.731-1.329,1.452-2.006,2.166l-51.826-51.826c0.713-0.677,1.435-1.347,2.164-2.006C433.259,29.561,471.004,9.574,511.997,0z "/> <path style="fill:#E54728;" d="M511.997,0c-5.184,22.151-13.403,43.377-24.333,63.072c-9.311,16.721-20.575,32.386-33.644,46.563 c-0.66,0.731-1.329,1.452-2.006,2.166l-12.092-12.092c0.686-0.704,1.364-1.416,2.042-2.129 c13.324-13.922,25.618-28.558,36.654-43.554C491.597,36.381,502.853,18.191,511.997,0z"/> <g> <rect x="256.923" y="185.463" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 682.3541 100.7313)" style="fill:#E6E6E6;" width="126.783" height="12.446"/> <rect x="161.127" y="310.412" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 557.4235 402.3767)" style="fill:#E6E6E6;" width="68.5" height="12.446"/> <rect x="47.11" y="433.985" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 433.8077 700.727)" style="fill:#E6E6E6;" width="49.337" height="12.446"/> </g> <g> <path style="fill:#808080;" d="M402.352,57.968l51.667,51.667c-0.66,0.731-1.329,1.452-2.006,2.166 c-1.654,1.76-3.362,3.52-5.078,5.236l-2.015,2.015l-51.984-51.983l2.015-2.015c1.716-1.716,3.476-3.424,5.236-5.078 C400.9,59.298,401.621,58.628,402.352,57.968z"/> <rect x="240.405" y="228.266" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 608.9711 277.8032)" style="fill:#808080;" width="13.092" height="73.516"/> <rect x="112.936" y="355.737" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 481.5042 585.5453)" style="fill:#808080;" width="13.092" height="73.516"/> </g> </g>
                </svg>`;
    }
    onThePath(obstacle){
        //console.log(`Obstacle: (${obstacle.y},${obstacle.y+obstacle.height})`);
        //console.log(`bullet: (${this.y},${this.y+this.height})`);
        if(
            (obstacle.y<=this.y && (this.y+this.height)<=(obstacle.y+obstacle.height)) ||
            (this.y<=obstacle.y && obstacle.y<=(this.y+this.height)) ||
            (this.y<=(obstacle.y+obstacle.height) && (obstacle.y+obstacle.height)<=this.y+this.height)
        ){
            //console.log(true);
            return true;
        }
        //console.log(false);
        return false;
    }
    isCollision(obstacle){
        if(
            this.onThePath(obstacle) &&
            (
            (this.x<=obstacle.x && obstacle.x<=(this.x+this.width)) ||
            (this.x<=(obstacle.x+obstacle.width) && (obstacle.x+obstacle.width)<=(this.x+this.width)) ||
            (obstacle.x<=this.x && (this.x+this.width)<=(obstacle.x+obstacle.width))
            )
          ){
            return true;
        }
        return false;
    }
    checkHit(game){
        if(this.hitCheckTimeout>0){
            this.hitCheckTimeout-=1;
            return false;
        }
        if(this.isactive===true){
            if(game.crossoverMap[this.y]){
                game.crossoverMap[this.y] = game.crossoverMap[this.y].filter((obstacle)=>{
                    if(obstacle.isactive===false) return false;
                    if(this.isCollision(obstacle)===true){
                        obstacle.isactive = false;
                        this.isactive=false;
                        //console.log("HIT DETECTED")
                    };
                    return true;
                });
                /*for(let i=0;i<game.crossoverMap[this.y].length;i++){
                    if(game.crossoverMap[this.y][i].isactive===true &&
                        this.isCollision(game.crossoverMap[this.y][i])===true){
                        game.crossoverMap[this.y][i].isactive = false;
                        //console.log("HIT DETECTED")
                        return true;
                    }
                }*/
                //console.log("no hit");
                this.hitCheckTimeout=this.defaultHitCheckTimeout;
                return false;
            }
            else{
                //console.log("y not in cross over");
                //console.log(game.crossoverMap.length);
                this.hitCheckTimeout=this.defaultHitCheckTimeout;
                return false;
            }
        }
        else{
            return true;
        }
    }
    render(game){
        this.checkHit(game);
        if(this.isactive===true){
            if(this.x < game.canvas_width){
                this.x = this.x + this.speed;
            }
            else{
                return false; // to notify to remove this bullet from view
            }
            if(this.image===null){
                this.image = new Image();
                this.image.onload=()=>{
                    game.ctx.drawImage(this.image, this.x, this.y);
                }
                this.image.src = `data:image/svg+xml;utf8,${encodeURIComponent(this.getBulletSVG())}`;
            }
            else{
                game.ctx.drawImage(this.image, this.x, this.y);
            }
            return true;
        }
        else{
            return false; // bullet hit the target. so bullet disappears.
        }
    }
}