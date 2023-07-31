
function flipCard(card) {
    card.classList.toggle('flipped');
}

function createLaunchGameBtn(){
    let btn = document.createElement("button");
    btn.id="btn_lancer";
    btn.innerText="lancer";
    return btn;
}
function createGameCase(){
    console.log("dqz");
}

export{flipCard,createLaunchGameBtn};
