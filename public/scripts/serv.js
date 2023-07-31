
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
    socket.on("sendRoomID",(receveidRoomID)=>{
        console.log(receveidRoomID);
        roomIDContainer.innerText="Room : "+receveidRoomID;
    })
    
    socket.on("joinRoom",(players)=>{
        waitingArea.style.visibility="visible";
        accueilCard.style.visibility="hidden";
    
        for(let i = 0 ; i <players.length;i++){
            Players.push(players[i]);
            lstPlayersCard[i].innerText=players[i].pseudo;
            lstPlayersCard[i].classList.remove("lds-dual-ring");
        }
        
    })
    socket.on("initGame",()=>{
        waitingArea.style.visibility="hidden";
        board.style.visibility="visible";
    })
    
    socket.on("roomFull",(msg)=>{
        console.log(msg);
    })

    
    
}



export { socket };


