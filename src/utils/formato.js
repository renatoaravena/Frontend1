// Convierte 29990 en "$29.990". Se usa en todos los componentes que muestran precios.
export function formatearPrecio(valor) {
  return `$${valor.toLocaleString('es-CL')}`
}
