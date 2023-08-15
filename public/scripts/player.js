class Player{
    #money;
    constructor(pseudo,isHost,roomID,SocketId,pawn,currentCaseIndex){
        this.pseudo=pseudo;
        this.host=isHost;
        this.roomID=roomID;
        this.socketId=SocketId;
        this.pawn=pawn;
        this.#money=0;
        this.currentCaseIndex=currentCaseIndex;
        this.turn=false;
    }


}
export{Player};