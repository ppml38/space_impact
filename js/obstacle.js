export class obstacle{
    constructor(game){
        this.width = 70;
        this.height = 50;
        this.x = game.canvas_width - this.width;
        this.y = Math.floor(Math.random() * (game.canvas_height-this.height)) + 1; //from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
        this.speed = Math.floor(Math.random() * 4) + 3; // random between 8 and 10
        this.image = null;
        this.explosion_timeout = 0;
        this.isactive = true;
        this.defaultHitCheckTimeout = 6;
        this.hitCheckTimeout = 6;
    }
    getSVG(){
        return `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                <svg height="50px" width="70px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" transform="rotate(45)matrix(-1, 0, 0, 1, 0, 0)" stroke="#000000" stroke-width="0.00512">
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.024"/>
                <g id="SVGRepo_iconCarrier"> <path style="fill:#F9D026;" d="M144.345,349.7l67.39,20.636L64.631,196.91l96.855,26.033L0,0l222.943,161.485l-26.034-96.853 l173.427,147.103l-20.635-67.39c0,0,263.14,180.817,119.3,324.657C325.163,612.84,144.345,349.7,144.345,349.7z"/> <path style="fill:#E7C224;" d="M222.943,161.485l-26.034-96.853l173.427,147.103l-20.635-67.39c0,0,263.14,180.817,119.3,324.657 L0,0L222.943,161.485z"/> <path style="fill:#ff8040;" d="M437.25,277.514c17.677,17.677,38.154,36.034,38.154,71.362s-3.587,55.773-7.519,74.44 c-10.69,50.759-86.677,46.491-107.649,42.847c-20.187-3.508-49.105-8.125-67.122-26.142c-18.017-18.017-45.925-44.513-45.925-64.296 c0-19.783,0-50.872,0-68.536s17.664-45.219,50.165-53.698C329.855,245.013,392.385,232.648,437.25,277.514z"/> <g> <path style="fill:#ff8040;" d="M268.463,268.464c7.676-6.531,17.341-11.96,28.891-14.973 c32.501-8.479,95.031-20.843,139.896,24.023c17.677,17.677,38.154,36.034,38.154,71.362s-3.587,55.773-7.519,74.44 c-2.534,12.033-8.741,20.969-17.011,27.558L268.463,268.464z"/> <circle style="fill:#ff8040;" cx="327.235" cy="402.777" r="16.41"/> <path style="fill:#ff8040;" d="M284.576,321.588c-15.864-15.864-18.794-39.761-8.796-58.597c6.232-4.059,13.438-7.377,21.574-9.5 c13.096-3.416,31.069-7.461,50.797-8.141c2.429,1.682,4.747,3.591,6.91,5.753c19.464,19.464,19.464,51.021,0,70.485 C335.597,341.052,304.04,341.052,284.576,321.588z"/> </g> <g> <path style="fill:#ff8040;" d="M470.581,409.549c-19.241,12.041-44.908,9.708-61.643-7.027c-19.464-19.464-19.464-51.021,0-70.485 c17.192-17.192,43.815-19.188,63.21-6.007c2.059,6.78,3.256,14.316,3.256,22.845C475.404,375.82,473.316,394.104,470.581,409.549z"/> <path style="fill:#ff8040;" d="M272.065,272.065c0.928-3.113,2.166-6.155,3.715-9.074c6.232-4.058,13.438-7.377,21.574-9.5 c13.096-3.417,31.069-7.462,50.797-8.141c2.429,1.682,4.747,3.591,6.91,5.753c19.464,19.464,19.464,51.021,0,70.485 c-6.057,6.057-13.288,10.228-20.959,12.515L272.065,272.065z"/> </g> </g>
                </svg>`;
    }
    getExplosion(){
        return `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                <svg fill="#ff0000" width="80px" height="80px" viewBox="0 0 32.00 32.00" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#ff0000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>
                <g id="SVGRepo_iconCarrier"> <title>bomb-explosion</title> <path d="M30.79 20.247v-1.813c-3.349-1.335-5.321-2.581-5.928-4.568-0.498-1.631 1.004-3.801 3.836-6.416-2.958 1.621-5.135 2.722-5.997 1.185-0.774-1.38 0.093-3.966 1.464-7.357h-0.976c-1.094 1.731-2.025 3.044-2.371 2.72-0.301-0.283-0.305-1.301-0.174-2.72l-2.022-0.001c-1.338 2.997-2.757 4.695-4.812 4.986-1.756 0.249-4.029-1.814-6.59-4.742 1.458 2.894 1.994 5.215 1.011 5.788-1.162 0.678-3.491-0.121-6.939-1.569v0.662c2.372 1.506 4.557 2.975 4.149 3.522-0.358 0.48-1.992 0.397-4.149 0.105v1.709c3.121 1.576 4.812 3.193 4.812 4.707 0 1.302-2.601 3.961-4.812 6.067v1.011c1.995-0.654 4.443-0.908 5.265 0.558 0.839 1.495 0.276 3.611-0.802 6.695h1.848c1.958-2.645 3.819-4.766 4.812-4.672 0.703 0.066 0.375 2.225-0.105 4.672h0.558c1.743-4.845 3.892-7.814 7.078-7.706 2.796 0.096 5.449 2.91 8.368 4.916-1.526-1.867-4.337-4.526-3.731-5.021 0.637-0.521 3.367 0.432 6.207 1.464v-0.907c-1.863-1.271-3.576-2.492-3.138-2.929 0.394-0.393 1.596-0.456 3.138-0.349zM21.948 18.081c-0.335 0.334 1.759 1.577 2.956 2.438-1.81-0.632-4.092-1.582-4.518-1.234-0.308 0.252 1.12 1.603 1.897 2.553-1.485-1.021-2.845-2.448-4.267-2.496-2.092-0.071-3.29 2.442-4.323 6.282 0.272-1.823 1.089-4.679 0.502-4.733-0.833-0.078-2.846 2.892-4.351 5.106 1.051-3.185 2.006-5 1.367-6.139-0.577-1.029-2.744-0.403-3.682 0.143 1.105-1.043 3.447-3.141 3.447-4.025 0-1.286-2.32-2.733-6.599-3.951 2.572 0.405 5.888 1.149 6.275 0.631 0.303-0.405-2.192-1.813-3.71-2.811 2.672 1.146 4.365 1.92 5.122 1.479 0.5-0.292 0.222-1.47-0.52-2.942 1.303 1.489 2.471 2.538 3.364 2.411 1.884-0.267 2.698-2.76 4.166-7.518l0 0c-0.345 2.648-1.044 5.965-0.614 6.369 0.322 0.303 1.636-2.144 2.65-3.701-1.144 2.886-2.245 5.056-1.69 6.045 0.439 0.782 1.552 0.23 3.056-0.594-1.44 1.33-2.214 2.433-1.961 3.263 0.503 1.647 2.857 2.292 7.065 3.766-2.161-0.28-5.135-0.842-5.634-0.344z"/> </g>
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
            if(this.isCollision(game.aircraft)===true){
                return true;
            }
            else{
                this.hitCheckTimeout=this.defaultHitCheckTimeout;
                return false;
            }
        }
        else{
            return true;
        }
    }
    drawExplosion(game){
        let y = this.explosion_timeout<5 ? 0 : 192;
        let x = y===0 ? this.explosion_timeout*192 : (this.explosion_timeout-5)*192;
        game.ctx.drawImage(this.image, x,y,192,192, this.x, this.y, 100, 100);
        this.explosion_timeout+=1;
    }
    render(game){
        if(this.x+this.width > 0){
            this.x = this.x - this.speed;
        }
        else{
            // obstacle out of view
            game.obstacle_miss-=1; //
            return false; // to notify to remove this obstacle from view
        }

        //check for aircraft hit
        if(this.isactive===true && this.checkHit(game)===true){
            this.isactive=false;
            game.aircraft_life-=1;
        }
        if(this.isactive===true){
            if(this.image===null){
                this.image = new Image();
                this.image.onload=()=>{
                    game.ctx.drawImage(this.image, this.x, this.y);
                }
                this.image.src = `data:image/svg+xml;utf8,${encodeURIComponent(this.getSVG())}`;
            }
            else{
                game.ctx.drawImage(this.image, this.x, this.y);
            }
        }
        else{
            if(this.explosionState!=='EXPLODING'){
                this.image = game.explosion_image;
                /*this.image.onload=()=>{
                        this.drawExplosion(game);
                    }*/
                game.explosion_sound.play();
                //this.image.src = "img/explosion.png";//`data:image/svg+xml;utf8,${encodeURIComponent(this.getExplosion())}`;
                this.explosionState='EXPLODING';
            }
            else{
                this.drawExplosion(game);
                if(this.explosion_timeout==7){return false;}
                return true;
            }
        }
        return true;
    }
}