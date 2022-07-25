// Acá irá una función que eventualmente traerá datos por externos y creará un array.

//Funcion que crea objectos

function Pan(id, nombre, harina, agua, levadura, sal, grasa, descripcion, conMasaMadre) {
    this.id = id;
    this.nombre = nombre;
    this.harina = harina;
    this.agua = agua;
    this.levadura = levadura;
    this.sal = sal;
    this.grasa = grasa;
    this.descripcion = descripcion;
    this.conMasaMadre = conMasaMadre;
}

//se crean los objetos
const pan1 = new Pan(1, "Ciabatta", 100, 100, 100, 100, 100, "Descripcion de Ciabatta", true);
const pan2 = new Pan(2, "Hallulla", 50, 30, 1, 2, 20, "Descripcion de Hallulla", false);
const pan3 = new Pan(3, "Marraqueta", 50, 30, 1, 2, 20, "Descripcion de Marraqueta", false);
const pan4 = new Pan(4, "Bocado de Dama", 50, 30, 1, 2, 20, "Bocado de Dama", false);
const pan5 = new Pan(5, "Baguette", 50, 30, 1, 2, 20, "Descripcion de Bocado de dama", true);
const pan6 = new Pan(6, "Brioche", 50, 30, 1, 2, 20, "Descripcion de Brioche", false);
const pan7 = new Pan(7, "Bollo", 50, 30, 1, 2, 20, "Descripcion de Bollo", true);
const pan8 = new Pan(8, "Hogaza", 50, 30, 1, 2, 20, "Descripcion de Hogaza", true);
const pan9 = new Pan(9, "Frica", 50, 30, 1, 2, 20, "Descripcion de Frica", false);
const pan10 = new Pan(10, "Amasado", 50, 30, 1, 2, "Descripcion de Amasado", 20, false);

//se crea el array con todos los objetos
const totalRecetas = [pan1, pan2, pan3, pan4, pan5, pan6, pan7, pan8, pan9, pan10];
const selectPrincipal = document.getElementById("select-receta");


// Referencia a boton dentro del DOM 
const btnCalcularReceta = document.getElementById("btnCalcular");
const btnDescargarReceta = document.getElementById("btnDescargar");
const btnCoffee = document.getElementById("coffee");
// temporal para revisar si funciona el check.
/* let gramaje = false; */

function calculaReceta(calcula) {
    let contenidoResultante = document.getElementById("to-print");
    let idSeleccionado = parseInt(document.getElementById("select-receta").value);
    let contenido = document.querySelector("#informacion");
    let recetaEncabezado = document.querySelector("#recetaHeader");
    let cambiaTamano = document.getElementById("gramaje-unidad").checked;
    let tamano = 1;
    let tamanoPieza = "normal";
    let cantidadPanes = document.getElementById("cantidad").value;
    let errorReceta = document.querySelector("#error-receta");
    let errorCantidad = document.querySelector("#error-cantidad");
    // Valida que haya una receta seleccionada y que el campo cantidad no esté vacío.

    if (idSeleccionado == 0) {
        errorReceta.style.display = "block";
        calcula.preventDefault();

    } else {
        errorReceta.style.display = "none";
        if (cantidadPanes !== "") {


            //Chequea si el toggle de tamaño está marcado, y reduce los valores a un 80%

            if (cambiaTamano) {
                tamano = 0.8;
                tamanoPieza = "pequeño";
            } else {
                console.log("Se mantiene la proporcion original");
            };

            // Filtra array por id

            let recetaFiltrada = totalRecetas.filter(receta => receta.id == idSeleccionado);

            // Crea variabkes desde ese array
            let nombre = recetaFiltrada[0].nombre;
            let harina = recetaFiltrada[0].harina;
            let agua = recetaFiltrada[0].agua;
            let levadura = recetaFiltrada[0].levadura;
            let sal = recetaFiltrada[0].sal;
            let grasa = recetaFiltrada[0].grasa;
            let descripcion = recetaFiltrada[0].descripcion;
            let conMasaMadre = recetaFiltrada[0].conMasaMadre;
            let alertaMM = ("");
            let nombreImagen = (nombre).toLowerCase(); // falta la funcion que en el caso que el nombre tenga varias palabras, seleccione solo la primera.

            if (conMasaMadre == true) {
                alertaMM = (`<span class="aviso">(*)</span>`);
            } else {};

            //Variables para operar


            let harinaTotal = Math.ceil((harina * cantidadPanes) * tamano);
            let aguaTotal = Math.ceil((agua * cantidadPanes) * tamano);
            let levaduraTotal = Math.ceil((levadura * cantidadPanes) * tamano);
            let salTotal = Math.ceil((sal * cantidadPanes) * tamano);
            let grasaTotal = Math.ceil((grasa * cantidadPanes) * tamano);
            let masaTotal = Math.ceil(harinaTotal + aguaTotal + levaduraTotal + salTotal + grasaTotal);




            function porcentajePanadero() {
                porcentajeHarina = Math.ceil((harinaTotal / harinaTotal) * 100);
                porcentajeAgua = Math.ceil((aguaTotal / harinaTotal) * 100);
                porcentajeLevadura = Math.ceil((levaduraTotal / harinaTotal) * 100);
                porcentajeSal = Math.ceil((salTotal / harinaTotal) * 100);
                porcentajeGrasa = Math.ceil((grasaTotal / harinaTotal) * 100);

            }

            porcentajePanadero();
            let gramajeUnidad = Math.ceil(masaTotal / cantidadPanes);

            //Optimizar generacion de estas tablas con data. Habrá que modificar los objetos.

            let recetaHeader = `
        <p class="t-center space-t-20"><img src="img/panes/${nombreImagen}.png"></p>
        <h3 class="titulos t-center">${nombre}</h3>
        <hr>
        <p class="disclaimer t-center space-t-20">Cantidades totales para <em>${cantidadPanes} unidades de ${gramajeUnidad} gramos aproximadamente (Tamaño ${tamanoPieza}).
        </em></p>

`;



            let recetaData = `
        <tr>
        <td>Harina</td>
        <td>${harinaTotal} grs.</td>
        <td>${porcentajeHarina}%</td>
        </tr>

        <tr>
        <td>Agua</td>
        <td>${aguaTotal} grs.</td>
        <td>${porcentajeAgua}%</td>
        </tr>

        <tr>
        <td>Levadura ${alertaMM}</td>
        <td>${levaduraTotal} grs.</td>
        <td>${porcentajeLevadura}%</td>
        </tr>

        <tr>
        <td>Sal</td>
        <td>${salTotal} grs.</td>
    <td>${porcentajeSal}%</td>
    </tr>

    <tr>
    <td>Materia grasa</td>
    <td>${grasaTotal} grs.</td>
    <td>${porcentajeGrasa}%</td>
    </tr>

    <tr>
    <td></td>
    <td>Total masa</td>
    <td>${masaTotal} grs.</td>
    </tr>
        `;

            //Se rellenan los bloques HTML

            recetaEncabezado.innerHTML = "";
            recetaEncabezado.insertAdjacentHTML('afterbegin', recetaHeader);
            contenido.innerHTML = "";
            contenido.insertAdjacentHTML('afterbegin', recetaData);
            errorCantidad.style.display = "none";
            contenidoResultante.style.display = "block";
        } else {
            errorCantidad.style.display = "block";
            calcula.preventDefault();
            }
    }



};

function descargaReceta() {
    alert("Descargar PDF de la receta");
}
function modalCoffee() {
    alert("holi");
}

// Se agrega el listener al boton y se ejecuta funcion al hacer click.

btnCalcularReceta.addEventListener("click", calculaReceta);
btnDescargarReceta.addEventListener("click", descargaReceta);
btnCoffee.addEventListener("click", modalCoffee);


function validaentradas() { 
    if (idSeleccionado == 0) {
        errorReceta.style.display = "block";
        calcula.preventDefault();

    } else { };
};

// Notas para mi:faltan las validaciones de formulario. La forma en que se generarán los objetos, quizá se verá en la clase de json, 