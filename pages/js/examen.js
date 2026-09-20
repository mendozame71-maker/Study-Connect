// ===============================
// EXAMEN PSICOLOGÍA
// ===============================

const botonExamen = document.getElementById("btnEnviarExamen");
// Detectar el curso según la página
let curso = "";
let nombreCurso = "";

if (window.location.pathname.includes("psicologia-examen")) {
    curso = "psicologia";

    nombreCurso = "Psicología";

} else if (window.location.pathname.includes("educacion-examen")) {

    curso = "educacion";
    nombreCurso = "Educación";

}

if (botonExamen) {

    botonExamen.onclick = function () {

        let puntos = 0;

        const respuesta1 = document.querySelector('input[name="p1"]:checked');
        const respuesta2 = document.querySelector('input[name="p2"]:checked');


        // Pregunta 1
        if (respuesta1 && respuesta1.value === "correcto") {
            puntos++;
        }


        // Pregunta 2
        if (respuesta2 && respuesta2.value === "correcto") {
            puntos++;
        }


        const totalPreguntas = 2;

        const porcentaje = Math.round(
            (puntos / totalPreguntas) * 100
        );


        document.getElementById("resultado").innerHTML =
            "Resultado: " + puntos +
            " de " + totalPreguntas +
            " puntos<br>" +
            "Calificación: " + porcentaje + "%";


        // Usuario activo
        const usuarioActivo = JSON.parse(
            localStorage.getItem("usuarioActivo")
        );


        let usuarios = JSON.parse(
            localStorage.getItem("usuarios")
        ) || [];


        if (!usuarioActivo) {

            alert("No hay usuario iniciado");
            return;

        }


        const indice = usuarios.findIndex(
            u => u.correo === usuarioActivo.correo
        );


        if (indice === -1) {

            alert("Usuario no encontrado");
            return;

        }



        // ===============================
        // EXAMEN APROBADO
        // ===============================

        if (porcentaje >= 70) {


            usuarios[indice].progreso[curso].examen = true;


            document.getElementById("resultado").innerHTML +=
                "<br>✅ Examen aprobado";


            // Crear número de certificado

            const numeroCertificado =
    curso === "educacion"
        ? "SC-2026-EDU-583214"
        : "SC-2026-PSI-293658";

                usuarioActivo.certificado = numeroCertificado;
                // Guardar certificado actual

            localStorage.setItem(
                "certificadoActual",
                numeroCertificado
            );



            // Actualizar estudiantes

            let estudiantes = JSON.parse(
                localStorage.getItem("estudiantes")
            ) || [];



          let indiceEstudiante = estudiantes.findIndex(
    e =>
        e.nombre.toLowerCase() === usuarioActivo.nombre.toLowerCase()
        &&
        e.curso &&
        e.curso.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") ===
        nombreCurso.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
);

if (indiceEstudiante === -1) {

    indiceEstudiante = estudiantes.findIndex(
        e =>
            e.nombre.toLowerCase() ===
            usuarioActivo.nombre.toLowerCase()
    );

}



            if (indiceEstudiante !== -1) {


                estudiantes[indiceEstudiante].curso =
                nombreCurso;


                estudiantes[indiceEstudiante].progreso =
                    "100%";


                estudiantes[indiceEstudiante].examen =
                    "Aprobado";


                estudiantes[indiceEstudiante].certificado =
                    numeroCertificado;



                localStorage.setItem(
                    "estudiantes",
                    JSON.stringify(estudiantes)
                );

            }



            // Crear registro del certificado

            const certificado = {

                numero: numeroCertificado,

                nombre: usuarioActivo.nombre,

                curso: nombreCurso,

                fecha: new Date()
                    .toLocaleDateString("es-MX"),

                estado: "Aprobado"

            };



            localStorage.setItem(
                "certificado_" + numeroCertificado,
                JSON.stringify(certificado)
            );



            document.getElementById("resultado").innerHTML +=
                "<br>🎓 Certificado generado: " +
                numeroCertificado;



        } else {


           usuarios[indice].progreso[curso].examen = false;


            document.getElementById("resultado").innerHTML +=
                "<br>❌ Examen no aprobado";


        }



        // Guardar cambios del usuario

        localStorage.setItem(
            "usuarioActivo",
            JSON.stringify(usuarios[indice])
        );


        localStorage.setItem(
            "usuarios",
            JSON.stringify(usuarios)
        );


    };

}