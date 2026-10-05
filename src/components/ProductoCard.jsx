import { formatearPrecio } from '../utils/formato'

// Tarjeta de un producto. Es reutilizable: todo lo que muestra llega por props.
function ProductoCard({ producto, enCarrito, sinStock, onAgregar }) {
  return (
    <article className="card card-gamestore h-100">
      <img
        src={`${import.meta.env.BASE_URL}${producto.imagen}`}
        className="card-img-top imagen-producto"
        alt={`Portada de ${producto.nombre}`}
      />

      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary align-self-start mb-2">{producto.plataforma}</span>
        <h3 className="card-title h6">{producto.nombre}</h3>
        <p className="card-text small text-secondary">{producto.descripcion}</p>
        <p className="card-text text-acento fw-bold fs-5 mb-3">{formatearPrecio(producto.precio)}</p>

        {/* Renderizado condicional: el botón cambia de texto y estilo según el carrito */}
        <button
          className={`btn btn-sm mt-auto ${enCarrito ? 'btn-outline-success' : 'btn-acento'}`}
          onClick={() => onAgregar(producto)}
          disabled={sinStock}
        >
          {sinStock ? 'Sin stock disponible' : enCarrito ? '✓ En el carrito' : 'Agregar al carrito'}
        </button>
      </div>
    </article>
  )
}

export default ProductoCard
