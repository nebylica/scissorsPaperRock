const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const socketIo = require('socket.io')
const helpers = require('./helpers/helpers')

const server = http.createServer(app)
const io = socketIo(server)

server.listen(3000)
app.use(express.static(path.join(__dirname, 'public')))


let player = [
    {id: '', value: '', submit: false},
    {id: '', value: '', submit: false}
]


io.on('connection', socket => {

    socket.emit('start', helpers.newPlayer(player, socket.id))


    socket.on('value', value => {

        player.map((item, index) => {
            if(item.id === socket.id) {
                player[index].value = value
                player[index].submit = true
            }
        })

        if(!player[0].submit || !player[1].submit) {
            return socket.broadcast.emit('playerChoose', 'Player is waiting for your chooose.')
        }

        if(player[0].value === player[1].value)
        {
            io.emit('winner', helpers.emitMsg("It's a tie", player))
            helpers.clearValue(player)
        }
        else if (player[0].value === 'rock' && player[1].value === 'scissors' ||
            player[0].value === 'paper' && player[1].value === 'rock' ||
            player[0].value === 'scissors' && player[1].value === 'paper')
        {
            io.emit('winner', helpers.emitMsg("Player one win", player))
            helpers.clearValue(player)
        }
        else
        {
            io.emit('winner', helpers.emitMsg("Player two win", player))
            helpers.clearValue(player)
        }
    })


    socket.on('disconnect', () => {
        helpers.disconnectPlayer(player, socket.id)
    })

})



