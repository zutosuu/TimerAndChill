"use strict";

const tiempoTimerPrin = document.querySelector(".timer-principal__tiempo").children;
const btnModificar = document.querySelector(".boton-modificar");
const btnPlay = document.querySelector(".boton-play");
const imgBtnModificar = document.querySelector(".img-btn-modificar");
const imgBtnPlay = document.querySelector(".imagen-play");
const filaMasTiempo = document.querySelector(".timer-principal__mas-tiempo");
const filaMenosTiempo = document.querySelector(".timer-principal__menos-tiempo");
const btnDiaNoche = document.querySelector(".btn-dia-noche");
const imgBtnDiaNoche = document.querySelector(".img-btn-dia-noche");

let horas = 0,
    mins = 0,
    secs = 0;
let estadoModificar = false,
    estadoPlay = false,
    estadoDiaNoche = true;
var timer;

//Texto Cambiante
const typed = new Typed(".typed", {
    strings: ["Studying", "Reading", "Drawing", "Writing", "Sleeping", "Resting"],
    loop: true,
    typeSpeed: 150,
    backSpeed: 150,
    startDelay: 300,
    backDelay: 3000,
    cursorChar: "|",
    contentType: "html",
});

//Boton Día Noche
btnDiaNoche.addEventListener("click", () => {
    estadoDiaNoche = !(estadoDiaNoche);
    if (estadoDiaNoche) {
        btnDiaNoche.style = "grid-column: 1/2";
        imgBtnDiaNoche.setAttribute("src", "img/sol.png");
        document.documentElement.style.setProperty("--color-fondo", "#f5ffcb");
        document.documentElement.style.setProperty("--color-botones-reloj", "#516091");
        document.documentElement.style.setProperty("--color-btn-dia-noche", "#eef3ad");
        document.documentElement.style.setProperty("--color-header", "#74b3c1");
        document.documentElement.style.setProperty("--color-fondo-reloj", "#eef3ad");
        document.documentElement.style.setProperty("--color-segundero", "#75b79e");
        document.documentElement.style.setProperty("--color-bontones-modificar-hora", "#516091");
    } else {
        btnDiaNoche.style = "grid-column: 3/4";
        imgBtnDiaNoche.setAttribute("src", "img/luna.png");
        document.documentElement.style.setProperty("--color-fondo", "#516091");
        document.documentElement.style.setProperty("--color-botones-reloj", "#abebbe");
        document.documentElement.style.setProperty("--color-btn-dia-noche", "#516091");
        document.documentElement.style.setProperty("--color-header", "#6a8caf");
        document.documentElement.style.setProperty("--color-fondo-reloj", "#6a8caf");
        document.documentElement.style.setProperty("--color-segundero", "#eef3ad");
        document.documentElement.style.setProperty("--color-bontones-modificar-hora", "#eef3ad");
    }
});

//Botones Para Modificar Tiempo
const modificarTiempo = () => {
    imgBtnModificar.setAttribute("src", "img/guardar.png")
    filaMasTiempo.style = "display:flex"
    filaMenosTiempo.style = "display:flex"
}

filaMasTiempo.children[0].addEventListener("click", () => {
    (horas < 99) ? horas++ : horas = 0;
    tiempoTimerPrin[0].innerHTML = (horas > 9) ? horas : `0${horas}`;
});

filaMasTiempo.children[1].addEventListener("click", () => {
    (mins < 59) ? mins++ : mins = 0;
    tiempoTimerPrin[2].innerHTML = (mins > 9) ? mins : `0${mins}`;;
});

filaMasTiempo.children[2].addEventListener("click", () => {
    (secs < 59) ? secs++ : secs = 0;
    tiempoTimerPrin[3].innerHTML = (secs > 9) ? secs : `0${secs}`;;
});

filaMenosTiempo.children[0].addEventListener("click", () => {
    (horas > 0) ? horas-- : horas = 99;
    tiempoTimerPrin[0].innerHTML = (horas > 9) ? horas : `0${horas}`;
});

filaMenosTiempo.children[1].addEventListener("click", () => {
    (mins > 0) ? mins-- : mins = 59;
    tiempoTimerPrin[2].innerHTML = (mins > 9) ? mins : `0${mins}`;;
});

filaMenosTiempo.children[2].addEventListener("click", () => {
    (secs > 0) ? secs-- : secs = 59;;
    tiempoTimerPrin[3].innerHTML = (secs > 9) ? secs : `0${secs}`;;
});

const guardarTiempo = () => {
    imgBtnModificar.setAttribute("src", "img/boligrafo.png")
    filaMasTiempo.style = "display:none"
    filaMenosTiempo.style = "display:none"
}

btnModificar.addEventListener("click", () => {
    estadoModificar = !(estadoModificar);
    console.log(estadoModificar);
    if (estadoModificar) modificarTiempo();
    else guardarTiempo();
})

const cuentaRegresiva = () => {
    timer = setInterval(() => {
        if (secs == 0) {
            if (mins == 0) {
                if (horas == 0) {
                    estadoPlay = false;
                    imgBtnPlay.setAttribute("src", "img/play.png");
                    new Notification("Fin Del Temporizador");
                    clearInterval(timer);
                } else {
                    horas--;
                    mins = 59;
                    secs = 59;
                }
            } else {
                mins--;
                secs = 59;
            }
        } else {
            secs--;
        }
        tiempoTimerPrin[0].innerHTML = (horas > 9) ? horas : `0${horas}`;
        tiempoTimerPrin[2].innerHTML = (mins > 9) ? mins : `0${mins}`;;
        tiempoTimerPrin[3].innerHTML = (secs > 9) ? secs : `0${secs}`;;
    }, 1000);
}

btnPlay.addEventListener("click", () => {
    if (horas || mins || secs) {
        estadoPlay = !(estadoPlay);
        if (estadoPlay) {
            imgBtnPlay.setAttribute("src", "img/detener.png");
            cuentaRegresiva();
        } else {
            imgBtnPlay.setAttribute("src", "img/play.png");
            clearInterval(timer);
        }
    }
})