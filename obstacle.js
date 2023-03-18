export class obstacle{
    constructor(game){
        this.width = 70;
        this.height = 50;
        this.x = game.canvas_width - this.width;
        this.y = Math.floor(Math.random() * ((game.canvas_height-this.height) - 1 + 1)) + 1; //from https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
        this.speed = 5;
        this.image = null;
    }
    getSVG(){
        return `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
                <svg height="50px" width="70px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000" transform="rotate(45)matrix(-1, 0, 0, 1, 0, 0)" stroke="#000000" stroke-width="0.00512">
                <g id="SVGRepo_bgCarrier" stroke-width="0"/>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="1.024"/>
                <g id="SVGRepo_iconCarrier"> <path style="fill:#F9D026;" d="M144.345,349.7l67.39,20.636L64.631,196.91l96.855,26.033L0,0l222.943,161.485l-26.034-96.853 l173.427,147.103l-20.635-67.39c0,0,263.14,180.817,119.3,324.657C325.163,612.84,144.345,349.7,144.345,349.7z"/> <path style="fill:#E7C224;" d="M222.943,161.485l-26.034-96.853l173.427,147.103l-20.635-67.39c0,0,263.14,180.817,119.3,324.657 L0,0L222.943,161.485z"/> <path style="fill:#ff8040;" d="M437.25,277.514c17.677,17.677,38.154,36.034,38.154,71.362s-3.587,55.773-7.519,74.44 c-10.69,50.759-86.677,46.491-107.649,42.847c-20.187-3.508-49.105-8.125-67.122-26.142c-18.017-18.017-45.925-44.513-45.925-64.296 c0-19.783,0-50.872,0-68.536s17.664-45.219,50.165-53.698C329.855,245.013,392.385,232.648,437.25,277.514z"/> <g> <path style="fill:#ff8040;" d="M268.463,268.464c7.676-6.531,17.341-11.96,28.891-14.973 c32.501-8.479,95.031-20.843,139.896,24.023c17.677,17.677,38.154,36.034,38.154,71.362s-3.587,55.773-7.519,74.44 c-2.534,12.033-8.741,20.969-17.011,27.558L268.463,268.464z"/> <circle style="fill:#ff8040;" cx="327.235" cy="402.777" r="16.41"/> <path style="fill:#ff8040;" d="M284.576,321.588c-15.864-15.864-18.794-39.761-8.796-58.597c6.232-4.059,13.438-7.377,21.574-9.5 c13.096-3.416,31.069-7.461,50.797-8.141c2.429,1.682,4.747,3.591,6.91,5.753c19.464,19.464,19.464,51.021,0,70.485 C335.597,341.052,304.04,341.052,284.576,321.588z"/> </g> <g> <path style="fill:#ff8040;" d="M470.581,409.549c-19.241,12.041-44.908,9.708-61.643-7.027c-19.464-19.464-19.464-51.021,0-70.485 c17.192-17.192,43.815-19.188,63.21-6.007c2.059,6.78,3.256,14.316,3.256,22.845C475.404,375.82,473.316,394.104,470.581,409.549z"/> <path style="fill:#ff8040;" d="M272.065,272.065c0.928-3.113,2.166-6.155,3.715-9.074c6.232-4.058,13.438-7.377,21.574-9.5 c13.096-3.417,31.069-7.462,50.797-8.141c2.429,1.682,4.747,3.591,6.91,5.753c19.464,19.464,19.464,51.021,0,70.485 c-6.057,6.057-13.288,10.228-20.959,12.515L272.065,272.065z"/> </g> </g>
                </svg>`;
    }
    render(game){
        if(this.x+this.width > 0){
            this.x = this.x - this.speed;
        }
        else{
            return false; // to notify to remove this bullet from view
        }
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
        return true;
    }
}