import {game} from "./game.js";
import {opencard} from "./opencard.js";
class app{
    startGame(){
        this.parentDiv.replaceChildren(new game().render());
    }
	render(){
	    this.parentDiv = document.createElement("div");
	    this.parentDiv.appendChild(new opencard().render(()=>{this.startGame();}));
	    return this.parentDiv;
	}
}
document.getElementById("root").appendChild(new app().render());