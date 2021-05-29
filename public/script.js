const socket = io()

let winner = document.getElementById('winner')
let player = document.getElementsByClassName('player')
let imageBtn = document.getElementsByClassName('imageBtn')
let submit = document.getElementsByClassName('submit')
let answerBox = document.getElementsByClassName('answerBox')


let photos = [
    "style/photos/paper.jpg",
    "style/photos/rock.jpg",
    "style/photos/scissors.jpg"
]
let userAnswer = ''


socket.on('start', data => {

    if(data.error) {
        return winner.innerText = data.msg
    }

    let insertPhotos = (num) => {
        player[num].innerText = data.msg

        answerBox[num].innerHTML = `
             <img id="answerImage" class="answerImage" src="" alt="">
        `

        imageBtn[num].innerHTML = `
            <img id="chooseBtnPaper" src=${photos[0]} alt="">
            <img id="chooseBtnRock" src=${photos[1]} alt="">
            <img id="chooseBtnScissors" src=${photos[2]} alt="">
        `

        submit[num].innerHTML = `
            <div id="submitBtn" class="playBtn">Submit</div>
        `
    }

    if(Object.keys(data)[1] === 'p1') {
        insertPhotos(0)
    }
    if(Object.keys(data)[1] === 'p2') {
        insertPhotos(1)
    }

    let chooseBtnPaper = document.getElementById('chooseBtnPaper')
    let chooseBtnRock = document.getElementById('chooseBtnRock')
    let chooseBtnScissors = document.getElementById('chooseBtnScissors')
    let answerImage = document.getElementById('answerImage')
    let submitBtn = document.getElementById('submitBtn')

    chooseBtnPaper.addEventListener('click', () => {
        answerImage.src = photos[0]
        userAnswer = 'paper'
        winner.innerText = ''
        })
    chooseBtnRock.addEventListener('click', () => {
        answerImage.src = photos[1]
        userAnswer = 'rock'
        winner.innerText = ''
    })
    chooseBtnScissors.addEventListener('click', () => {
        answerImage.src = photos[2]
        userAnswer = 'scissors'
        winner.innerText = ''
    })

    submitBtn.addEventListener('click', submitPress)
})

function submitPress() {
    socket.emit('value', userAnswer)
}

socket.on('playerChoose', msg => {
    winner.innerText = msg
})

socket.on('winner', data => {

    winner.innerText = data.msg

    let setOpponentImage = (player, num) => {
        if(player === 'paper') {
            answerBox[num].innerHTML = `
             <img id="answerImage" class="answerImage" src="${photos[0]}" alt="">
        `
        } else if(player === 'rock') {
            answerBox[num].innerHTML = `
             <img id="answerImage" class="answerImage" src="${photos[1]}" alt="">
        `
        } else {
            answerBox[num].innerHTML = `
             <img id="answerImage" class="answerImage" src="${photos[2]}" alt="">
        `
        }
    }

    if(!player[0].innerText) {
        setOpponentImage(data.player1, 0)
    } else {
        setOpponentImage(data.player2, 1)
    }
})

























