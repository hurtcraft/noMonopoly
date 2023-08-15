import {flipCard,createLaunchGameBtn, CreatePawnsDiv} from "./helper.js";
import { Player } from "./player.js";
import { socket } from "./serv.js";
let accueil_card=document.getElementById("accueil_card");
let btnRetour=document.createElement("button");
btnRetour.id="btn_retour";
btnRetour.innerText="<";
btnRetour.type="reset";
btnRetour.addEventListener("click",()=>{
    flipCard(accueil_card);
})
let player;

function JoinRoomForm(){
    let form = document.createElement("form");
    form.id="join_room_form";
    
    let inputPseudo=document.createElement("input");
    inputPseudo.placeholder="saisir un pseudo";
    inputPseudo.id="pseudo";
    inputPseudo.required=true;
    inputPseudo.type="text";    

    let inputLienRoom=document.createElement("input");
    inputLienRoom.placeholder="Lien de la salle";
    inputLienRoom.id="lienRoom";
    inputLienRoom.required=true;
    inputLienRoom.type="text";

    let btnJoin=document.createElement("button");
    btnJoin.id="btnJoin";
    btnJoin.innerText="rejoindre";
    btnJoin.type="submit";

    form.appendChild(inputPseudo);
    form.appendChild(inputLienRoom);
    form.appendChild(CreatePawnsDiv());
    form.appendChild(btnJoin);

    return form;
}

function CreateRoomForm(){
    let form = document.createElement("form");
    form.id="create_room_form";

    let inputPseudo=document.createElement("input");
    inputPseudo.placeholder="saisir un pseudo";
    inputPseudo.id="pseudo";
    inputPseudo.required=true;
    inputPseudo.type="text";    

    let btnCreate=document.createElement("button");
    btnCreate.id="btnCreate";
    btnCreate.innerText="Crée";
    btnCreate.type="submit"

    form.appendChild(inputPseudo);
    form.appendChild(CreatePawnsDiv());
    form.appendChild(btnCreate);

    return form;

}
function addForm(form){
    let container=document.getElementById("back_form");
    container.innerHTML="";
    container.appendChild(btnRetour)
    container.appendChild(form);
    flipCard(accueil_card);
}
let CreateForm=CreateRoomForm();
let JoinForm=JoinRoomForm();


let btnJoinRoom=document.getElementById("btn_join_room");
let btnCreateRoom=document.getElementById("btn_create_room");
let pawnsImg;
let currentPawn;
let pseudo;
let RoomID;

btnJoinRoom.addEventListener("click",()=>{
    addForm(JoinForm);
    pawnsImg=document.querySelectorAll(".imgPawn");
    pawnsImg.forEach(p=>{
        p.addEventListener("click",()=>{
            currentPawn=p;
            pawnsImg.forEach(otherP=>{
                otherP.classList.remove("currentPawn");
            })
            currentPawn.classList.add("currentPawn");

        })
    })

});
btnCreateRoom.addEventListener("click",()=>{
    addForm(CreateForm);
    pawnsImg=document.querySelectorAll(".imgPawn");
    pawnsImg.forEach(p=>{
        p.addEventListener("click",()=>{
            pawnsImg.forEach(otherP=>{
                otherP.classList.remove("currentPawn");
            })
            currentPawn=p;
            currentPawn.classList.add("currentPawn");
        })
    })

});
let waitingArea=document.getElementById("waiting_area");

JoinForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    pseudo=document.getElementById("pseudo").value;
    RoomID=document.getElementById("lienRoom").value;
    // verifier ROOMID
    player=new Player(pseudo,false,parseInt(RoomID),socket.id,currentPawn.src,0);
    socket.emit("PlayerData",player);
})

let btnLancer=createLaunchGameBtn();

CreateForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    pseudo=document.getElementById("pseudo").value;
    player=new Player(pseudo,true,null,socket.id,currentPawn.src,0);
    waitingArea.appendChild(btnLancer);
    socket.emit("PlayerData",player);
})

btnLancer.addEventListener("click",()=>{
    socket.emit("startGame");
})

export{player}
