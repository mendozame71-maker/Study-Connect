console.log("DASHBOARD.JS CARGADO");
document.addEventListener("DOMContentLoaded", function(){

    let estado = localStorage.getItem("estadoPsicologia");

    let estadoCurso = document.getElementById("estadoPsicologia");
    let botonCurso = document.getElementById("botonPsicologia");

    if(!estadoCurso || !botonCurso){
        return;
    }

    if(estado === "inactivo"){

        estadoCurso.innerHTML = "🔴 Curso temporalmente inactivo";

        botonCurso.innerHTML = "🚫 Curso no disponible";

        botonCurso.removeAttribute("href");

        botonCurso.style.pointerEvents = "none";
        botonCurso.style.opacity = "0.6";

    }else{

        estadoCurso.innerHTML = "🟢 Curso disponible";

        botonCurso.innerHTML = "Entrar al curso";

        botonCurso.setAttribute("href", "psicologia.html");

        botonCurso.style.pointerEvents = "auto";
        botonCurso.style.opacity = "1";

    }

});

let estadoEducacion = localStorage.getItem("estadoEducacion");

let elementoEducacion = document.getElementById("estadoEducacion");
let botonEducacion = document.getElementById("botonEducacion");

if(elementoEducacion && botonEducacion){

    if(estadoEducacion === "inactivo"){

        elementoEducacion.innerHTML = "🔴 Curso temporalmente inactivo";

        botonEducacion.innerHTML = "🚫 Curso no disponible";

        botonEducacion.removeAttribute("href");

        botonEducacion.style.pointerEvents = "none";
        botonEducacion.style.opacity = "0.6";

    }else{

        elementoEducacion.innerHTML = "🟢 Curso disponible";

        botonEducacion.innerHTML = "Entrar al curso";

        botonEducacion.setAttribute("href", "educacion.html");

        botonEducacion.style.pointerEvents = "auto";
        botonEducacion.style.opacity = "1";

    }

}

let estadoPsicologia = localStorage.getItem("estadoPsicologia");

let elementoPsicologia = document.getElementById("estadoPsicologia");
let botonPsicologia = document.getElementById("botonPsicologia");

if(elementoPsicologia && botonPsicologia){

    if(estadoPsicologia === "inactivo"){

        elementoPsicologia.innerHTML = "🔴 Curso temporalmente inactivo";

        botonPsicologia.innerHTML = "🚫 Curso no disponible";

        botonPsicologia.removeAttribute("href");

        botonPsicologia.style.pointerEvents = "none";
        botonPsicologia.style.opacity = "0.6";

    }else{

        elementoPsicologia.innerHTML = "🟢 Curso disponible";

        botonPsicologia.innerHTML = "Entrar al curso";

        botonPsicologia.setAttribute("href", "psicologia.html");

        botonPsicologia.style.pointerEvents = "auto";
        botonPsicologia.style.opacity = "1";

    }

}

setTimeout(function(){

    let estado = localStorage.getItem("estadoEducacion");

    let elemento = document.getElementById("estadoEducacion");
    let boton = document.getElementById("botonEducacion");

    if(!elemento || !boton){
        return;
    }

    if(estado === "inactivo"){

        elemento.innerHTML = "🔴 Curso temporalmente inactivo";

        boton.innerHTML = "🚫 Curso no disponible";

        boton.removeAttribute("href");

        boton.style.pointerEvents = "none";
        boton.style.opacity = "0.6";

    }

}, 100);
