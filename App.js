const express = require("express");
const app = express();
const serv = require("http").createServer(app);
const io = require("socket.io")(serv);
const PORT = 3000;
const gameData= require("./game.js");
//zone de test



//fin zone de test
app.use(express.static('public'));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
})


io.on("connection", (socket) => {
	console.log("connection de " + socket.id);
	let room=null;
	let roomID=null;
	let playerTurn=0;
	socket.on("PlayerData", (player) => {

		
		if (player.roomID == null) {
			//si le joueur crée une room
			roomID= parseInt(CreateRoomID());
			room = CreateRoom(player,roomID,false);
			player.roomID = roomID;
			console.log(player);
			socket.emit("sendRoomID",roomID);
			
		}
		else{
			//si le joueur se connecte a une room
			//partie a traiter encore
			//cas encore à traiter
			room=AllRooms.find(r=>r.id==player.roomID);

			if(room==undefined){
				socket.emit("roomNotFound","la room est inexistante");
				return;
			}
			if(room.players.lenght>=4){
				socket.emit("roomFull","la salle est remplie");
				return;
			}
			if(room.alreadyStart){
				socket.emit("roomAlreadyStart","la partie à deja commencer");
				return
			}
			room.players.push(player);
		}
		socket.join(room.id);
		io.in(room.id).emit("joinRoom",room.players);
		
	})

	socket.on("disconnect",()=>{
		console.log("deconnexion "+socket.id);
		let room=null;
		let player;
		//code a amelioré;
		AllRooms.forEach(r=>{
			r.players.forEach(p=>{
				player=p;
				console.log(player.socketId+" "+socket.id);
				if (player.socketId==socket.id && player.host){
					room=r;
					AllRooms=AllRooms.filter(r=>room!==r);
				}
			})
		})
	})
	socket.on("startGame",()=>{
		io.in(room.id).emit("initGame",gameData,room.players);
		//premier joueur qui joue, ps à corriger plus tard
		io.in(room.id).emit("nextPlayer",room.players[0]);
	})
	socket.on("inGame",(player,randomInt)=>{
		player.currentCaseIndex=(player.currentCaseIndex+randomInt)%40;
		let p=room.players.find(elt=>elt.socketId==player.socketId);
		p.currentCaseIndex=(p.currentCaseIndex+randomInt)%40;
		io.in(room.id).emit("playerPlayed",p,randomInt);


	})

	socket.on("nextPlayer",()=>{
		let p;
		playerTurn=(playerTurn+1)%room.players.length;
		p=room.players[playerTurn];
		io.in(room.id).emit("nextPlayer",p);
	})


});








let AllRooms = [];
function CreateRoom(player, roomID,alreadyStartBool) {
	const room = { id: roomID, players: [],alreadyStart: alreadyStartBool };
	player.roomID = room.id;
	room.players.push(player);
	AllRooms.push(room);
	return room;

}
function CreateRoomID() {
	let random="";
	const nbChar=7;
	for(let i = 1 ; i<nbChar;i++){
		random+=Math.floor(Math.random()*9).toString();
	}
	
	return random;
}




serv.listen(PORT, () => {
	console.log("serveur lancer sur le port " + PORT);
})