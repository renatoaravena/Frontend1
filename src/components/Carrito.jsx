import { formatearPrecio } from '../utils/formato'

// Resumen del carrito. No guarda estado propio: lo recibe y lo informa hacia App.
function Carrito({ items, unidades, total, mensajeCompra, onQuitar, onVaciar, onFinalizar }) {
  return (
    <div className="card card-gamestore carrito-fijo">
      <div className="card-header d-flex justify-content-between align-items-center">
        <span className="fw-bold">Mi carrito</span>
        <span className="badge bg-secondary">{unidades} ítems</span>
      </div>

      <div className="card-body">
        {/* Renderizado condicional: confirmación después de finalizar una compra */}
        {mensajeCompra && (
          <div className="alert alert-success py-2 small" role="alert">
            {mensajeCompra}
          </div>
        )}

        {/* Renderizado condicional: mensaje si está vacío, listado si tiene productos */}
        {items.length === 0 ? (
          <p className="text-secondary small mb-0">
            Tu carrito está vacío. Agrega productos desde el catálogo.
          </p>
        ) : (
          <>
            <ul className="list-group list-group-flush mb-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0"
                >
                  <div>
                    <p className="mb-0 small fw-bold">{item.nombre}</p>
                    <small className="text-secondary">
                      {item.cantidad} x {formatearPrecio(item.precio)}
                    </small>
                  </div>
                  <div className="text-end">
                    <span className="d-block small text-acento">
                      {formatearPrecio(item.precio * item.cantidad)}
                    </span>
                    <button
                      className="btn btn-sm btn-link text-danger p-0"
                      onClick={() => onQuitar(item.id)}
                      aria-label={`Quitar una unidad de ${item.nombre}`}
                    >
                      Quitar
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <p className="d-flex justify-content-between fs-5 mb-3">
              <span>Total:</span>
              <span className="text-acento fw-bold">{formatearPrecio(total)}</span>
            </p>

            <button className="btn btn-acento w-100 mb-2" onClick={onFinalizar}>
              Finalizar compra
            </button>
            <button className="btn btn-outline-light w-100" onClick={onVaciar}>
              Vaciar carrito
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default Carrito
