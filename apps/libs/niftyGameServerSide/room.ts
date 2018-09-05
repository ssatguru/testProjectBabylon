import * as NGSTypes from "../../libs/niftyGameServerTypes"
import ClientSocket from "./clientSocket"
class Room {
    gameObjects:{[id:string]:NGSTypes.TrackedObject} = {}
    sockets:{[id:string]:ClientSocket} = {}

    constructor(public id:string){

    }

    addSocket(socket:ClientSocket){
        this.sockets[socket.id] = socket
        socket.room = this
    }
    removeSocket(socket:ClientSocket){
        delete this.sockets[socket.id]
        socket.room = null
    }
    emitToAll(msg:string, data:any, except?:ClientSocket){
        for(var key in this.sockets){
            if(!except || this.sockets[key] != except ){
                this.sockets[key].socket.emit(msg, data)
            }
        }
    }
}

export default Room