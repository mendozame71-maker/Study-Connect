const usuarioActivo =
    JSON.parse(localStorage.getItem("usuarioActivo"));

if (!usuarioActivo) {

  window.location.href = "../login.html";

} else {

    // ========================================
    // ASEGURAR QUE EXISTA EL PROGRESO
    // ========================================

    if (!usuarioActivo.progreso) {
        usuarioActivo.progreso = {};
    }

    if (!usuarioActivo.progreso.educacion) {
        usuarioActivo.progreso.educacion = {};
    }

    if (!usuarioActivo.progreso.tecnicas) {
        usuarioActivo.progreso.tecnicas = {};
    }

    if (!usuarioActivo.progreso.psicologia) {
        usuarioActivo.progreso.psicologia = {};
    }


    // ========================================
    // FUNCIÓN PARA CALCULAR PROGRESO
    // ========================================

    function calcularProgreso(curso, totalLecciones) {

        if (!curso) return 0;

        let completadas = 0;

        for (let i = 1; i <= totalLecciones; i++) {

            if (curso["leccion" + i] === true) {
                completadas++;
            }

        }

        return Math.round(
            (completadas / totalLecciones) * 100
        );
    }


    // ========================================
    // EDUCACIÓN
    // ========================================

    const educacion =
        calcularProgreso(
            usuarioActivo.progreso.educacion,
            5
        );
        console.log("EDUCACIÓN CALCULADA:", educacion);
console.log(
    "PROGRESO EDUCACIÓN:",
    usuarioActivo.progreso.educacion
);

    const porcentajeEducacion =
        document.getElementById("porcentajeEducacion");

        if (porcentajeEducacion) {

    porcentajeEducacion.textContent =
        educacion + "%";
}
        const barraEducacion =
    document.getElementById("barraEducacion");

if (barraEducacion) {
    barraEducacion.value = educacion;
}


    // ========================================
    // TÉCNICAS DE ESTUDIO
    // ========================================

    const tecnicas =
        calcularProgreso(
            usuarioActivo.progreso.tecnicas,
            4
        );

    const porcentajeTecnicas =
        document.getElementById("porcentajeTecnicas");

    if (porcentajeTecnicas) {

        porcentajeTecnicas.textContent =
            tecnicas + "%";
    }
    const barraTecnicas =
    document.getElementById("barraTecnicas");

if (barraTecnicas) {
    barraTecnicas.value = tecnicas;
}


    // ========================================
    // PSICOLOGÍA
    // ========================================

    const psicologia =
        calcularProgreso(
            usuarioActivo.progreso.psicologia,
            8
        );

    const porcentajePsicologia =
        document.getElementById("porcentajePsicologia");

    if (porcentajePsicologia) {

        porcentajePsicologia.textContent =
            psicologia + "%";
    }
    const barraPsicologia =
    document.getElementById("barraPsicologia");

if (barraPsicologia) {
    barraPsicologia.value = psicologia;
}


    // ========================================
    // PROGRESO GENERAL
    // ========================================

    const totalLecciones = 17;

    const completadas =
        (educacion / 100) * 5 +
        (tecnicas / 100) * 4 +
        (psicologia / 100) * 8;

    const progresoGeneral =
        Math.round(
            (completadas / totalLecciones) * 100
        );

    const progresoGeneralTexto =
        document.getElementById("progresoGeneral");

    if (progresoGeneralTexto) {

        progresoGeneralTexto.textContent =
            progresoGeneral + "%";
    }


    // ========================================
    // ESTADOS
    // ========================================

    function mostrarEstado(porcentaje, elemento) {

        if (!elemento) return;

        if (porcentaje === 100) {

            elemento.textContent =
                "✅ Curso completado";

        } else if (porcentaje > 0) {

            elemento.textContent =
                "🟡 En progreso";

        } else {

            elemento.textContent =
                "⚪ Sin iniciar";
        }
    }


    mostrarEstado(
        educacion,
        document.getElementById("estadoEducacion")
    );

    mostrarEstado(
        tecnicas,
        document.getElementById("estadoTecnicas")
    );

    mostrarEstado(
        psicologia,
        document.getElementById("estadoPsicologia")
    );


 // ========================================
// CERTIFICADOS
// ========================================

function mostrarCertificado(
    porcentaje,
    elemento,
    curso
) {

    if (!elemento) return;

    if (porcentaje === 100) {

        elemento.innerHTML =

            "🏆 ¡Felicidades!<br><br>" +

            "<a href='certificado.html?curso=" +

            encodeURIComponent(curso) +

            "'>" +

            "🎓 Ver mi certificado" +

            "</a>";

    } else {

        elemento.innerHTML = "";
    }
}


mostrarCertificado(
    educacion,
    document.getElementById("certificadoEducacion"),
    "Educación"
);


mostrarCertificado(
    tecnicas,
    document.getElementById("certificadoTecnicas"),
    "Técnicas de estudio"
);


mostrarCertificado(
    psicologia,
    document.getElementById("certificadoPsicologia"),
    "Psicología"

);
    

// ========================================
// INSIGNIAS
// ========================================

const insignias = document.getElementById("insignias");

if (insignias) {

    let listaInsignias = "";

    if (educacion === 100) {
        listaInsignias += "<p>🏅 Primer curso completado</p>";
    }

    if (tecnicas === 100) {
        listaInsignias += "<p>📚 Experto en técnicas de estudio</p>";
    }

    if (psicologia === 100) {
        listaInsignias += "<p>🧠 Conocimientos en psicología</p>";
    }

    if (
        educacion === 100 &&
        tecnicas === 100 &&
        psicologia === 100
    ) {
        listaInsignias += "<p>🏆 Estudiante destacado</p>";
    }

    if (listaInsignias !== "") {
        insignias.innerHTML = listaInsignias;
    }
}
}