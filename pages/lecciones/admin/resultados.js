document.addEventListener("DOMContentLoaded", function () {

    const estudiantes = (JSON.parse(localStorage.getItem("estudiantes")) || []).filter(estudiante => estudiante.nombre !== "Administrador");

    const totalEstudiantes = document.getElementById("totalEstudiantes");
    const totalAprobados = document.getElementById("totalAprobados");
    const totalPendientes = document.getElementById("totalPendientes");
    const listaResultados = document.getElementById("listaResultados");

    let aprobados = 0;
    let pendientes = 0;

    listaResultados.innerHTML = "";

    estudiantes.forEach(function (estudiante) {

        const fila = document.createElement("tr");

        const nombre = estudiante.nombre || "Sin nombre";
        const curso = estudiante.curso || "Sin curso";
        const progreso = estudiante.progreso || "0%";
        const examen = estudiante.examen || "Pendiente";
        const certificado = estudiante.certificado || "Sin certificado";

        if (examen === "Aprobado") {
            aprobados++;
        } else {
            pendientes++;
        }

        fila.innerHTML = `
            <td>${nombre}</td>
            <td>${curso}</td>
            <td>${progreso}</td>
            <td>${examen}</td>
            <td>${certificado}</td>
        `;

        listaResultados.appendChild(fila);
    });

    totalEstudiantes.textContent = estudiantes.length;
    totalAprobados.textContent = aprobados;
    totalPendientes.textContent = pendientes;

});