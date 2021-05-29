module.exports = {
    newPlayer: (player, id) => {

        if(player[0].id === '') {
            player[0].id = id
            player[0].connected = true
            return {
                msg: 'Player one',
                p1: player[0]
            }
        }
        if(player[1].id === '') {
            player[1].id = id
            player[1].connected = true
            return {
                msg: 'Player two',
                p2: player[1]
            }
        }

        if(!!player[0].id && !!player[1].id) {
            return {
                error: true,
                msg: 'Playroom is full, comeback later.'
            }
        }
    },

    disconnectPlayer: (player, id) => {

        player.map((item, i) => {
            if(player[i].id === id) {
                player[i].id = ''
                player[i].value = ''
                player[i].submit = false
                return `Player ${i+1} disconnected`
            }
        })
    },

    clearValue: (player) => {
            player[0].value = ''
            player[1].value = ''
            player[0].submit = false
            player[1].submit = false
        },

    emitMsg: (msg, player) =>  {
            return {
                msg: msg,
                player1: player[0].value,
                player2: player[1].value,
            }
        }
}