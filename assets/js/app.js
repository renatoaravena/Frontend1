/* Game Store - lógica del catálogo y del carrito de compras */

const RUTA_DATOS = "assets/data/productos.json";

// Estado de la aplicación: productos cargados, carrito y texto buscado
const estado = {
    productos: [],
    carrito: [],
    busqueda: ""
};

// Utilidades

// Convierte 29990 en "$29.990"
function formatearPrecio(valor) {
    return "$" + valor.toLocaleString("es-CL");
}

function buscarProducto(id) {
    return estado.productos.find((producto) => producto.id === id);
}

// Muestra un aviso flotante (toast de Bootstrap)
function mostrarAviso(mensaje) {
    document.getElementById("aviso-texto").textContent = mensaje;
    bootstrap.Toast.getOrCreateInstance(document.getElementById("aviso")).show();
}

// Carga de datos con la Fetch API

async function cargarProductos() {
    const cargando = document.getElementById("cargando");
    const alertaError = document.getElementById("alerta-error");

    cargando.classList.remove("d-none");
    alertaError.classList.add("d-none");

    try {
        const respuesta = await fetch(RUTA_DATOS);

        // fetch no lanza error con respuestas 404 o 500, hay que validarlas
        if (!respuesta.ok) {
            throw new Error("El servidor respondió con el código " + respuesta.status);
        }

        const datos = await respuesta.json();

        if (!Array.isArray(datos) || datos.length === 0) {
            throw new Error("El archivo de productos está vacío o tiene un formato incorrecto.");
        }

        estado.productos = datos;
        renderizarProductos();
    } catch (error) {
        mostrarError(error.message);
    } finally {
        cargando.classList.add("d-none");
    }
}

// Mensaje amigable cuando los datos no se pueden cargar
function mostrarError(detalle) {
    document.getElementById("contenedor-productos").innerHTML = "";
    document.getElementById("alerta-vacio").classList.add("d-none");
    document.getElementById("resumen-filtro").textContent = "Catálogo no disponible";
    document.getElementById("detalle-error").textContent =
        "Revisa tu conexión e inténtalo nuevamente. (" + detalle + ")";
    document.getElementById("alerta-error").classList.remove("d-none");
}

// Renderizado del catálogo

// Deja solo los productos que coinciden con lo buscado
function filtrarProductos() {
    const texto = estado.busqueda.toLowerCase();

    return estado.productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(texto) ||
        producto.plataforma.toLowerCase().includes(texto)
    );
}

function crearTarjeta(producto) {
    const columna = document.createElement("div");
    columna.className = "col";
    columna.innerHTML = `
        <article class="card card-gamestore h-100">
            <img src="${producto.imagen}" class="card-img-top imagen-producto" alt="Portada de ${producto.nombre}">
            <div class="card-body d-flex flex-column">
                <span class="badge bg-secondary align-self-start mb-2">${producto.plataforma}</span>
                <h3 class="card-title h6">${producto.nombre}</h3>
                <p class="card-text text-acento fw-bold fs-5 mb-3">${formatearPrecio(producto.precio)}</p>
                <div class="mt-auto d-grid gap-2">
                    <button class="btn btn-acento btn-sm" data-accion="agregar" data-id="${producto.id}">
                        Agregar al carrito
                    </button>
                    <button class="btn btn-outline-light btn-sm" data-accion="detalle" data-id="${producto.id}">
                        Ver detalle
                    </button>
                </div>
            </div>
        </article>`;

    return columna;
}

function renderizarProductos() {
    const contenedor = document.getElementById("contenedor-productos");
    const alertaVacio = document.getElementById("alerta-vacio");
    const encontrados = filtrarProductos();

    contenedor.innerHTML = "";
    encontrados.forEach((producto) => contenedor.appendChild(crearTarjeta(producto)));

    // Aviso cuando la búsqueda no devuelve resultados
    if (encontrados.length === 0) {
        alertaVacio.textContent = `No encontramos productos para "${estado.busqueda}". Prueba con otro nombre o plataforma.`;
        alertaVacio.classList.remove("d-none");
    } else {
        alertaVacio.classList.add("d-none");
    }

    document.getElementById("resumen-filtro").textContent =
        `${encontrados.length} de ${estado.productos.length} productos`;
}

// Carrito de compras

function agregarAlCarrito(id) {
    const producto = buscarProducto(id);
    if (!producto) return;

    // Sin unidades disponibles no se puede agregar
    if (producto.stock === 0) {
        mostrarAviso(`${producto.nombre} está sin stock por ahora.`);
        return;
    }

    const enCarrito = estado.carrito.find((item) => item.id === id);

    if (enCarrito) {
        // No se permite superar el stock disponible del producto
        if (enCarrito.cantidad >= producto.stock) {
            mostrarAviso(`Ya agregaste todo el stock disponible de ${producto.nombre} (${producto.stock}).`);
            return;
        }
        enCarrito.cantidad++;
    } else {
        estado.carrito.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }

    renderizarCarrito();
    mostrarAviso(`${producto.nombre} se agregó al carrito.`);
}

function quitarDelCarrito(id) {
    const item = estado.carrito.find((producto) => producto.id === id);
    if (!item) return;

    if (item.cantidad > 1) {
        item.cantidad--;
    } else {
        estado.carrito = estado.carrito.filter((producto) => producto.id !== id);
    }

    renderizarCarrito();
}

function vaciarCarrito() {
    if (estado.carrito.length === 0) {
        mostrarAviso("El carrito ya está vacío.");
        return;
    }

    estado.carrito = [];
    renderizarCarrito();
    mostrarAviso("Se vació el carrito.");
}

function calcularTotal() {
    return estado.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
}

// Dibuja el resumen del carrito en su área designada de la página
function renderizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const unidades = estado.carrito.reduce((suma, item) => suma + item.cantidad, 0);

    lista.innerHTML = "";

    estado.carrito.forEach((item) => {
        const fila = document.createElement("li");
        fila.className = "list-group-item d-flex justify-content-between align-items-center bg-transparent px-0";
        fila.innerHTML = `
            <div>
                <p class="mb-0 small fw-bold">${item.nombre}</p>
                <small class="text-secondary">${item.cantidad} x ${formatearPrecio(item.precio)}</small>
            </div>
            <div class="text-end">
                <span class="d-block small text-acento">${formatearPrecio(item.precio * item.cantidad)}</span>
                <button class="btn btn-sm btn-link text-danger p-0" data-accion="quitar" data-id="${item.id}"
                    aria-label="Quitar una unidad de ${item.nombre}">Quitar</button>
            </div>`;
        lista.appendChild(fila);
    });

    document.getElementById("carrito-vacio").classList.toggle("d-none", estado.carrito.length > 0);
    document.getElementById("contador-carrito").textContent = unidades;
    document.getElementById("contador-carrito-panel").textContent = `${unidades} ítems`;
    document.getElementById("total-carrito").textContent = formatearPrecio(calcularTotal());
}

// Modal de detalle

function abrirDetalle(id) {
    const producto = buscarProducto(id);
    if (!producto) return;

    document.getElementById("tituloModalProducto").textContent = producto.nombre;
    document.getElementById("modal-imagen").src = producto.imagen;
    document.getElementById("modal-imagen").alt = "Portada de " + producto.nombre;
    document.getElementById("modal-descripcion").textContent = producto.descripcion;
    document.getElementById("modal-plataforma").textContent = producto.plataforma;
    document.getElementById("modal-stock").textContent = producto.stock + " unidades";
    document.getElementById("modal-precio").textContent = formatearPrecio(producto.precio);
    document.getElementById("btn-agregar-modal").dataset.id = producto.id;

    bootstrap.Modal.getOrCreateInstance(document.getElementById("modalProducto")).show();
}

// Eventos

function inicializarEventos() {
    // Un solo listener en el contenedor atiende los clics de todas las tarjetas
    document.getElementById("contenedor-productos").addEventListener("click", (evento) => {
        const boton = evento.target.closest("button[data-accion]");
        if (!boton) return;

        const id = Number(boton.dataset.id);
        if (boton.dataset.accion === "agregar") agregarAlCarrito(id);
        if (boton.dataset.accion === "detalle") abrirDetalle(id);
    });

    document.getElementById("lista-carrito").addEventListener("click", (evento) => {
        const boton = evento.target.closest("button[data-accion='quitar']");
        if (boton) quitarDelCarrito(Number(boton.dataset.id));
    });

    // Evento submit: procesa el formulario de búsqueda
    document.getElementById("form-busqueda").addEventListener("submit", (evento) => {
        evento.preventDefault();

        estado.busqueda = document.getElementById("input-busqueda").value.trim();
        renderizarProductos();
        cerrarMenuMovil();

        document.getElementById("catalogo").scrollIntoView({ behavior: "smooth" });
    });

    // En móvil, los enlaces que llevan al catálogo cierran el menú desplegado
    document.querySelectorAll(".enlace-catalogo").forEach((enlace) => {
        enlace.addEventListener("click", cerrarMenuMovil);
    });

    document.getElementById("btn-agregar-modal").addEventListener("click", (evento) => {
        agregarAlCarrito(Number(evento.currentTarget.dataset.id));
    });

    document.getElementById("btn-vaciar").addEventListener("click", vaciarCarrito);
    document.getElementById("btn-reintentar").addEventListener("click", cargarProductos);

    document.getElementById("btn-pagar").addEventListener("click", () => {
        if (estado.carrito.length === 0) {
            mostrarAviso("Agrega al menos un producto antes de pagar.");
            return;
        }
        mostrarAviso(`Compra simulada por ${formatearPrecio(calcularTotal())}. ¡Gracias por preferirnos!`);
        estado.carrito = [];
        renderizarCarrito();
    });
}

// En móvil el menú queda abierto tras usarlo, así que se cierra manualmente
function cerrarMenuMovil() {
    const menu = document.getElementById("menuPrincipal");
    if (menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarEventos();
    renderizarCarrito();
    cargarProductos();
});
