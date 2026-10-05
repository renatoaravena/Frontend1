import { useState } from 'react'

// Barra de navegación. Recibe por props el estado que vive en App.
function Navbar({ vista, onCambiarVista, unidades, mostrarCarrito, onToggleCarrito, busqueda, onBuscar }) {
  // El menú de móvil se abre y cierra con estado, sin depender del JavaScript de Bootstrap
  const [menuAbierto, setMenuAbierto] = useState(false)

  // Al elegir una sección se cambia de vista y se cierra el menú desplegado
  const irA = (destino) => {
    onCambiarVista(destino)
    setMenuAbierto(false)
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-gamestore">
      <div className="container">
        <button className="navbar-brand fw-bold btn btn-link" onClick={() => irA('catalogo')}>
          GAME<span className="text-acento">STORE</span>
        </button>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-controls="menuPrincipal"
          aria-expanded={menuAbierto}
          aria-label="Abrir menú de navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Renderizado condicional: la clase show aparece solo con el menú abierto */}
        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`} id="menuPrincipal">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              {/* El enlace activo se marca según la vista actual */}
              <button
                className={`nav-link btn btn-link ${vista === 'catalogo' ? 'active' : ''}`}
                onClick={() => irA('catalogo')}
              >
                Catálogo
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link btn btn-link ${vista === 'contacto' ? 'active' : ''}`}
                onClick={() => irA('contacto')}
              >
                Contacto
              </button>
            </li>
          </ul>

          {/* El buscador y el carrito solo tienen sentido sobre el catálogo */}
          {vista === 'catalogo' && (
            <div className="d-flex align-items-center gap-2 flex-wrap">
              <label className="visually-hidden" htmlFor="busqueda">Buscar producto</label>
              <input
                id="busqueda"
                className="form-control"
                type="search"
                placeholder="Buscar juego..."
                value={busqueda}
                onChange={(evento) => onBuscar(evento.target.value)}
              />

              {/* Botón interactivo: su texto cambia según el estado mostrarCarrito */}
              <button className="btn btn-acento text-nowrap" onClick={onToggleCarrito}>
                {mostrarCarrito ? 'Ocultar carrito' : 'Ver carrito'}
                <span className="badge rounded-pill bg-danger ms-2">{unidades}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
