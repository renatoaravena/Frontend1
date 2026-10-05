// Pie de página con los datos de contacto de la tienda.
function Footer() {
  return (
    <footer className="pie-gamestore mt-auto">
      <div className="container py-4">
        <div className="row gy-3">
          <div className="col-md-4">
            <h2 className="h6 text-acento">Game Store</h2>
            <p className="small mb-0">Tienda de consolas y videojuegos retro y actuales.</p>
          </div>
          <div className="col-md-4">
            <h2 className="h6 text-acento">Contacto</h2>
            <p className="small mb-1">hola@gamestore.cl</p>
            <p className="small mb-0">+56 9 1234 5678 — Santiago, Chile</p>
          </div>
          <div className="col-md-4">
            <h2 className="h6 text-acento">Síguenos</h2>
            <ul className="list-unstyled small mb-0">
              <li><a href="https://www.instagram.com" target="_blank" rel="noopener">Instagram</a></li>
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener">Facebook</a></li>
              <li><a href="https://www.youtube.com" target="_blank" rel="noopener">YouTube</a></li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="text-center small mb-0">© 2026 Game Store. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
