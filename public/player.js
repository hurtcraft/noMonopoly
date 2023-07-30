class Player{
    #money;
    constructor(pseudo,isHost,roomID,SocketId){
        this.pseudo=pseudo;
        this.host=isHost;
        this.roomID=roomID;
        this.socketId=SocketId;
        this.#money=0;
    }
}
export{Player};