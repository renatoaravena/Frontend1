# Game Store

Sitio web de e-commerce desarrollado para la actividad sumativa de la semana 6 del ramo
**Desarrollo Frontend I (PFY2201)**: *Optimizando la lógica y rendimiento de una página web con JavaScript*.

Es una tienda de consolas y videojuegos que combina **Bootstrap 5** para la maquetación responsiva
y **JavaScript** para la interactividad: carga de productos con la Fetch API, búsqueda y
carrito de compras.

## Demo

- Sitio publicado: https://renatoaravena.github.io/Frontend1/
- Repositorio: https://github.com/renatoaravena/Frontend1

## Estructura del proyecto

```
index.html              Página principal del e-commerce (catálogo + carrito)
contacto.html           Formulario de contacto con validación
assets/
├── css/estilo.css      Estilos propios que complementan a Bootstrap 5
├── js/app.js           Lógica del catálogo, carrito, búsqueda y Fetch API
├── js/contacto.js      Validación del formulario de contacto
├── data/productos.json Datos de los productos que se cargan con fetch
└── img/                Portadas de los productos
```

## Funcionalidades

| Requisito | Dónde se implementa |
|---|---|
| Bootstrap 5 responsivo | `index.html` y `contacto.html` (grid, cards, modal, toast) |
| Barra de navegación con categorías | Navbar con `navbar-expand-lg`, menú hamburguesa en móvil, buscador y desplegable *Categorías* (Consolas / Videojuegos) |
| Evento `click` | Botones "Agregar al carrito", "Ver detalle", "Quitar" y "Vaciar carrito" |
| Evento `submit` | Formulario de búsqueda del navbar y formulario de contacto |
| Manipulación del DOM | `crearTarjeta()`, `renderizarProductos()` y `renderizarCarrito()` en `app.js` |
| Fetch API | `cargarProductos()` lee `assets/data/productos.json` |
| Gestión de errores | `mostrarError()` muestra una alerta amigable con botón "Reintentar" |
| Código modular | `app.js` dividido en funciones por responsabilidad (datos, render, carrito, eventos) |

## Cómo ejecutarlo

El catálogo se carga con `fetch`, por lo que el sitio debe abrirse desde un servidor web
(no funciona abriendo el archivo directamente con doble clic).

- **Visual Studio Code**: instalar la extensión *Live Server* y usar la opción **Go Live**.
- **En línea**: abrir el sitio publicado en GitHub Pages.

## Tecnologías

- HTML5 y CSS3
- Bootstrap 5.3 (vía CDN)
- JavaScript (ES6+): `fetch`, `async/await`, `map`, `filter`, `reduce` y manipulación del DOM

## Autor

Renato Aravena — Desarrollo Frontend I (PFY2201), Duoc UC.
