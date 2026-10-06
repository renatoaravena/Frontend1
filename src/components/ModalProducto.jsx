import { useEffect } from 'react'
import { formatearPrecio } from '../utils/formato'

// Ventana con el detalle de un producto. Solo se monta cuando hay uno seleccionado.
function ModalProducto({ producto, enCarrito, sinStock, onCerrar, onAgregar }) {
  // Efecto secundario sobre el documento: cerrar con Escape y bloquear el scroll
  // del fondo. La función que retorna deshace ambas cosas al cerrar el modal.
  useEffect(() => {
    const alPresionarTecla = (evento) => {
      if (evento.key === 'Escape') onCerrar()
    }

    document.addEventListener('keydown', alPresionarTecla)
    document.body.classList.add('modal-open')

    return () => {
      document.removeEventListener('keydown', alPresionarTecla)
      document.body.classList.remove('modal-open')
    }
  }, [onCerrar])

  return (
    <>
      {/* Al hacer clic fuera de la tarjeta también se cierra */}
      <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true"
        aria-labelledby="tituloModal" onClick={onCerrar}>
        <div className="modal-dialog modal-dialog-centered" onClick={(evento) => evento.stopPropagation()}>
          <div className="modal-content card-gamestore">
            <div className="modal-header">
              <h2 className="modal-title h5" id="tituloModal">{producto.nombre}</h2>
              <button type="button" className="btn-close btn-close-white" onClick={onCerrar}
                aria-label="Cerrar"></button>
            </div>

            <div className="modal-body">
              <img
                src={`${import.meta.env.BASE_URL}${producto.imagen}`}
                className="img-fluid rounded mb-3 imagen-detalle"
                alt={`Portada de ${producto.nombre}`}
              />
              <p>{producto.descripcion}</p>
              <p className="mb-1"><span className="text-secondary">Plataforma:</span> {producto.plataforma}</p>
              <p className="mb-1"><span className="text-secondary">Stock:</span> {producto.stock} unidades</p>
              <p className="fs-4 text-acento fw-bold mb-0">{formatearPrecio(producto.precio)}</p>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-light" onClick={onCerrar}>
                Cerrar
              </button>
              {/* El botón refleja el mismo estado que el de la tarjeta */}
              <button
                type="button"
                className={`btn ${enCarrito ? 'btn-outline-success' : 'btn-acento'}`}
                onClick={() => onAgregar(producto)}
                disabled={sinStock}
              >
                {sinStock ? 'Sin stock disponible' : enCarrito ? '✓ En el carrito' : 'Agregar al carrito'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  )
}

export default ModalProducto
