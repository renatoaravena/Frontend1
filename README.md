# Game Store

Tienda de consolas y videojuegos desarrollada con **React 19 + Vite + Bootstrap 5**
para el ramo **Desarrollo Frontend I (PFY2201)** de Duoc UC.

La aplicación carga un catálogo desde un archivo JSON con `useEffect`, gestiona el
carrito de compras con `useState` y usa renderizado condicional para adaptar la
interfaz al estado actual.

## Demo

- Sitio publicado: https://renatoaravena.github.io/Frontend1/
- Repositorio: https://github.com/renatoaravena/Frontend1

## Estructura

```
├── public/
│   ├── data/productos.json   Datos que se cargan con fetch
│   └── img/                  Carátulas de los productos
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        Barra superior, buscador y botón del carrito
│   │   ├── ProductoList.jsx  Recorre el catálogo y arma las tarjetas
│   │   ├── ProductoCard.jsx  Tarjeta individual de producto
│   │   ├── Carrito.jsx       Resumen del carrito y cierre de compra
│   │   ├── Contacto.jsx      Formulario de contacto con validación
│   │   └── Footer.jsx        Pie de página
│   ├── utils/formato.js      Función compartida para dar formato a los precios
│   ├── App.jsx               Componente principal: estados y efectos
│   ├── index.css             Estilos propios sobre Bootstrap
│   └── main.jsx              Punto de entrada, importa Bootstrap
└── vite.config.js            base: '/Frontend1/' para GitHub Pages
```

El archivo JSON vive en `public/` y no en `src/` porque así Vite lo sirve como
recurso estático y `fetch` puede pedirlo en tiempo de ejecución, igual que una API externa.

## Hooks y funcionalidades

| Requisito | Dónde se implementa |
|---|---|
| `useState` — catálogo | `productos`, `cargando` y `error` en `App.jsx` |
| `useState` — carrito | `carrito` en `App.jsx`, con agregar, quitar y vaciar |
| `useState` — elemento interactivo | `vista`, `mostrarCarrito` y `busqueda` en `App.jsx`; `menuAbierto` en `Navbar`; el formulario de `Contacto` |
| `useEffect` — carga de datos | Carga `public/data/productos.json` al montar el componente |
| `useEffect` — con limpieza | Borra el mensaje de compra a los 6 segundos y cancela el temporizador |
| Renderizado condicional — mensaje | Carrito vacío, búsqueda sin resultados y alerta de error |
| Renderizado condicional — botón | "Agregar al carrito" → "✓ En el carrito" → "Sin stock disponible" |
| Renderizado condicional — vista | Navega entre Catálogo y Contacto desde el menú; el botón alterna entre "Ver carrito" y "Ocultar carrito" y el catálogo se ensancha |
| Props | `App` entrega datos y funciones a `Navbar`, `ProductoList`, `ProductoCard` y `Carrito` |
| Finalizar compra | Muestra el total cobrado, agradece y deja el carrito vacío |
| Formulario de contacto | Campos controlados con `useState` y validación propia antes de enviar |

## Ejecutar en local

```bash
npm install
npm run dev
```

La aplicación queda en http://localhost:5173/Frontend1/

## Publicar en GitHub Pages

```bash
npm run deploy
```

El script compila el proyecto y sube la carpeta `dist` a la rama `gh-pages`.
Después hay que dejar en **Settings → Pages** la fuente en `gh-pages` / root.

## Historial del proyecto

Este repositorio partió como un sitio estático con HTML, CSS, Bootstrap 5 y
JavaScript. Esa versión corresponde a la entrega de la semana 6 y quedó marcada
con la etiqueta [`semana-06`](https://github.com/renatoaravena/Frontend1/tree/semana-06),
desde donde se puede consultar o descargar.

## Tecnologías

- React 19 con Hooks (`useState`, `useEffect`)
- Vite 8 como herramienta de construcción
- Bootstrap 5.3 para el diseño responsivo
- JavaScript (ES6+): `fetch`, `async/await`, `map`, `filter` y `reduce`

## Autor

Renato Aravena — Desarrollo Frontend I (PFY2201), Duoc UC.
