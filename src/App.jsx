import { useState, useEffect } from 'react'

import Navbar from './components/Navbar'
import ProductoList from './components/ProductoList'
import Carrito from './components/Carrito'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import { formatearPrecio } from './utils/formato'

// Vite agrega la base del sitio (en GitHub Pages es /Frontend1/), por eso se usa BASE_URL
const RUTA_DATOS = `${import.meta.env.BASE_URL}data/productos.json`

function App() {
  // Estado del catálogo y de la carga de datos
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Estado del carrito de compras
  const [carrito, setCarrito] = useState([])
  const [mensajeCompra, setMensajeCompra] = useState('')

  // Estados de los elementos interactivos de la interfaz
  const [vista, setVista] = useState('catalogo')
  const [mostrarCarrito, setMostrarCarrito] = useState(true)
  const [busqueda, setBusqueda] = useState('')

  // Carga los productos desde el archivo JSON local.
  // El estado ya nace en "cargando", por eso aquí no se vuelve a marcar.
  const cargarProductos = async () => {
    try {
      const respuesta = await fetch(RUTA_DATOS)

      // fetch no lanza error con respuestas 404 o 500, hay que validarlas
      if (!respuesta.ok) {
        throw new Error(`El servidor respondió con el código ${respuesta.status}`)
      }

      const datos = await respuesta.json()

      if (!Array.isArray(datos) || datos.length === 0) {
        throw new Error('El archivo de productos está vacío o tiene un formato incorrecto.')
      }

      setProductos(datos)
    } catch (problema) {
      // El detalle técnico queda en la consola; al usuario se le muestra un mensaje claro
      console.error('Error al cargar los productos:', problema)
      setError('No pudimos leer el catálogo. Revisa tu conexión e inténtalo nuevamente.')
    } finally {
      setCargando(false)
    }
  }

  // Efecto secundario: se ejecuta una sola vez, cuando el componente se monta
  useEffect(() => {
    cargarProductos()
  }, [])

  // Efecto secundario: borra el mensaje de compra a los 6 segundos.
  // La función que retorna cancela el temporizador si el mensaje cambia antes.
  useEffect(() => {
    if (!mensajeCompra) return

    const temporizador = setTimeout(() => setMensajeCompra(''), 6000)
    return () => clearTimeout(temporizador)
  }, [mensajeCompra])

  // Vuelve a intentar la carga después de un error
  const reintentar = () => {
    setCargando(true)
    setError(null)
    cargarProductos()
  }

  // Agrega un producto al carrito o suma una unidad si ya estaba
  const agregarAlCarrito = (producto) => {
    setMensajeCompra('')

    setCarrito((actual) => {
      const enCarrito = actual.find((item) => item.id === producto.id)

      // No se permite superar el stock disponible
      if (enCarrito) {
        if (enCarrito.cantidad >= producto.stock) return actual

        return actual.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        )
      }

      return [...actual, { ...producto, cantidad: 1 }]
    })
  }

  // Descuenta una unidad y elimina el producto cuando llega a cero
  const quitarDelCarrito = (id) => {
    setCarrito((actual) =>
      actual
        .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
        .filter((item) => item.cantidad > 0)
    )
  }

  const vaciarCarrito = () => setCarrito([])

  // Valores derivados del estado: no necesitan un useState propio
  const unidades = carrito.reduce((suma, item) => suma + item.cantidad, 0)
  const total = carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0)

  // Cierra la compra: deja el mensaje de confirmación y vacía el carrito
  const finalizarCompra = () => {
    setMensajeCompra(`Compra simulada por ${formatearPrecio(total)}. ¡Gracias por preferirnos!`)
    setCarrito([])
  }

  const productosFiltrados = productos.filter((producto) => {
    const texto = busqueda.toLowerCase()
    return (
      producto.nombre.toLowerCase().includes(texto) ||
      producto.plataforma.toLowerCase().includes(texto)
    )
  })

  return (
    <>
      <Navbar
        vista={vista}
        onCambiarVista={setVista}
        unidades={unidades}
        mostrarCarrito={mostrarCarrito}
        onToggleCarrito={() => setMostrarCarrito(!mostrarCarrito)}
        busqueda={busqueda}
        onBuscar={setBusqueda}
      />

      <header className="portada text-center">
        <div className="container py-5">
          <h1 className="display-5 fw-bold text-acento">GAME STORE</h1>
          <p className="lead mb-0">
            Consolas y videojuegos, desde los clásicos hasta los más recientes.
          </p>
        </div>
      </header>

      <main className="container my-5">
        {/* Renderizado condicional de vistas: catálogo o formulario de contacto */}
        {vista === 'contacto' ? (
          <Contacto />
        ) : (
          <div className="row g-4">
            <section className={mostrarCarrito ? 'col-lg-8' : 'col-12'}>
              <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
                <h2 className="h4 mb-0">Catálogo de productos</h2>
                <small className="text-secondary">
                  {cargando ? 'Cargando productos...' : `${productosFiltrados.length} de ${productos.length} productos`}
                </small>
              </div>

              {/* Renderizado condicional: spinner, error o catálogo según el estado */}
              {cargando && (
                <div className="text-center py-5">
                  <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Cargando productos</span>
                  </div>
                </div>
              )}

              {!cargando && error && (
                <div className="alert alert-danger" role="alert">
                  <h3 className="h6 alert-heading">No pudimos cargar el catálogo</h3>
                  <p className="mb-2 small">{error}</p>
                  <button className="btn btn-sm btn-outline-light" onClick={reintentar}>
                    Reintentar
                  </button>
                </div>
              )}

              {!cargando && !error && (
                <ProductoList
                  productos={productosFiltrados}
                  carrito={carrito}
                  busqueda={busqueda}
                  mostrarCarrito={mostrarCarrito}
                  onAgregar={agregarAlCarrito}
                />
              )}
            </section>

            {/* El panel del carrito solo se monta cuando el usuario lo tiene visible */}
            {mostrarCarrito && (
              <aside className="col-lg-4">
                <Carrito
                  items={carrito}
                  unidades={unidades}
                  total={total}
                  mensajeCompra={mensajeCompra}
                  onQuitar={quitarDelCarrito}
                  onVaciar={vaciarCarrito}
                  onFinalizar={finalizarCompra}
                />
              </aside>
            )}
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}

export default App
