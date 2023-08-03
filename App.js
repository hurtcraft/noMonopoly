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
	socket.on("PlayerData", (player) => {

		
		if (player.roomID == null) {
			//si le joueur crée une room
			roomID= parseInt(CreateRoomID());
			room = CreateRoom(player,roomID);
			console.log(player);
			console.log(roomID);
			socket.emit("sendRoomID",roomID);
			
		}
		else{
			//si le joueur se connecte a une room
			room=AllRooms.find(r=>r.id==player.roomID);
			console.log(player.roomID);
			console.log(room);
			if(room==undefined){
				return;
			}
			if(room.players.lenght>=4){
				socket.emit("roomFull","la salle est remplie");
				return;
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
		console.log("le jeu commence avec : "+room.players);
		io.in(room.id).emit("initGame",gameData);
	})

});
let AllRooms = [];
function CreateRoom(player, roomID) {
	const room = { id: roomID, players: [] };
	player.roomID = room.id;
	room.players.push(player);
	AllRooms.push(room);
	return room;

}
function CreateRoomID() {
	let random="";
	for(let i = 1 ; i<7;i++){
		random+=Math.floor(Math.random()*9).toString();
	}
	
	return random;
}




serv.listen(PORT, () => {
	console.log("serveur lancer sur le port " + PORT);
})