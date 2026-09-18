function editarCurso(nombreCurso){

    let nuevoNombre = prompt(
        "Cambiar nombre del curso:",
        nombreCurso
    );

    if(nuevoNombre){

        if(nombreCurso === "Psicología"){

            document.getElementById("nombrePsicologia").innerHTML =
            "🧠 " + nuevoNombre;

            localStorage.setItem("nombrePsicologia", nuevoNombre);

            actualizarCursoEstudiantes("Psicología", nuevoNombre);

        }

        if(nombreCurso === "Educación"){

            document.getElementById("nombreEducacion").innerHTML =
            "📚 " + nuevoNombre;

            localStorage.setItem("nombreEducacion", nuevoNombre);
            actualizarCursoEstudiantes("Educación", nuevoNombre);

        }

        if(nombreCurso === "Técnicas de estudio"){

            document.getElementById("nombreEstudio").innerHTML =
            "📖 " + nuevoNombre;

            localStorage.setItem("nombreEstudio", nuevoNombre);
            actualizarCursoEstudiantes("Técnicas de estudio", nuevoNombre);

        }

        alert("Curso actualizado correctamente");

    }

}

function mostrarCursos(){

    let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

    let tabla = document.getElementById("listaCursos");

    tabla.innerHTML = "";

    cursos.forEach(function(curso, indice){

        // Contar estudiantes inscritos en este curso
        let inscritos = estudiantes.filter(function(estudiante){

            return estudiante.curso === curso.nombre;

        }).length;

        tabla.innerHTML += `
        <tr>
            <td>${curso.nombre}</td>
            <td>${inscritos}</td>
            <td>${curso.estado} ✅</td>
            <td>
                <button onclick="editarCursoNuevo(${indice})">
                    ✏️ Editar
                </button>

                <button onclick="eliminarCurso(${indice})">
                    🗑️ Eliminar
                </button>
            </td>
        </tr>
        `;

    });

}
function eliminarCurso(indice){

    let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
    if(confirm("¿Seguro que quieres eliminar este curso?")){

        let nombreCursoEliminado = cursos[indice].nombre;

        cursos.splice(indice, 1);

        estudiantes.forEach(function(estudiante){

            if(estudiante.curso === nombreCursoEliminado){

                estudiante.curso = "";

            }

        });

        localStorage.setItem(
            "cursos",
            JSON.stringify(cursos)
        );

        localStorage.setItem(
            "estudiantes",
            JSON.stringify(estudiantes)
        );

        mostrarCursos();
        actualizarResumen();

        alert("Curso eliminado correctamente");

    }

}

function editarCursoNuevo(indice){

    let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

    let nombreAnterior = cursos[indice].nombre;

    let nuevoNombre = prompt(
        "Cambiar nombre del curso:",
        nombreAnterior
    );

    if(nuevoNombre && nuevoNombre.trim() !== ""){

        nuevoNombre = nuevoNombre.trim();

        cursos[indice].nombre = nuevoNombre;

        estudiantes.forEach(function(estudiante){

            if(estudiante.curso === nombreAnterior){

                estudiante.curso = nuevoNombre;

            }

        });

        localStorage.setItem(
            "cursos",
            JSON.stringify(cursos)
        );

        localStorage.setItem(
            "estudiantes",
            JSON.stringify(estudiantes)
        );

        mostrarCursos();

        alert("Curso actualizado correctamente");

    }

}

function agregarCurso(){

    let nombre = document.getElementById("nuevoCurso").value.trim();

    if(nombre === ""){

        alert("Escribe el nombre del curso");
        return;

    }

    let cursos = JSON.parse(localStorage.getItem("cursos")) || [];

    cursos.push({

        nombre: nombre,
        estudiantes: 0,
        estado: "Activo"

    });

    localStorage.setItem(
        "cursos",
        JSON.stringify(cursos)
    );

    mostrarCursos();
    actualizarResumen();

    document.getElementById("nuevoCurso").value = "";

}

function actualizarResumen(){

    let estudiantes = (JSON.parse(localStorage.getItem("estudiantes")) || []).filter(estudiante => estudiante.nombre !== "Administrador");

    let cursos = JSON.parse(localStorage.getItem("cursos")) || [];

    document.getElementById("totalEstudiantes").textContent =
        estudiantes.length;

    document.getElementById("totalCursos").textContent =
        cursos.length + 3;

    let certificados = estudiantes.filter(function(estudiante){

        return estudiante.certificado &&
               estudiante.certificado !== "Sin certificado";

    });

    document.getElementById("totalCertificados").textContent =
        certificados.length;

}

function actualizarCursoEstudiantes(nombreAnterior, nombreNuevo){

    let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

    estudiantes.forEach(function(estudiante){

        if(estudiante.curso === nombreAnterior){

            estudiante.curso = nombreNuevo;

        }

    });

    localStorage.setItem(
        "estudiantes",
        JSON.stringify(estudiantes)
    );

}

function actualizarInscritosPrincipales(){

    let estudiantes = (JSON.parse(localStorage.getItem("estudiantes")) || []).filter(estudiante => estudiante.nombre !== "Administrador");

    let nombrePsicologia =
        localStorage.getItem("nombrePsicologia") || "Psicología";

    let nombreEducacion =
        localStorage.getItem("nombreEducacion") || "Educación";

    let nombreEstudio =
        localStorage.getItem("nombreEstudio") || "Técnicas de estudio";

    document.getElementById("psicologia").textContent =
        estudiantes.filter(e => e.curso === nombrePsicologia).length;

    document.getElementById("educacion").textContent =
        estudiantes.filter(e => e.curso === nombreEducacion).length;

    document.getElementById("estudio").textContent =
        estudiantes.filter(e => e.curso === nombreEstudio).length;

}

window.onload = function(){

    mostrarCursos();
    actualizarResumen();
    actualizarInscritosPrincipales();
    actualizarEstadoPsicologia();

    let psicologiaGuardada = localStorage.getItem("nombrePsicologia");

    if(psicologiaGuardada){
        document.getElementById("nombrePsicologia").innerHTML =
        "🧠 " + psicologiaGuardada;
    }

    let educacionGuardada = localStorage.getItem("nombreEducacion");

    if(educacionGuardada){
        document.getElementById("nombreEducacion").innerHTML =
        "📚 " + educacionGuardada;
    }

    let estudioGuardado = localStorage.getItem("nombreEstudio");

    if(estudioGuardado){
        document.getElementById("nombreEstudio").innerHTML =
        "📖 " + estudioGuardado;
    }
}

function eliminarCursoDisponible(nombreCurso){

    if(confirm("¿Seguro que quieres eliminar este curso?")){

        if(nombreCurso === "Psicología"){

            document.getElementById("nombrePsicologia").innerHTML =
            "🧠 Curso eliminado";

        }

        if(nombreCurso === "Educación"){

            document.getElementById("nombreEducacion").innerHTML =
            "📚 Curso eliminado";

        }

        if(nombreCurso === "Técnicas de estudio"){

            document.getElementById("nombreEstudio").innerHTML =
            "📖 Curso eliminado";

        }

        alert("Curso eliminado correctamente");

    }

}
function desactivarCurso(nombreCurso){

    if(confirm("¿Seguro que quieres desactivar este curso?")){

        if(nombreCurso === "Psicología"){

            localStorage.setItem(
                "estadoPsicologia",
                "inactivo"
            );

        }

        if(nombreCurso === "Educación"){

            localStorage.setItem(
                "estadoEducacion",
                "inactivo"
            );

        }

        if(nombreCurso === "Técnicas de estudio"){

            localStorage.setItem(
                "estadoEstudio",
                "inactivo"
            );

        }

        alert("Curso desactivado correctamente");

        location.reload();

    }

}


function actualizarEstadoPsicologia(){

    let estado = localStorage.getItem("estadoPsicologia");

    let elemento = document.getElementById("estadoPsicologia");
    let botones = document.getElementById("accionesPsicologia");

    if(!elemento || !botones){
        return;
    }

    if(estado === "inactivo"){

        elemento.innerHTML = "Inactivo 🔴";

        botones.innerHTML = `
            <button class="boton"
                    onclick="editarCurso('Psicología')">
                ✏️ Editar
            </button>

            <button class="boton"
                    onclick="reactivarCurso('Psicología')">
                🔄 Reactivar
            </button>
        `;

    }else{

        elemento.innerHTML = "Activo ✅";

        botones.innerHTML = `
            <button class="boton"
                    onclick="editarCurso('Psicología')">
                ✏️ Editar
            </button>

            <button class="boton"
                    onclick="desactivarCurso('Psicología')">
                🚫 Desactivar
            </button>
        `;
    }

}
function reactivarCurso(nombreCurso){

    if(confirm("¿Quieres reactivar este curso?")){

        if(nombreCurso === "Psicología"){

            localStorage.setItem(
                "estadoPsicologia",
                "activo"
            );

        }

        if(nombreCurso === "Educación"){

            localStorage.setItem(
                "estadoEducacion",
                "activo"
            );

        }

        if(nombreCurso === "Técnicas de estudio"){

            localStorage.setItem(
                "estadoEstudio",
                "activo"
            );

        }

        alert("Curso reactivado correctamente");

        location.reload();

    }

}

function actualizarEstadosCursos(){
   actualizarBotonesCursos(); 

    const cursos = [
        {
            nombre: "Psicología",
            estado: "estadoPsicologia",
            idEstado: "estadoPsicologia"
        },
        {
            nombre: "Educación",
            estado: "estadoEducacion",
            idEstado: "estadoEducacion"
        },
        {
            nombre: "Técnicas de estudio",
            estado: "estadoEstudio",
            idEstado: "estadoEstudio"
        }
    ];

    cursos.forEach(function(curso){

        const elemento = document.getElementById(curso.idEstado);

        if(!elemento) return;

        const estado = localStorage.getItem(curso.estado);

        if(estado === "inactivo"){

            elemento.textContent = "Inactivo 🔴";

        }else{

            elemento.textContent = "Activo ✅";

        }

    });

}
actualizarEstadosCursos();

function actualizarBotonesCursos(){

    const cursos = [
        {
            nombre: "Psicología",
            estado: "estadoPsicologia",
            acciones: "accionesPsicologia"
        },
        {
            nombre: "Educación",
            estado: "estadoEducacion",
            acciones: "accionesEducacion"
        },
        {
            nombre: "Técnicas de estudio",
            estado: "estadoEstudio",
            acciones: "accionesEstudio"
        }
    ];

    cursos.forEach(function(curso){

        const estado = localStorage.getItem(curso.estado);
        const acciones = document.getElementById(curso.acciones);

        if(!acciones) return;

        if(estado === "inactivo"){

            acciones.innerHTML = `
                <button class="boton"
                    onclick="editarCurso('${curso.nombre}')">
                    ✏️ Editar
                </button>

                <button class="boton"
                    onclick="reactivarCurso('${curso.nombre}')">
                    🔄 Reactivar
                </button>
            `;

        } else {

            acciones.innerHTML = `
                <button class="boton"
                    onclick="editarCurso('${curso.nombre}')">
                    ✏️ Editar
                </button>

                <button class="boton"
                    onclick="desactivarCurso('${curso.nombre}')">
                    🚫 Desactivar
                </button>
            `;

        }

    });

}

