alert("APP.JS CARGADO");
console.log("APP.JS FUNCIONANDO");
alert("app.js cargado correctamente");
alert("app.js cargado");

// ===============================
// BOTÓN ENTRAR
// ===============================

const botonEntrar = document.getElementById("btnEntrar");

if (botonEntrar) {

    botonEntrar.onclick = function () {

        const correo = document.getElementById("correo").value;
        const password = document.getElementById("password").value;

        // Obtener todos los usuarios
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Buscar el usuario
        const usuario = usuarios.find(u =>
            u.correo === correo &&
            u.password === password
        );

        if (!usuario) {
    alert("Correo o contraseña incorrectos.");
    return;
        
}

localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
alert("¡Bienvenido a Study-Connect!");

if (usuario.rol === "admin") {
    window.location.href = "lecciones/admin.html";
} else {
   window.location.href = "dashboard.html";
}
}

 };

    


// ===============================
// BOTÓN REGISTRAR
// ===============================

const botonRegistro = document.getElementById("btnRegistro");


if (botonRegistro) {

    botonRegistro.onclick = function () {
          alert("Entró al botón registro");
       

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const password = document.getElementById("password").value;
        const confirmar = document.getElementById("confirmar").value;

        if (nombre === "" || correo === "" || password === "" || confirmar === "") {
            alert("Completa todos los campos.");
            return;
        }

        if (password !== confirmar) {
            alert("Las contraseñas no coinciden.");
            return;
        }

       const usuario = {

    nombre: nombre,
    correo: correo,
    password: password,

    progreso: {

        psicologia: {
            leccion1:false,
            leccion2:false,
            leccion3:false,
            leccion4:false,
            leccion5:false,
            leccion6:false,
            leccion7:false,
            leccion8:false,
            examen:false
        },

       educacion: {
    leccion1: false,
    leccion2: false,
    leccion3: false,
    leccion4: false,
    leccion5: false,
    examen: false
},

       tecnicas: {
    leccion1: false,
    leccion2: false,
    leccion3: false,
    leccion4: false,
    examen: false
}

    }

};


// Obtener la lista de usuarios
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

// Verificar si el correo ya existe
const existe = usuarios.find(u => u.correo === correo);

if (existe) {

    alert("Este correo ya está registrado.");
    return;

}

// Agregar el nuevo usuario
usuarios.push(usuario);

// Guardar todos los usuarios
localStorage.setItem("usuarios", JSON.stringify(usuarios));
        console.log("Guardando estudiante");
        let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

estudiantes.push({
    nombre: nombre,
    curso: "Sin curso",
    progreso: "0%",
    examen: "Pendiente",
    certificado: "Sin certificado"
});

localStorage.setItem("estudiantes", JSON.stringify(estudiantes));

        alert("¡Cuenta creada correctamente!");

        window.location.href = "login.html";
    };

}
// ===============================
// BOTÓN MARCAR LECCIÓN COMPLETADA
// ===============================

const botonCompletar = document.getElementById("btnCompletar");

if (botonCompletar) {

    botonCompletar.onclick = function () {

        const curso = botonCompletar.dataset.curso;
        const numeroLeccion = botonCompletar.dataset.leccion;

        const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

        if (!usuarioActivo) {
            alert("Debes iniciar sesión");
            return;
        }

        // Marcar la lección como completada
        usuarioActivo.progreso[curso]["leccion" + numeroLeccion] = true;

        localStorage.setItem(
            "usuarioActivo",
            JSON.stringify(usuarioActivo)
        );

        // Actualizar la lista de usuarios
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        const indice = usuarios.findIndex(
            u => u.correo === usuarioActivo.correo
        );

        if (indice !== -1) {
            usuarios[indice] = usuarioActivo;
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
        }

        // ===============================
// SINCRONIZAR PROGRESO CON ADMIN
// ===============================

let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

const estudianteAdmin = estudiantes.find(
    e => e.nombre.toLowerCase() === usuarioActivo.nombre.toLowerCase()
);

if (estudianteAdmin) {

    let completadas = 0;
    let total = 0;

    for (let cursoNombre in usuarioActivo.progreso) {

        let curso = usuarioActivo.progreso[cursoNombre];

        for (let clave in curso) {

            if (clave.startsWith("leccion")) {

                total++;

                if (curso[clave] === true) {
                    completadas++;
                }

            }

        }

    }

    let porcentaje = Math.round((completadas / total) * 100);

    estudianteAdmin.progreso = porcentaje + "%";

    localStorage.setItem(
        "estudiantes",
        JSON.stringify(estudiantes)
    );
}

        botonCompletar.innerHTML = "✔ Lección completada";
        botonCompletar.disabled = true;

        alert("✅ Lección completada correctamente.");
    };

}
// ===============================
// PÁGINA MI PROGRESO
// ===============================

const barraPsicologia = document.getElementById("barraPsicologia");
console.log("Entró a progreso");

if (barraPsicologia) {

    const totalLecciones = 8;

// Obtener el usuario que inició sesión
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

let completadas = 0;
let lista = "";

for (let i = 1; i <= totalLecciones; i++) {

    if (usuarioActivo.progreso.psicologia["leccion" + i]) {

        lista += "✔ Lección " + i + " completada<br>";
        completadas++;

    } else {

        lista += "⬜ Lección " + i + " pendiente<br>";

    }

}
const porcentaje = Math.round((completadas / totalLecciones) * 100);

    console.log("Lecciones completadas:", completadas);
console.log("Total lecciones:", totalLecciones);
console.log("Porcentaje calculado:", porcentaje);

   console.log("Antes de actualizar");

const barra = document.getElementById("barraPsicologia");
const texto = document.getElementById("porcentajePsicologia");

console.log(barra);
console.log(texto);

barra.value = porcentaje;
texto.innerHTML = porcentaje + "%";

console.log("Después de actualizar");

lista = "";


for (let i = 1; i <= totalLecciones; i++) {

if (usuarioActivo.progreso.psicologia["leccion" + i]) {

lista += "✔ Lección " + i + " completada<br>";

} else {

lista += "⬜ Lección " + i + " pendiente<br>";

}

}


document.getElementById("listaPsicologia").innerHTML = lista;
// BOTÓN CONTINUAR PSICOLOGÍA

let siguienteLeccion = 0;

for (let i = 1; i <= totalLecciones; i++) {

if (!usuarioActivo.progreso.psicologia["leccion" + i]) {

    siguienteLeccion = i;
        break;

    }

}

if (siguienteLeccion !== 0) {

    document.getElementById("continuarPsicologia").innerHTML = `
<a href="lecciones/psicologia-leccion${siguienteLeccion}.html" class="boton">
▶ Continuar Lección ${siguienteLeccion}
</a>
`;

} else {

    document.getElementById("continuarPsicologia").innerHTML = `
<p>🎉 Curso completado</p>
`;

}

}



   // PROGRESO EDUCACIÓN

const barraEducacion = document.getElementById("barraEducacion");
const porcentajeEducacionTexto = document.getElementById("porcentajeEducacion");

console.log("Barra:", barraEducacion);
console.log("Texto:", porcentajeEducacionTexto);

if (barraEducacion && porcentajeEducacionTexto) {

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    console.log("Usuario:", usuarioActivo);

    let educacionCompletadas = 0;
    const totalEducacion = 5;

    for (let i = 1; i <= totalEducacion; i++) {

        console.log(
            "Lección", i,
            usuarioActivo.progreso.educacion["leccion" + i]
        );

        if (usuarioActivo.progreso.educacion["leccion" + i]) {
            educacionCompletadas++;
        }
    }

    console.log("Completadas:", educacionCompletadas);

    const porcentajeEducacion =
        Math.round((educacionCompletadas / totalEducacion) * 100);

    console.log("Porcentaje:", porcentajeEducacion);

    barraEducacion.value = porcentajeEducacion;
    porcentajeEducacionTexto.innerHTML = porcentajeEducacion + "%";
}
    // ESTADO DEL EXAMEN DE PSICOLOGÍA

const estadoExamen = document.getElementById("estadoExamen");

if (estadoExamen) {

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    const examen = usuarioActivo.progreso.psicologia.examen;

    if (examen === true) {

        estadoExamen.innerHTML =
        "Examen final: ✅ Aprobado";

    } else {

        estadoExamen.innerHTML =
        "Examen final: ❌ No aprobado";

    }

}

// CERTIFICADO

const certificado = document.getElementById("certificado");

if (certificado) {

    if (completadas === totalLecciones &&
        localStorage.getItem("psicologiaExamen") === "aprobado") {

        certificado.innerHTML = `
<a href="lecciones/certificado-psicologia.html" class="boton">
🎓 Descargar certificado
</a>
`;

    }
}

// PROGRESO TÉCNICAS DE ESTUDIO

   const barraTecnicas = document.getElementById("barraTecnicas");
const porcentajeTecnicasTexto = document.getElementById("porcentajeTecnicas");

if (barraTecnicas && porcentajeTecnicasTexto) {

    const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

    let tecnicasCompletadas = 0;
    const totalTecnicas = 4;

    for (let i = 1; i <= totalTecnicas; i++) {

        if (usuarioActivo.progreso.tecnicas["leccion" + i]) {
            tecnicasCompletadas++;
        }

    }

    const porcentajeTecnicas =
        Math.round((tecnicasCompletadas / totalTecnicas) * 100);

    barraTecnicas.value = porcentajeTecnicas;
    porcentajeTecnicasTexto.innerHTML = porcentajeTecnicas + "%";

}
   // INSIGNIAS

const insignias = document.getElementById("insignias");

if (insignias) {

    const examen = localStorage.getItem("psicologiaExamen");

    if (examen === "aprobado") {

        insignias.innerHTML =
        "🏅 Insignia obtenida:<br><br>" +
        "🧠 Explorador de Psicología<br>" +
        "Completaste el examen final.";

    }

}



// ===============================
// EXAMEN PSICOLOGÍA
// ===============================




    const botonExamen = document.getElementById("btnEnviarExamen");

if (botonExamen) {

    botonExamen.onclick = function () {

        let puntos = 0;

        const respuesta1 = document.querySelector('input[name="p1"]:checked');
        const respuesta2 = document.querySelector('input[name="p2"]:checked');


        if (respuesta1 && respuesta1.value === "correcto") {
            puntos++;
        }


        if (respuesta2 && respuesta2.value === "correcto") {
            puntos++;
        }


        const totalPreguntas = 2;

        const porcentaje = Math.round((puntos / totalPreguntas) * 100);


        document.getElementById("resultado").innerHTML =
            "Resultado: " + puntos + " de " + totalPreguntas + " puntos<br>" +
            "Calificación: " + porcentaje + "%";


        // Obtener usuario activo
        const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

        // Obtener usuarios registrados
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];


        if (usuarioActivo) {

            const indice = usuarios.findIndex(
                u => u.correo === usuarioActivo.correo
            );


            if (indice !== -1) {


                if (porcentaje >= 70) {

                    usuarios[indice].progreso.psicologia.examen = true;

                    document.getElementById("resultado").innerHTML +=
                    "<br>✅ Examen aprobado";


                } else {

                    usuarios[indice].progreso.psicologia.examen = false;

                    document.getElementById("resultado").innerHTML +=
                    "<br>❌ Examen no aprobado";

                }


                localStorage.setItem(
                    "usuarioActivo",
                    JSON.stringify(usuarios[indice])
                );


                localStorage.setItem(
                    "usuarios",
                    JSON.stringify(usuarios)
                );

            }

        }

    };

}
// ===============================
// NOMBRE EN CERTIFICADO
// ===============================

const nombreAlumno = document.getElementById("nombreAlumno");

if (nombreAlumno) {

    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuario) {

        nombreAlumno.innerHTML = usuario.nombre;

        let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

        let estudiante = estudiantes.find(e => e.nombre === usuario.nombre);

        let numero = "";

        if (estudiante &&
            estudiante.certificado &&
            estudiante.certificado !== "Sin certificado") {

            numero = estudiante.certificado;

        } else {

            numero = "SC-" + Date.now();

        }

        const numeroCertificado = document.getElementById("numeroCertificado");

        if (numeroCertificado) {

            numeroCertificado.innerHTML =
                "Número de certificado: " + numero;

        }

        const codigoQR = document.getElementById("codigoQR");

        if (codigoQR) {

            const enlace =
                window.location.origin +
                "/Study-Connect/pages/usuarios/verificar.html?certificado=" +
                numero;

            codigoQR.src =
                "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
                encodeURIComponent(enlace);

        }

        const certificado = {

            numero: numero,
            nombre: usuario.nombre,
            curso: "Psicología",
            fecha: new Date().toLocaleDateString("es-MX"),
            estado: "Aprobado"

        };

        localStorage.setItem(
            "certificado_" + numero,
            JSON.stringify(certificado)
        );

    }

}
// ===============================
// VERIFICAR CERTIFICADO
// ===============================

const btnVerificar = document.getElementById("btnVerificar");

if (btnVerificar) {

    // Leer certificado desde la URL
    const parametros = new URLSearchParams(window.location.search);
    const certificadoURL = parametros.get("certificado");

    if (certificadoURL) {

        document.getElementById("numeroBuscar").value =
            certificadoURL;

        verificarCertificado(certificadoURL);

    }

    btnVerificar.onclick = function () {

        const numero =
            document.getElementById("numeroBuscar").value.trim();

        verificarCertificado(numero);

    };

}


function verificarCertificado(numero) {

    const resultado =
        document.getElementById("resultadoVerificacion");

    const certificado = JSON.parse(
        localStorage.getItem("certificado_" + numero)
    );

    if (certificado) {

        resultado.innerHTML = `
            <h3>✅ Certificado válido</h3>

            <p><strong>Alumno:</strong> ${certificado.nombre}</p>

            <p><strong>Curso:</strong> ${certificado.curso}</p>

            <p><strong>Estado:</strong> ${certificado.estado}</p>

            <p><strong>Fecha:</strong> ${certificado.fecha}</p>

            <p><strong>Número:</strong> ${certificado.numero}</p>
        `;

    } else {

        resultado.innerHTML = `
            <h3>❌ Certificado no encontrado</h3>
        `;

    }

}
// ===============================
// PANEL DE ADMINISTRACIÓN
// ===============================

const totalUsuarios = document.getElementById("totalUsuarios");
const totalCertificados = document.getElementById("totalCertificados");
const totalExamenes = document.getElementById("totalExamenes");

if (totalUsuarios) {

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    totalUsuarios.innerHTML = usuarios.length;

}

if (totalCertificados) {

    let certificados = 0;

    for (let i = 0; i < localStorage.length; i++) {

        const clave = localStorage.key(i);

        if (clave.startsWith("certificado_")) {

            certificados++;

        }

    }

    totalCertificados.innerHTML = certificados;

}

if (totalExamenes) {

    const examen = localStorage.getItem("psicologiaExamen");

    totalExamenes.innerHTML =
        examen === "aprobado" ? 1 : 0;

}

    function verCertificado(numero) {

    const certificado = JSON.parse(
        localStorage.getItem("certificado_" + numero)
    );

    if (certificado) {

        localStorage.setItem(
            "certificadoVer",
            JSON.stringify(certificado)
        );

        window.location.href = "../certificado-psicologia.html";

    } else {

        alert("Certificado no encontrado");

    }

    }





