let isPlayerOne = true;
let cuadros = document.getElementsByClassName("cuadro")
let reloadB = document.querySelector('#reload')
let results = document.querySelector('#results')
let flag = false

reloadB.addEventListener('click', e => {
    for (let i = 0; i < cuadros.length; i++) {
        cuadros[i].innerHTML = ''
    }
    results.innerHTML = ''
    reiniciar()
    flag=false
})


for (let i = 0; i < cuadros.length; i++) {
    cuadros[i].addEventListener('click', (e) => {
        if (flag === false) {
            userMove(e)
        } else {
            return false;
        }
    });
}

const showWinner = player => {
    results.innerHTML = player + ' win'
    pausar()
    flag=true
}

const showNone = () => {
    if (endGame(cuadros) === true) {
        results.innerHTML = 'Empate'
        pausar()
        flag=true
    }
}

const endGame = (array) => {
    let contador = 0
    for (let i = 0; i < array.length; i++) {
        if (array[i].innerHTML.length) {
            contador++
        }
    }
    if (contador === 9) {
        return true
    } else {
        return false
    }

}

const checkLine = (c1, c2, c3) => {
    if (cuadros[c1].innerHTML.length &&
        cuadros[c1].innerHTML === cuadros[c2].innerHTML &&
        cuadros[c2].innerHTML === cuadros[c3].innerHTML
    ) {
        showWinner(cuadros[c1].innerHTML)
    } else showNone()


}

function userMove(e) {
    let cValue = e.target.innerHTML;
    iniciar()
    if (!cValue.length) {
        e.target.innerHTML = isPlayerOne ? 'x' : 'o'
        isPlayerOne = !isPlayerOne

        checkLine(0, 1, 2);
        checkLine(3, 4, 5);
        checkLine(6, 7, 8);
        checkLine(0, 3, 6);
        checkLine(1, 4, 7);
        checkLine(2, 5, 8);
        checkLine(0, 4, 8);
        checkLine(6, 4, 2);
    }
}

let tiempoRef = Date.now()
let cronometrar = false
let acumulado = 0

function iniciar() {
    cronometrar = true
}

function pausar() {
    cronometrar = false
}

function reiniciar() {
    cronometrar = false
    acumulado = 0
}

setInterval(() => {
    let tiempo = document.getElementById("tiempo")
    if (cronometrar) {
        acumulado += Date.now() - tiempoRef
    }
    tiempoRef = Date.now()
    tiempo.innerHTML = formatearMS(acumulado)
}, 1000 / 60);

function formatearMS(tiempo_ms) {
    let MS = tiempo_ms % 1000

    let St = Math.floor(((tiempo_ms - MS) / 1000))

    let S = St % 60
    let M = Math.floor((St / 60) % 60)
    let H = Math.floor((St / 60 / 60))
    Number.prototype.ceros = function (n) {
        return (this + "").padStart(n, 0)
    }

    return H.ceros(2) + ":" + M.ceros(2) + ":" + S.ceros(2) +
        "." + MS.ceros(3)
}