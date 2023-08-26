export const socket = (socketIO) => {
    socketIO.on('connection', (socket) => {
        console.log(`User with ${socket.id} connected`)

        // Подписываемся, "прослушиваем" событие "message"
        socket.on('message', (data) => {
            // Когда произошло событие message,
            // рассылаем всем событие response
            socketIO.emit('response', data)
        })

        socket.on('disconnect', () => {
            console.log(`User with ${socket.id} disconnected`)
        })
    })
}
