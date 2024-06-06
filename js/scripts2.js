// Deshabilita función submit del formulario.
document.getElementById("formulario").addEventListener('submit', function (evt) {
    evt.preventDefault();
});

// Fuerza el vaciado del sessionStorage al recargar la página.
sessionStorage.clear();

// Referencias a elementos del DOM
const laLibreta = document.getElementById("libretaCompleta");
const avisoVacio = document.getElementById("recetarioVacio");
const notif = document.getElementById("notificacion");
const contador = document.getElementById("counter");

// Cuenta las recetas del sessionStorage y muestra/oculta elementos según sea necesario.
function cuentaRecetas() {
    if (sessionStorage.length > 0) {
        contador.innerHTML = sessionStorage.length;
        laLibreta.style.display = "block";
        avisoVacio.style.display = "none";
        notif.style.display = "block";
    } else {
        laLibreta.style.display = "none";
        avisoVacio.style.display = "block";
        notif.style.display = "none";
    }
}

// Trae la data de un JSON.
const traerDatos = async () => {
    const response = await fetch('https://fafafx.github.io/ch-javascript/data/info.json');
    const data = await response.json();
    return data;
};

// Completa el select con la data traída.
async function completarSelect() {
    const totalRecetas = await traerDatos();
    const opcionesSelect = totalRecetas.map(e => `<option value="${e.id}">${e.nombre}</option>`);
    document.getElementById("select-receta").innerHTML = '<option value="0" disabled selected hidden>Seleccione receta...</option>' + opcionesSelect.join('');
}

// Ejecuta la función de completar select al cargar la página.
completarSelect();

// Referencias a elementos del DOM
const btnCalcularReceta = document.getElementById("btnCalcular");
const btnDescargarReceta = document.getElementById("btnDescargar");
const btnCoffee = document.getElementById("coffee");
const libreta = document.querySelector("#menuM");
const abreLibreta = document.querySelector("#open");
const cierraLibreta = document.querySelector("#btnCierraLibreta");
const anotarLibreta = document.querySelector("#anotar");
const borrarRecetas = document.querySelector("#btnBorraTodo");
let infoExtra = document.querySelector("#infoAdicional");
let btnDescarga = document.querySelector("#btnDescargar");
const hojaRecetario = document.getElementById("recetario-lista");

// Chequea si hay recetas en el sessionStorage al cargar la página.
cuentaRecetas();

// Función para calcular y mostrar la receta
function calcularYMostrarReceta() {
    const contenidoResultante = document.getElementById("to-print");
    const idSeleccionado = parseInt(document.getElementById("select-receta").value);
    const cantidadPanes = document.getElementById("cantidad").value;

    if (idSeleccionado == 0) {
        alert("Debe seleccionar una receta.");
        return;
    }

    if (!cantidadPanes) {
        alert("Debe ingresar la cantidad de panes.");
        return;
    }

    const recetaFiltrada = totalRecetas.find(receta => receta.id == idSeleccionado);

    // Cálculo de cantidades
    let masaTotal = calcularMasaTotal(recetaFiltrada, cantidadPanes);
    let cantidadKilogramos = Math.floor(masaTotal / 1000);
    let cantidadGramos = masaTotal % 1000;

    // Mostrar cantidades en la interfaz
    if (cantidadKilogramos > 0) {
        console.log(`${cantidadKilogramos}kg ${cantidadGramos}grs`);
    } else {
        console.log(`${masaTotal}grs`);
    }

    // Mostrar receta en la interfaz (código para esto no proporcionado)
}

// Función para calcular la masa total de la receta
function calcularMasaTotal(receta, cantidadPanes) {
    const tamano = document.getElementById("gramaje-unidad").checked ? 0.8 : 1;
    const unidadMedida = document.getElementById("onzas").checked ? 0.035274 : 1;

    const {
        harina,
        agua,
        levadura,
        sal,
        grasa
    } = receta.ingredientes;

    const masaTotal = (harina + agua + levadura + sal + grasa) * cantidadPanes * tamano * unidadMedida;
    return Math.ceil(masaTotal);
}

// Evento de click en el botón de calcular receta
btnCalcularReceta.addEventListener("click", function(event) {
    event.preventDefault();
    calcularYMostrarReceta();
});

// Función para agregar una receta a la libreta
function anotarReceta() {
    Swal.fire({
        title: "¿Desea guardar la receta?",
        text: "Escriba un nombre para la receta:",
        input: 'text',
        showCancelButton: true,
    }).then((result) => {
        if (result.value) {
            let recetaName = result.value;
            let idContenido = Math.round(Math.random() * 3577874);
            let contenido = recetaData;
            let fecha = new Date();
            let notaEscribir = new Nota(idContenido, recetaName, contenido, fecha);
            sessionStorage.setItem(idContenido, JSON.stringify(notaEscribir));

            // Crea el elemento en el recetario
            let dataRecetario = `
            <tr id="${idContenido}">
                <td class="t-center">${recetaName}</td>
                <td class="t-center"><i class="fa-solid fa-trash mediumIcon" onclick="borraReceta('${idContenido}')"></i></td>
            </tr>`;
            hojaRecetario.innerHTML += dataRecetario;
            cuentaRecetas();
            Toastify({
                gravity: "bottom",
                position: "right",
                text: "La receta llamada " + recetaName + " fue guardada correctamente.",
                duration: 3000
            }).showToast();
        }
    });
}

// Evento de click en el botón de agregar receta a la libreta
anotarLibreta.addEventListener("click", anotarReceta);

// Otras funciones y eventos...

