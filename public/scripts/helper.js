
function flipCard(card) {
    card.classList.toggle('flipped');
}
function CreatePawnsDiv() {
    const lstPawnName = ["Battleship.png", "Car.png", "Hat.png", "Iron.png", "Shoe.png", "Thimble.png"];
    let dir = "../img/pions/";
    let PawnsDiv = document.createElement("div");
    PawnsDiv.id = "pawn_div";
    for (let i = 0; i < lstPawnName.length; i++) {
        PawnsDiv.appendChild(CreateImg(dir + lstPawnName[i]));
    }
    return PawnsDiv;
}
function CreateImg(url) {
    const img = document.createElement("img");
    img.src = url;
    img.classList.add("imgPawn");
    return img;
}

function createLaunchGameBtn() {
    let btn = document.createElement("button");
    btn.id = "btn_lancer";
    btn.innerText = "lancer";
    return btn;
}
function createGameCase(data) {

    //tile car le mot clé case est deja pris -___-
    let tile = document.createElement("div");
    let colorHeader = document.createElement("div");
    let title = document.createElement("h2");
    let price = document.createElement("h2");
    let titleText = document.createTextNode(data.nom);


    let priceText = document.createTextNode(data.prix);
    if (data.prix === null || data.prix === undefined) {
        priceText.textContent = "";

    }

    let pawnSpace = document.createElement("div");
    pawnSpace.classList.add("pawn_space");
    title.appendChild(titleText);
    price.appendChild(priceText);
    price.classList.add("prix");
    tile.classList.add("case");
    colorHeader.classList.add("caseHeader");
    colorHeader.style.width = "100%";
    colorHeader.style.height = "20%";
    colorHeader.style.backgroundColor = data.couleur

    tile.appendChild(colorHeader);
    tile.appendChild(title);
    tile.appendChild(pawnSpace);
    tile.appendChild(price);


    return tile;
}

function createEmptyCase() {
    let c = document.createElement("div");
    c.classList.add("empty_case");
    return c;
}
function randomInt(max) {
    return Math.floor(Math.random() * (max - 1) + 1);
}

function avancer(p,randomInt,mapBoard){
    let PlayerPawnImg=document.getElementById(p.pseudo);
    console.log(p.currentCaseIndex-randomInt);
    let startIndex=(p.currentCaseIndex-randomInt+mapBoard.size)%mapBoard.size;
    let NextCase;
    let NextPawnSpace;

    let previousCase;
    for(let i =1;i<=randomInt;i++){
        setTimeout(()=>{
            previousCase=mapBoard.get((startIndex+i-1)%mapBoard.size)[0];
            previousCase.classList.remove("pawnOnCase"); 
            NextCase=mapBoard.get((startIndex+i)%mapBoard.size)[0];        
            NextCase.classList.add("pawnOnCase");
            NextPawnSpace=NextCase.querySelector(".pawn_space");
            NextPawnSpace.appendChild(PlayerPawnImg);
            if(i===randomInt){
                let data = mapBoard.get(p.currentCaseIndex)[1];
                setTimeout(()=>{afficherData(data)},400);
                
            }
        },i*400);
    }
    
    console.log(mapBoard.get(p.currentCaseIndex)[1]);//[0]--> la div | [1]-->la data

}

function afficherData(data){
    const descriptionContainer=document.getElementById("descriptionCase");
    const descriptionHeader=document.getElementById("descriptionCaseHeader");
    const descriptionTitre=descriptionContainer.querySelector("h1");
    const description=document.getElementById("description");
    //traitement couleur
    if(data.couleur!==null){
        descriptionHeader.style.backgroundColor=data.couleur;
    }
    else{
        descriptionHeader.style.display="none";
    }
    //traitement titre
    descriptionTitre.innerText=data.nom;

    if(data.type==="achetable"){
        let prix=document.createTextNode(data.prix);
        description.appendChild(prix);
    }
    console.log("ici");
    descriptionContainer.style.animation="descente 1s forwards";
}

export { flipCard, createLaunchGameBtn, createGameCase, CreatePawnsDiv, createEmptyCase, randomInt,avancer };
