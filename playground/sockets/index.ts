import { Server } from 'socket.io'

export default function(io: Server) {
    io.on("connection", async (socket) => { ///User connected
        ///Messages
        socket.on('message', (message) => {
            io.emit("receivedMessage", "hello world, from server");
        })

        socket.on('joinRoom', (roomName) => { //Change room and announce it
            socket.join(roomName);
            io.to(socket.id).emit("joinedRoom", roomName);

            io.to(roomName).emit("receivedMessage", `New user joined the ${roomName} room!`);

            if(roomName === "Default") {
                let i = 0;
                socket.rooms.forEach(room => {
                    if(i > 0) {
                        socket.leave(room);
                    }
                    i++;
                });
            }
        })
        
        //User disconnected
        socket.on("disconnect", () => {
            console.log("User disconnected")
        })
    })
}