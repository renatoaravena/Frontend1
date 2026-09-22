/* Validación del formulario de contacto */

const formulario = document.getElementById("form-contacto");
const mensajeEnviado = document.getElementById("mensaje-enviado");

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // checkValidity() revisa los atributos required, minlength y type del HTML
    if (!formulario.checkValidity()) {
        formulario.classList.add("was-validated");
        mensajeEnviado.classList.add("d-none");
        return;
    }

    mensajeEnviado.textContent =
        `¡Gracias ${document.getElementById("nombre").value}! Respondemos tu ${document.getElementById("motivo").value} dentro de 24 horas.`;
    mensajeEnviado.classList.remove("d-none");

    formulario.reset();
    formulario.classList.remove("was-validated");
});
