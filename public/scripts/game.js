import { createGameCase,createEmptyCase,randomInt } from "./helper.js";
import { player } from "./form.js";
import { socket } from "./serv.js";
const randomBtn=document.getElementById("BtnJouer");
const resultContainer=document.getElementById("result");
const nbCaseBoard=40;
let resultRandomInt;
randomBtn.addEventListener("click",()=>{
    
    resultRandomInt=randomInt(7);
    resultContainer.innerText=resultRandomInt;
    socket.emit("inGame",player,resultRandomInt);
})
function initBoard(data,playerdata) {
    const ROWS = 11;
    const COLS = 11;
    const BOARD = document.getElementById("game_board");

    const DataHaut=data.cote_haut;
    const DataBas=data.cote_bas;
    const DataDroit=data.cote_droit;
    const DataGauche=data.cote_gauche;
    let countHaut=0;
    let countBas=0;
    let countDroit=0;
    let countGauche=0;

    let map=new Map();
    //tkt ca va marcher
    //plus jamais je fais ca
    //note à moi même : REFLECHIE AVANT DE PRODUIRE DE LA DATA NUL PAR PITIE EFNEUFJIQAQNIO
    
    let departBas=10;
    let departGauche=19;
    let departHaut=20;
    let departDroit=31;

    let tile;
    for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
            if (i === 0 ) {
                //cote Haut
                tile=createGameCase(DataHaut[countHaut]);
                tile.classList.add("haut");      
                BOARD.appendChild(tile);
                map.set(countHaut+departHaut,[tile,DataHaut[countHaut]]);
                countHaut++;
            } 
            else if(i===10){
                //cote Bas
                tile.classList.add("bas")
                tile=createGameCase(DataBas[countBas]);
                BOARD.appendChild(tile);
                map.set(departBas-countBas, [tile,DataBas[countBas]]);
                countBas++;
            }
            else if(j===0){
                //cote Gauche
                tile=createGameCase(DataGauche[countGauche]);
                tile.classList.add("gauche");
                BOARD.appendChild(tile);
                map.set(departGauche-countGauche, [tile,DataGauche[countGauche]]);
                countGauche++;
            }
            else if (j===10){
                //cote droit
                
                tile=createGameCase(DataDroit[countDroit]);
                tile.classList.add("droite");
                BOARD.append(tile);
                map.set(countDroit+departDroit, [tile,DataDroit[countDroit]]);
                countDroit++;
            }  
            else {
                BOARD.appendChild(createEmptyCase());
            }
        }
    }
    let CaseDepart=BOARD.lastChild;
    initPlayerOnBoard(playerdata,CaseDepart);
    return map;

}
function initPlayerOnBoard(PlayerData,CaseDepart){
    let imgPawn;
    
    PlayerData.forEach(p=>{
        imgPawn=document.createElement("img");
        imgPawn.src=p.pawn;
        imgPawn.id=p.pseudo;
        imgPawn.classList.add("pawn_in_game");
        CaseDepart.querySelector(".pawn_space").appendChild(imgPawn);

    });
}

export{initBoard,nbCaseBoard};