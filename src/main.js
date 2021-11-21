import { World } from "./World/World.js";

async function main() {
    const container = document.querySelector("#scene-container");
    let buttons = document.querySelectorAll(".button");
    const world = new World(container);
    world.setWindow(document.querySelector('canvas'));
    await world.init();
    for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click',function(){
            let classe = this.className.split(' ');
            if(classe[1] == "play"){
                world.resetSpeed();
            }else if(classe[1] == "pause"){
                world.setMultipleSpeed(0);
            }else{
                let text = this.innerText.split(' ');
                world.setMultipleSpeed(text[1]);
                console.log("Set speed " +text[1]);
            } 
        });
    }
    world.start();
}



await main();