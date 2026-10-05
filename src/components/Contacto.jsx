import { useState } from 'react'

// Valores con los que parte y vuelve a quedar el formulario
const FORMULARIO_VACIO = { nombre: '', correo: '', motivo: '', detalle: '' }

function Contacto() {
  const [datos, setDatos] = useState(FORMULARIO_VACIO)
  const [errores, setErrores] = useState({})
  const [enviado, setEnviado] = useState(false)

  // Un solo manejador actualiza el campo que corresponda según su atributo name
  const actualizarCampo = (evento) => {
    const { name, value } = evento.target
    setDatos({ ...datos, [name]: value })
  }

  // Devuelve un objeto con los mensajes de error encontrados
  const validar = () => {
    const encontrados = {}

    if (datos.nombre.trim().length < 3) {
      encontrados.nombre = 'Escribe tu nombre (mínimo 3 caracteres).'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) {
      encontrados.correo = 'Escribe un correo válido, por ejemplo nombre@correo.cl.'
    }
    if (!datos.motivo) {
      encontrados.motivo = 'Selecciona un motivo.'
    }
    if (datos.detalle.trim().length < 10) {
      encontrados.detalle = 'Cuéntanos tu caso con al menos 10 caracteres.'
    }

    return encontrados
  }

  const enviarFormulario = (evento) => {
    evento.preventDefault()

    const encontrados = validar()
    setErrores(encontrados)

    // Solo se envía cuando no quedan errores
    if (Object.keys(encontrados).length > 0) {
      setEnviado(false)
      return
    }

    setEnviado(true)
    setDatos(FORMULARIO_VACIO)
  }

  return (
    <div className="row g-4">
      <section className="col-lg-7">
        <h2 className="h4 mb-4">Contáctanos</h2>

        <form className="card card-gamestore p-4" onSubmit={enviarFormulario} noValidate>
          <div className="mb-3">
            <label className="form-label" htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              className={`form-control ${errores.nombre ? 'is-invalid' : ''}`}
              value={datos.nombre}
              onChange={actualizarCampo}
            />
            {/* Renderizado condicional: el error aparece solo si existe */}
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="correo">Correo</label>
            <input
              id="correo"
              name="correo"
              type="email"
              className={`form-control ${errores.correo ? 'is-invalid' : ''}`}
              value={datos.correo}
              onChange={actualizarCampo}
            />
            {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="motivo">Motivo</label>
            <select
              id="motivo"
              name="motivo"
              className={`form-select ${errores.motivo ? 'is-invalid' : ''}`}
              value={datos.motivo}
              onChange={actualizarCampo}
            >
              <option value="">Selecciona una opción</option>
              <option value="consulta">Consulta</option>
              <option value="reclamo">Reclamo</option>
              <option value="otro">Otro</option>
            </select>
            {errores.motivo && <div className="invalid-feedback">{errores.motivo}</div>}
          </div>

          <div className="mb-3">
            <label className="form-label" htmlFor="detalle">Detalle</label>
            <textarea
              id="detalle"
              name="detalle"
              rows="5"
              className={`form-control ${errores.detalle ? 'is-invalid' : ''}`}
              value={datos.detalle}
              onChange={actualizarCampo}
            ></textarea>
            {errores.detalle && <div className="invalid-feedback">{errores.detalle}</div>}
          </div>

          <button className="btn btn-acento" type="submit">Enviar mensaje</button>
        </form>

        {/* Renderizado condicional: confirmación después de un envío válido */}
        {enviado && (
          <div className="alert alert-success mt-3" role="alert">
            ¡Gracias por escribirnos! Respondemos tu mensaje dentro de 24 horas.
          </div>
        )}
      </section>

      <aside className="col-lg-5">
        <div className="card card-gamestore">
          <div className="card-header fw-bold">Datos de la tienda</div>
          <div className="card-body">
            <p className="mb-2"><span className="text-secondary">Correo:</span> hola@gamestore.cl</p>
            <p className="mb-2"><span className="text-secondary">Teléfono:</span> +56 9 1234 5678</p>
            <p className="mb-2"><span className="text-secondary">Dirección:</span> Av. Providencia 123, Santiago</p>
            <p className="mb-0"><span className="text-secondary">Horario:</span> lunes a sábado, 10:00 a 19:00</p>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default Contacto
