import { Server } from 'socket.io'

export default function(io: Server) {
    io.on("connection", (socket) => {
        socket.on('message', (message) => {
            console.log(message)
            io.emit("receivedMessage", "hello world, from server");
        })
        
        socket.on("disconnect", () => {
            console.log("User disconnected")
        })
    })
}