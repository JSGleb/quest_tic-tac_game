//variables
let images = document.getElementById('images')
let text = document.getElementById('text')
let btnBox = document.getElementById('buttonBox')
let input = document.getElementById('input')

let name;

//////////

// let img = document.querySelector('.image')

// img.addEventListener('click', function() {
//     if (img.getAttribute('src') == 'images/scenario-2.jpg')
//         img.setAttribute('src', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=1200&s=1')
//     else
//         img.setAttribute('src', 'images/scenario-2.jpg')
// })

//////////

//funcs

input.onkeypress = function(event) {
    
    if ((event.key == "Enter" || event.keyCode == 13) && input.value !== '') {
        name = input.value;
        input.parentNode.removeChild(input)
        advanceTo(scenario.two)
    }    

}

let changeText = function(words) {
    text.innerHTML = words.replace("Твоё имя", name)
};

let changeImage = function(img) {
    images.style.backgroundImage = `url(${img})`
};

let changeButtons = function(buttonList) {
    btnBox.innerHTML = ''

    for (let i = 0; i < buttonList.length; i++) {
        btnBox.innerHTML += `<button onClick=' ${ buttonList[i][1] } '> ${ buttonList[i][0] } </button>"`
    }
}


let advanceTo = function(s) {
    changeImage(s.image)
    changeText(s.text)
    changeButtons(s.buttons)
}

const box = document.querySelector(".box")
const app = document.querySelector(".app")

let startGame = function() {
    box.parentNode.removeChild(box)
    app.classList.add("activeGame")
    document.body.classList.add("activeBody")
}

//paths
let scenario = {
    one: {
        image: "https://phonoteka.org/uploads/posts/2021-05/1621558940_3-phonoteka_org-p-dozhd-anime-fon-bez-lyudei-3.jpg",
        text: "Вы наконец-то решили вернуться домой. Ваше имя?\n",
    },
    two: {
        image: "https://stihi.ru/pics/2017/03/22/11519.jpg",
        text: "Твоё имя, вы так промокли! Не мудрено, ведь на улице идёт сильный дождь! Однако можно было взять зонт... <br> Что бы вы хотели сделать?",
        buttons: [["Взять зонт и пойти дальше по делам", "advanceTo(scenario.three)"], ["Зайти в дом, привести себя в порядок и отхнуть", "advanceTo(scenario.four)"]]
    },
    three: {
        image: "https://avatars.dzeninfra.ru/get-zen_doc/135437/pub_5e44fe3dabb5074fff3a712d_5e44fff1913b3d225706c8fa/scale_1200",
        text: "По дороге вы встретили своего друга и поспорили с ним. В случае вашей победы в игре, он выполнит ваше желание.",
        buttons: [["Продолжить...", "advanceTo(scenario.four)"]]
    },
    four: {
        image: "https://институтвоспитания.рф/upload/iblock/5cf/goutm2ls68m08219botm3y1cczd7thfp.png",
        text: "Однако у вас есть выбор:",
        buttons: [["Сыграть в игру - 'Крестики-нолики'", 'advanceTo(scenario.five)'], ['Пойти дальше по делам', 'advanceTo(scenario.three)'], ['...Начать сначала...', 'advanceTo(scenario.one)']]
    },
    five: {
        image: "https://avatars.mds.yandex.net/get-games/1881957/2a0000016ebd53c5883dff6c266726bec2d4/orig",
        text: "",
        buttons: [['Начать игру','startGame()'], ['Всё-таки отказаться и уйти', 'advanceTo(scenario.six)']]
    },
    six: {
        image: "images/scenario-2.jpg",
        text: "Вы благополучно отказались от игры и ушли по своим делам..."
    }
}



/* Tic-Tac GAME */
let items = document.getElementsByClassName("app__block")
let movePlayer = true;
let game = true;


for (let i = 0; i < items.length; i++) {
    items[i].addEventListener("click", () => {

        if ( !items[i].classList.contains("active") ) {

            if ( movePlayer ) {
            
                if (items[i].innerHTML == "") {
                    items[i].innerHTML = 'x'
                    items[i].classList.add('active')
                    items[i].classList.add('active_x')
                }

                let result = checkMap()
                if (result.val) {
                    game = false;
                    
                    setTimeout(function() {
                        exit(result)
                    }, 1)
                }

                movePlayer = !movePlayer
            }

            if (game) {
                setTimeout(function() {
                    botMove()
                }, 200);
            }

        }

    })
}

function botMove() {
    let items = document.querySelectorAll(".app__block:not(.active)")
    let step = getRandomInt(items.length)

    items[step].innerHTML = 'o';
    items[step].classList.add('active')
    items[step].classList.add('active_o')

    let result = checkMap()
    if (result.val) {
        setTimeout(function() {
            exit(result)
        }, 1)
    }

    movePlayer = !movePlayer
}

function getRandomInt(length) {
    return Math.floor(Math.random() * Math.floor(length))
}

function checkMap() {
    let block = document.querySelectorAll('.app__block')
    let items = []

    for (let i = 0; i < block.length; i++) {
        items.push(block[i].innerHTML)
        console.log(block[i].innerHTML)
    }
    console.log(items)

    if ( 
        items[0] == 'x' && items[1] == 'x' && items[2] == 'x' ||
        items[3] == 'x' && items[4] == 'x' && items[5] == 'x' ||
        items[6] == 'x' && items[7] == 'x' && items[8] == 'x' ||
        items[0] == 'x' && items[3] == 'x' && items[6] == 'x' ||
        items[1] == 'x' && items[4] == 'x' && items[7] == 'x' ||
        items[2] == 'x' && items[5] == 'x' && items[8] == 'x' ||
        items[0] == 'x' && items[4] == 'x' && items[8] == 'x' ||
        items[6] == 'x' && items[4] == 'x' && items[2] == 'x'
    )
        return { val: true, win: "Игрок" }
    else if (
        items[0] == 'o' && items[1] == 'o' && items[2] == 'o' ||
        items[3] == 'o' && items[4] == 'o' && items[5] == 'o' ||
        items[6] == 'o' && items[7] == 'o' && items[8] == 'o' ||
        items[0] == 'o' && items[3] == 'o' && items[6] == 'o' ||
        items[1] == 'o' && items[4] == 'o' && items[7] == 'o' ||
        items[2] == 'o' && items[5] == 'o' && items[8] == 'o' ||
        items[0] == 'o' && items[4] == 'o' && items[8] == 'o' ||
        items[6] == 'o' && items[4] == 'o' && items[2] == 'o'
    )
        return { val: true, win: "Бот" }

    else if (items.includes("") == 0)
        return { val: true, win: "Ничья" }

    return { val: false }
}

function exit(obj) {
    alert("GAME OVER! Winner of the game is: " + obj.win)
    location.reload()
}


advanceTo(scenario.one)