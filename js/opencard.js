export class opencard{
    render(callback){
        let parentDiv = document.createElement("div");
        parentDiv.classList.add("opencard");

        parentDiv.appendChild(this.getTitle());
        parentDiv.appendChild(this.getStoryLine());
        parentDiv.appendChild(this.getControl(callback));


        return parentDiv;
    }

    getTitle(){
        let title = document.createElement("div");
        title.innerText = "Space Impact"
        title.classList.add("title");
        return title;
    }
    getStoryLine(){
        let sl = document.createElement("div");

        sl.innerText = `Scientists have warned that a cluster of meteors is on earth's orbiting path and they are going to hit earth soon.

All nations' governments have discussed and chosen you to destroy all of them, with a spaceship equiped with enough missiles.

You, the brave man/woman, onboard the spaceship and going to complete this mission.`;
        sl.classList.add("storyline");
        return sl;
    }
    getControl(callback){
        let control = document.createElement("div");
        control.classList.add("control");

        let controlText = document.createElement("div");
        controlText.classList.add("controlText");
        controlText.innerText = `Press 'Up arrow' and 'Down arrow' to navigate the spaceship and press 'space' to launch missiles.`;

        let openGameButton = document.createElement("button");
        openGameButton.classList.add("startButton");
        openGameButton.innerText = "Start game";
        openGameButton.onclick = ()=>{callback();};


        control.appendChild(controlText);
        control.appendChild(openGameButton);
        return control;
    }
}