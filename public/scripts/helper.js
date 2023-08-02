
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
    for(let i=0;i<data.length;i++){
        cote_bas.appendChild(createGameCase(data[i]));
    }
}
export{flipCard,createLaunchGameBtn,createGameCase,fillCoteBas};
