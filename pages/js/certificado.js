
// ===============================
// CERTIFICADO STUDY-CONNECT
// ===============================

const botonPDF = document.getElementById("btnPDF");

if (botonPDF) {

    const parametros = new URLSearchParams(window.location.search);

    let numeroCertificado = parametros.get("certificado");

    if (!numeroCertificado) {
        numeroCertificado = localStorage.getItem("certificadoActual");
    }

    const estudiantes =
        JSON.parse(localStorage.getItem("estudiantes")) || [];

    const alumno = estudiantes.find(
        e => e.certificado === numeroCertificado
    );

    if (!alumno) {

        document.getElementById("nombreAlumno").innerHTML =
            "Certificado no encontrado";

    } else {

        // ===============================
        // DATOS DEL ALUMNO
        // ===============================

        document.getElementById("nombreAlumno").innerHTML =
            alumno.nombre;

        document.getElementById("numeroCertificado").innerHTML =
            alumno.certificado;

        document.getElementById("fechaCertificado").innerHTML =
            "Fecha de emisión: " +
            new Date().toLocaleDateString("es-MX");


        // ===============================
        // CÓDIGO QR
        // ===============================

        const enlace =
            window.location.origin +
            "/Study-Connect/pages/usuarios/verificar.html?certificado=" +
            alumno.certificado;

        document.getElementById("codigoQR").src =
            "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +
            encodeURIComponent(enlace);


        // ===============================
        // DESCARGAR PDF
        // ===============================

        botonPDF.onclick = function () {

            const certificado =
                document.querySelector(".certificado");

            const opciones = {

                margin: 0,

                filename:
                    "Certificado-" +
                    alumno.nombre +
                    ".pdf",

                image: {
                    type: "jpeg",
                    quality: 0.98
                },

                html2canvas: {
                    scale: 2,
                    useCORS: true,
                    scrollX: 0,
                    scrollY: 0
                },

                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "landscape"
                },

                pagebreak: {
                    mode: ["avoid-all"]
                }
            };


            html2pdf()
                .set(opciones)
                .from(certificado)
                .save();

        };

    }

}

