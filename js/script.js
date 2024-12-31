//Molde de los productos
class Producto {
    constructor(imagen, nombreAlbum, autor, precio) {
        this.imagen = imagen;
        this.nombreAlbum = nombreAlbum;
        this.autor = autor;
        this.precio = precio;
    }
}

//Arreglo del catalogo y posteriormente la cracion de los productos en base al molde y como los cargue al arreglo
const catalogo = [];

const producto1 = new Producto("img/flowerBoy.jpg", "Flower Boy", "Tyler, The Creator", 27);
const producto2 = new Producto("img/blond.jpeg", "Blond", "Frank Ocean", 34);
const producto3 = new Producto("img/gkmc.jpg", "Good Kid, m.A.A.d city", "Kendrick Lamar", 32);
const producto4 = new Producto("img/TheMelodicBlueCover.jpeg", "Melodic Blue", "Baby Keem", 31);
const producto5 = new Producto("img/CMIYGLTES.jpg", "Call Me If You Get Lost", "Tyler, The Creator", 30);
const producto6 = new Producto("img/CO.jpg", "channel, ORANGE", "Frank Ocean", 24);
const producto7 = new Producto("img/damn.jpg", "DAMN.", "Kendrick Lamar", 34);
const producto8 = new Producto("img/Dieformybitch.jpg", "Die For My Bitch", "Baby Keem", 17);


catalogo.push(producto1);
catalogo.push(producto2);
catalogo.push(producto3);
catalogo.push(producto4);
catalogo.push(producto5);
catalogo.push(producto6);
catalogo.push(producto7);
catalogo.push(producto8);


//Carrito de compras donde se guarda lo que agreguemos (usa localStorage asi si se cierra o reinicia la pagina se mantienen los articulos en el carrito)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//funcion para cargar el catalogo, por cada producto(objeto) en el catalogo crea una tarjeta con su respectiva informacion y luego por medio de id consigue el contenedor para cargarlo ahi (el que se menciona su funcion en el html)
function mostrarCatalogo(catalogo) {
    const contenedor = document.getElementById("contenedorCatalogo");

    catalogo.forEach(producto => {
        const tarjetaDisco = document.createElement("div");

        tarjetaDisco.innerHTML = `
            <img src="${producto.imagen}">
            <h4>${producto.nombreAlbum}</h4>
            <h4>${producto.autor}</h4>
            <h4>$${producto.precio}</h4>
            <button id="${producto.nombreAlbum}">Comprar</button>
        `;

        contenedor.appendChild(tarjetaDisco);

        const boton = document.getElementById(`${producto.nombreAlbum}`);
        boton.addEventListener("click", () => agregarAlCarrito(producto));
    });
}

//funcion para "comprar" o agregar a la lista de compras en si
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.nombreAlbum === producto.nombreAlbum);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito(); 
    mostrarCarrito(); 
}

//formato de la tabla en la que se muestra la compra (recibo)
function mostrarCarrito() {
    const listaCarrito = document.getElementById("listaCarrito");
    const totalCarrito = document.getElementById("totalCarrito");

    listaCarrito.innerHTML = "";

    const tabla = document.createElement("table");

    tabla.innerHTML = `
        <tr>
            <th>DISCO</th>
            <th>ARTISTA</th>
            <th>CANTIDAD</th>
            <th>PRECIO</th>
            <th></th>
        </tr>
    `;

    let total = 0;

    carrito.forEach((item) => {
        total += item.precio * item.cantidad;

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${item.nombreAlbum}</td>
            <td>${item.autor}</td>
            <td>${item.cantidad}</td>
            <td>$${item.precio * item.cantidad}</td>
            <td id="filaEliminar"><button onclick="eliminarDelCarrito('${item.nombreAlbum}')">Eliminar</button></td>
        `;

        tabla.appendChild(fila);
    });

    listaCarrito.appendChild(tabla);

    totalCarrito.innerText = `Total: $${total}`;
}

//funcion para cuando queremos remover un producto del carrito
function eliminarDelCarrito(nombreAlbum) {
    carrito = carrito.filter(item => item.nombreAlbum !== nombreAlbum);
    guardarCarrito(); 
    mostrarCarrito(); 
}

//funcion que recupera el carrito del localStorage
function recuperarCarrito() {
    const carritoRecuperado = localStorage.getItem("carrito");
    if (carritoRecuperado) {
        carrito = JSON.parse(carritoRecuperado);
        mostrarCarrito();
    }
}

recuperarCarrito(); 
mostrarCatalogo(catalogo);