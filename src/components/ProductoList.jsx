import ProductoCard from './ProductoCard'

// Recorre el catálogo y arma una tarjeta por producto.
function ProductoList({ productos, carrito, busqueda, mostrarCarrito, onAgregar }) {
  // Renderizado condicional: aviso cuando la búsqueda no encuentra nada
  if (productos.length === 0) {
    return (
      <div className="alert alert-secondary" role="status">
        No encontramos productos para &quot;{busqueda}&quot;. Prueba con otro nombre o plataforma.
      </div>
    )
  }

  // Con el carrito oculto hay más ancho disponible, así que caben más columnas
  const columnas = mostrarCarrito ? 'row-cols-lg-3' : 'row-cols-lg-4'

  return (
    <div className={`row row-cols-1 row-cols-sm-2 ${columnas} g-4`} id="catalogo">
      {productos.map((producto) => {
        const enCarrito = carrito.find((item) => item.id === producto.id)

        return (
          <div className="col" key={producto.id}>
            <ProductoCard
              producto={producto}
              enCarrito={Boolean(enCarrito)}
              sinStock={Boolean(enCarrito) && enCarrito.cantidad >= producto.stock}
              onAgregar={onAgregar}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ProductoList
