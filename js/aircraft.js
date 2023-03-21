export class aircraft{
    constructor(){
        this.x = 100;
        this.y = 300;
        this.height = 100;
        this.width = 100;
        this.speed = 8;
        this.image = null;
    }
    getAircraftSVG(){
        return `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512.00 512.00" xml:space="preserve" width="100px" height="100px" fill="#000000" transform="rotate(90)" stroke="#000000" stroke-width="4.608027">
            <g id="SVGRepo_bgCarrier" stroke-width="0"/>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="2.0480120000000004"/>
            <g id="SVGRepo_iconCarrier"> <g> <rect x="200.177" y="454.915" style="fill:#0080ff;" width="38.945" height="57.089"/> <rect x="272.881" y="454.915" style="fill:#0080ff;" width="38.945" height="57.089"/> </g> <path style="fill:#E42105;" d="M424.164,370.034c-1.121-9.215-8.422-20.938-16.166-26.058l-78.021-51.579H182.026l-78.021,51.579 c-7.744,5.12-15.045,16.843-16.166,26.058c-2.922,24.025-11.418,96.129-11.418,96.129h106.281l72.336-22.506l74.263,22.506h106.281 C435.582,466.164,427.086,394.059,424.164,370.034z"/> <path style="fill:#FFB367;" d="M329.301,144.268c0-59.264-28.873-111.765-73.299-144.268 c-44.426,32.504-73.298,85.004-73.298,144.268v288.137l73.299,22.505l73.299-22.505V144.268H329.301z"/> <rect x="182.701" y="432.409" style="fill:#3D51CC;" width="146.601" height="33.758"/> <path style="fill:#FF7039;" d="M216.462,144.268h79.081c0-13.441-1.905-26.686-5.518-39.385h-68.045 C218.367,117.582,216.462,130.827,216.462,144.268z"/> </g>
            </svg>`;
    }
    render(game){
        if(game.up_key_pressed){
            this.y = this.y - this.speed;
        }
        if(game.down_key_pressed){
            this.y = this.y + this.speed;
        }
        if(this.image===null){
            this.image = new Image();
            this.image.onload=()=>{
                game.ctx.drawImage(this.image, this.x, this.y);
            }
            this.image.src = `data:image/svg+xml;utf8,${encodeURIComponent(this.getAircraftSVG())}`;
        }
        else{
            game.ctx.drawImage(this.image, this.x, this.y);
        }
    }
}