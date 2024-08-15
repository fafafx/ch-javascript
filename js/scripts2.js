// Configura los eventos iniciales
document.getElementById("formulario").addEventListener('submit', evt => evt.preventDefault());
sessionStorage.clear();

// Variables globales
const elements = {
    laLibreta: document.getElementById("libretaCompleta"),
    avisoVacio: document.getElementById("recetarioVacio"),
    notif: document.getElementById("notificacion"),
    contador: document.getElementById("counter"),
    selectReceta: document.getElementById("select-receta"),
    contenidoResultante: document.getElementById("to-print"),
    recetaEncabezado: document.querySelector("#recetaHeader"),
    contenido: document.querySelector("#recetaPrint"),
    errorReceta: document.querySelector("#error-receta"),
    errorCantidad: document.querySelector("#error-cantidad"),
    infoExtra: document.querySelector("#infoAdicional"),
    hojaRecetario: document.getElementById("recetario-lista"),
    btnCalcularReceta: document.getElementById("btnCalcular"),
    btnDescargarReceta: document.getElementById("btnDescargar"),
    anotarLibreta: document.querySelector("#anotar"),
    borrarRecetas: document.querySelector("#btnBorraTodo"),
    libreta: document.querySelector("#menuM"),
    abreLibreta: document.querySelector("#open"),
    cierraLibreta: document.querySelector("#btnCierraLibreta"),
    btnCoffee: document.getElementById("coffee")
};

// Función para actualizar el estado de la libreta
const actualizarEstadoLibreta = () => {
    const hasRecetas = sessionStorage.length > 0;
    elements.contador.innerHTML = hasRecetas ? sessionStorage.length : 0;
    elements.laLibreta.style.display = hasRecetas ? "block" : "none";
    elements.avisoVacio.style.display = hasRecetas ? "none" : "block";
    elements.notif.style.display = hasRecetas ? "block" : "none";
};

// Función para obtener y cargar datos de recetas
const cargarDatosRecetas = async () => {
    const response = await fetch('https://fafafx.github.io/ch-javascript/data/info.json');
    const recetas = await response.json();
    elements.selectReceta.innerHTML = `
        <option value="0" disabled selected hidden>Seleccione receta...</option>
        ${recetas.map(e => `<option value="${e.id}">${e.nombre}</option>`).join('')}
    `;
    return recetas;
};

// Función para calcular y mostrar receta
const calcularReceta = evt => {
    evt.preventDefault();
    const idSeleccionado = parseInt(elements.selectReceta.value);
    const cantidadPanes = document.getElementById("cantidad").value;
    const cambiaTamano = document.getElementById("gramaje-unidad").checked;
    const checkOnzas = document.getElementById("onzas").checked;

    if (idSeleccionado === 0) {
        elements.errorReceta.style.display = "block";
        return;
    }
    elements.errorReceta.style.display = "none";

    if (!cantidadPanes) {
        elements.errorCantidad.style.display = "block";
        return;
    }
    elements.errorCantidad.style.display = "none";

    const tamano = cambiaTamano ? 0.8 : 1;
    const unidadMedida = checkOnzas ? 0.035274 : 1;
    const medidaNombre = checkOnzas ? "oz" : "grs";

    const recetaFiltrada = totalRecetas.find(receta => receta.id === idSeleccionado);
    const { nombre, ingredientes } = recetaFiltrada;
    const { harina, agua, levadura, sal, grasa, conMasaMadre } = ingredientes;

    const prepararCantidad = a => Math.ceil((a * cantidadPanes) * tamano * unidadMedida);
    const porcentaje = (a, b) => Math.ceil((a / b) * 100);

    const cantidades = {
        harina: prepararCantidad(harina),
        agua: prepararCantidad(agua),
        levadura: prepararCantidad(levadura),
        sal: prepararCantidad(sal),
        grasa: prepararCantidad(grasa),
        masa: Math.ceil(harina + agua + levadura + sal + grasa)
    };

    const porcentajes = {
        harina: porcentaje(cantidades.harina, cantidades.harina),
        agua: porcentaje(cantidades.agua, cantidades.harina),
        levadura: porcentaje(cantidades.levadura, cantidades.harina),
        sal: porcentaje(cantidades.sal, cantidades.harina),
        grasa: porcentaje(cantidades.grasa, cantidades.harina)
    };

    const recetaHeader = `
        <p class="t-center space-t-20"><img src="img/panes/${nombre.toLowerCase().split(" ", 1)}.png"></p>
        <h3 class="titulos t-center">${nombre}</h3>
        <hr>
        <p class="disclaimer t-center space-t-20">Cantidades totales para <em>${cantidadPanes} unidades de ${Math.ceil(cantidades.masa / cantidadPanes)} ${medidaNombre} aproximadamente (Tamaño ${tamano === 0.8 ? "pequeño" : "normal"}).</em></p>
    `;

    const recetaData = `
        <table class="data-table t-center">
            <thead>
                <tr>
                    <th class="t-center">Ingrediente</th>
                    <th class="t-center">Cantidad</th>
                    <th class="t-center">%</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Harina</td><td>${cantidades.harina.toFixed(0)} ${medidaNombre}.</td><td>${porcentajes.harina}%</td></tr>
                <tr><td>Agua</td><td>${cantidades.agua.toFixed(0)} ${medidaNombre}.</td><td>${porcentajes.agua}%</td></tr>
                <tr><td>Levadura ${conMasaMadre ? '<span class="aviso">(*)</span>' : ''}</td><td>${cantidades.levadura.toFixed(0)} ${medidaNombre}.</td><td>${porcentajes.levadura}%</td></tr>
                <tr><td>Sal</td><td>${cantidades.sal.toFixed(0)} ${medidaNombre}.</td><td>${porcentajes.sal}%</td></tr>
                <tr><td>Materia grasa</td><td>${cantidades.grasa.toFixed(0)} ${medidaNombre}.</td><td>${porcentajes.grasa}%</td></tr>
                <tr><td></td><td>Total masa</td><td>${cantidades.masa.toFixed(0)} ${medidaNombre}.</td></tr>
            </tbody>
        </table>
    `;

    elements.contenidoResultante.style.display = "block";
    elements.contenido.innerHTML = "";
    elements.recetaEncabezado.innerHTML = "";
    elements.contenido.insertAdjacentHTML('afterbegin', `<div id="cargando" class="loading"><img class="canvas" src="img/loadGif.webp" alt="cargando..."></div>`);
    setTimeout(() => {
        elements.recetaEncabezado.insertAdjacentHTML('afterbegin', recetaHeader);
        elements.contenido.insertAdjacentHTML('afterbegin', recetaData);
        elements.anotarLibreta.classList.add("muestra");
        elements.infoExtra.classList.add("muestra");
        elements.btnDescargarReceta.classList.add("muestra");
    }, 2000);
};

// Función para mostrar notificación de descarga
const mostrarToast = (mensaje) => {
    Toastify({
        gravity: "bottom",
        position: "right",
        text: mensaje,
        duration: 3000
    }).showToast();
};

// Función para descargar receta
const descargaReceta = () => mostrarToast("Se está procesando la descarga de la receta en PDF.");

// Función para anotar receta
const anotarReceta = async () => {
    const { value: recetaName } = await Swal.fire({
        title: "¿Desea guardar la receta?",
        text: "Escriba un nombre para la receta:",
        input: 'text',
        showCancelButton: true,
    });

    if (recetaName) {
        const contenido = elements.contenido.innerHTML;
        idItemLibreta = Math.round(Math.random() * 3577874);
        const nota = { idNota: idItemLibreta, fechaNota: new Date(), dataNota: recetaName, contenido };
        sessionStorage.setItem(idItemLibreta, JSON.stringify(nota));
        const dataRecetario = `
            <tr id="${idItemLibreta}">
                <td class="t-center">${recetaName}</td>
                <td class="t-center"><i class="fa-solid fa-trash mediumIcon" onclick="borrarReceta('${idItemLibreta}')"></i></td>
            </tr>
        `;
        elements.hojaRecetario.innerHTML += dataRecetario;
        actualizarEstadoLibreta();
        mostrarToast(`La receta llamada ${recetaName} fue guardada correctamente.`);
    }
};

// Función para borrar receta
const borrarReceta = async (id) => {
    const { value: confirmar } = await Swal.fire({
        title: "¿Desea borrar esta receta?",
        text: "La receta se eliminará permanentemente.",
        icon: 'warning',
        showCancelButton: true,
    });

    if (confirmar) {
        sessionStorage.removeItem(id);
        document.getElementById(id).remove();
        actualizarEstadoLibreta();
        mostrarToast("Receta eliminada correctamente.");
    }
};

// Función para borrar todas las recetas
const borrarTodasRecetas = async () => {
    const { value: confirmar } = await Swal.fire({
        title: "¿Desea borrar todas las recetas?",
        text: "Las recetas se eliminarán permanentemente.",
        icon: 'warning',
        showCancelButton: true,
    });

    if (confirmar) {
        sessionStorage.clear();
        elements.hojaRecetario.innerHTML = "";
        actualizarEstadoLibreta();
        mostrarToast("Todas las recetas fueron eliminadas.");
    }
};

// Inicialización
const init = async () => {
    const recetas = await cargarDatosRecetas();
    elements.btnCalcularReceta.addEventListener('click', calcularReceta);
    elements.btnDescargarReceta.addEventListener('click', descargaReceta);
    elements.anotarLibreta.addEventListener('click', anotarReceta);
    elements.borrarRecetas.addEventListener('click', borrarTodasRecetas);
    elements.abreLibreta.addEventListener('click', () => elements.libreta.classList.add("muestra"));
    elements.cierraLibreta.addEventListener('click', () => elements.libreta.classList.remove("muestra"));

    actualizarEstadoLibreta();
};

// Ejecuta la inicialización
init();
