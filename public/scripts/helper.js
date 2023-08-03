
function flipCard(card) {
    card.classList.toggle('flipped');
}

function createLaunchGameBtn(){
    let btn = document.createElement("button");
    btn.id="btn_lancer";
    btn.innerText="lancer";
    return btn;
}
function createGameCase(data){
    //tile car le mot clé case est deja pris -___-
    console.log(data);
    let tile = document.createElement("div");
    let colorHeader=  document.createElement("div");
    let title=document.createElement("h2");
    let price=document.createElement("h3");
    let titleText=document.createTextNode(data.nom);
    let priceText=document.createTextNode(data.prix);

    title.appendChild(titleText);
    price.appendChild(priceText);
    tile.classList.add("case");
    colorHeader.classList.add("caseHeader");
    colorHeader.style.backgroundColor=data.couleur
    
    tile.appendChild(colorHeader);
    tile.appendChild(title);
    tile.appendChild(price);
    console.log(tile);
    return tile;
}
function fillCoteBas(data){
    let cote_bas=document.getElementById("cote_bas");
    fillContainer(cote_bas,data);
}
function fillCoteHaut(data){
    let cote_haut=document.getElementById("cote_haut");
    fillContainer(cote_haut,data);
}
function fillCoteDroit(data){
    let cote_droit=document.getElementById("cote_droit");
    fillContainer(cote_droit,data);
}
function fillCoteGauche(data){
    let cote_gauche=document.getElementById("cote_gauche");
    fillContainer(cote_gauche,data);
}

function fillContainer(container,data){
    console.log(data);
    for(let i=0;i<data.length;i++){
        container.appendChild(createGameCase(data[i]));
    }
}

export{flipCard,createLaunchGameBtn,createGameCase,fillCoteBas,fillCoteHaut,fillCoteDroit,fillCoteGauche};
