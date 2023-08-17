import {initBoard,nbCaseBoard} from "./game.js";
import { player } from "./form.js";
import {  avancer, randomInt } from "./helper.js";
const socketScript = document.createElement("script");
socketScript.src = "/socket.io/socket.io.js";
document.body.appendChild(socketScript);
let socket = null;

let Players=[];
socketScript.onload = () => {
    
    socket = io();
    let waitingArea=document.getElementById("waiting_area");
    let accueilCard=document.getElementById("accueil_card");
    let lstPlayersCard=document.getElementsByClassName("player_card");
    let roomIDContainer=document.getElementById("room_id");
    let board=document.getElementById("game_board");
    let btnJouer=document.getElementById("BtnJouer");
    let mapBoard;
    
    socket.on("sendRoomID",(receveidRoomID)=>{
        roomIDContainer.innerText="Room : "+receveidRoomID;
    })
    
    socket.on("joinRoom",(players)=>{
        waitingArea.style.visibility="visible";
        accueilCard.style.display="none";
    
        for(let i = 0 ; i <players.length;i++){
            Players.push(players[i]);
            lstPlayersCard[i].innerText=players[i].pseudo;
            lstPlayersCard[i].classList.remove("lds-dual-ring");
        }
        
    })
    socket.on("initGame",(gameData,playersData)=>{
        waitingArea.style.display="none";
        board.style.visibility="visible";
        mapBoard=initBoard(gameData,playersData);
    })

    socket.on("playerPlayed",async (p,randomInt)=>{
        const acheterBtn=document.getElementById("acheterBtn");
        const JePasseBtn=document.getElementById("JePasseBtn");
        if(p.socketId!==socket.id){
            //desactive les 2 btn;
            acheterBtn.style.visibility="hidden";
            JePasseBtn.style.visibility="hidden";

        }
        else{
            //active les 2 btn;
            acheterBtn.style.visibility="visible";
            JePasseBtn.style.visibility="visible";
        }
        avancer(p,randomInt,mapBoard); // data contenue dans la case final
        
        //setTimeout(()=>{afficherData(data)});

        socket.emit("nextPlayer");
    })
    socket.on("nextPlayer",(p)=>{
        if(socket.id!==p.socketId){
            btnJouer.disabled=true;
        }
        else{
            btnJouer.disabled=false;
        }
    })



    //cas a traité ici
    socket.on("roomNotFound",(msg)=>{
        console.log(msg);
    })
    socket.on("roomFull",(msg)=>{
        console.log(msg);
    })
    socket.on("roomAlreadyStart",(msg)=>{
        console.log(msg);
    })
    
    
}



export { socket };


