console.log("DASHBOARD.JS CARGADO");

document.addEventListener("DOMContentLoaded", function () {

    // ==============================
    // Psicología
    // ==============================

    let estadoPsicologiaJS =
        localStorage.getItem("estadoPsicologia");

    let elementoPsicologia =
        document.getElementById("estadoPsicologia");

    let botonPsicologia =
        document.getElementById("botonPsicologia");

    if (elementoPsicologia && botonPsicologia) {

        if (estadoPsicologiaJS === "inactivo") {

            elementoPsicologia.innerHTML =
                "🔴 Curso temporalmente inactivo";

            botonPsicologia.innerHTML =
                "🚫 Curso no disponible";

            botonPsicologia.removeAttribute("href");

            botonPsicologia.style.pointerEvents = "none";
            botonPsicologia.style.opacity = "0.6";

        } else {

            elementoPsicologia.innerHTML =
                "🟢 Curso disponible";

            botonPsicologia.style.pointerEvents = "auto";
            botonPsicologia.style.opacity = "1";
        }
    }


    // ==============================
    // Educación
    // ==============================

    let estadoEducacionJS =
        localStorage.getItem("estadoEducacion");

    let elementoEducacion =
        document.getElementById("estadoEducacion");

    let botonEducacion =
        document.getElementById("botonEducacion");

    if (elementoEducacion && botonEducacion) {

        if (estadoEducacionJS === "inactivo") {

            elementoEducacion.innerHTML =
                "🔴 Curso temporalmente inactivo";

            botonEducacion.innerHTML =
                "🚫 Curso no disponible";

            botonEducacion.removeAttribute("href");

            botonEducacion.style.pointerEvents = "none";
            botonEducacion.style.opacity = "0.6";

        } else {

            elementoEducacion.innerHTML =
                "🟢 Curso disponible";

            botonEducacion.style.pointerEvents = "auto";
            botonEducacion.style.opacity = "1";
        }
    }


    // ==============================
    // Técnicas de estudio
    // ==============================

    let estadoTecnicasJS =
        localStorage.getItem("estadoTecnicas");

    let elementoTecnicas =
        document.getElementById("estadoTecnicas");

    let botonTecnicas =
        document.getElementById("botonTecnicas");

    if (elementoTecnicas && botonTecnicas) {

        if (estadoTecnicasJS === "inactivo") {

            elementoTecnicas.innerHTML =
                "🔴 Curso temporalmente inactivo";

            botonTecnicas.innerHTML =
                "🚫 Curso no disponible";

            botonTecnicas.removeAttribute("href");

            botonTecnicas.style.pointerEvents = "none";
            botonTecnicas.style.opacity = "0.6";

        } else {

            elementoTecnicas.innerHTML =
                "🟢 Curso disponible";

            botonTecnicas.style.pointerEvents = "auto";
            botonTecnicas.style.opacity = "1";
        }
    }

});