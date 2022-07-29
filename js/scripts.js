// Deshabilita funcion submit del formulario.

document.getElementById('formulario').addEventListener('submit', function (evt) {
    evt.preventDefault();
})
// Entrada de datos JSON.

const dataEntrada = `
 
[
    {
    "id": 1,
    "nombre": "Ciabatta",
    "ingredientes": {
        "harina": 100,
        "detalleHarina":"50% harina 000 + 50% harina 0000",
        "agua": 100,
        "levadura": 100,
        "sal": 100,
        "grasa": 100,
        "descripcion": "Descripcion de Ciabatta",
        "conMasaMadre": true
    }
      },
      {
        "id": 2,
        "nombre": "Hallulla",
        "ingredientes": {
            "harina": 100,
            "detalleHarina":"50% harina 000 + 50% harina 0000",
            "agua": 100,
            "levadura": 100,
            "sal": 100,
            "grasa": 100,
            "descripcion": "Descripcion de Ciabatta",
            "conMasaMadre": true
        }
          },

     {
            "id": 3,
            "nombre": "Marraqueta",
            "ingredientes": {
                "harina": 100,
                "detalleHarina":"50% harina 000 + 50% harina 0000",
                "agua": 100,
                "levadura": 100,
                "sal": 100,
                "grasa": 100,
                "descripcion": "Descripcion de Ciabatta",
                "conMasaMadre": true
            }
              },
     {
                "id": 4,
                "nombre": "Bocado de Dama",
                "ingredientes": {
                    "harina": 100,
                    "detalleHarina":"50% harina 000 + 50% harina 0000",
                    "agua": 100,
                    "levadura": 100,
                    "sal": 100,
                    "grasa": 100,
                    "descripcion": "Descripcion de Ciabatta",
                    "conMasaMadre": true
                }
                  },
        {
                    "id": 5,
                    "nombre": "Baguette",
                    "ingredientes": {
                        "harina": 100,
                        "detalleHarina":"50% harina 000 + 50% harina 0000",
                        "agua": 100,
                        "levadura": 100,
                        "sal": 100,
                        "grasa": 100,
                        "descripcion": "Descripcion de Ciabatta",
                        "conMasaMadre": true
                    }
                      },
         {
                        "id": 6,
                        "nombre": "Brioche",
                        "ingredientes": {
                            "harina": 100,
                            "detalleHarina":"50% harina 000 + 50% harina 0000",
                            "agua": 100,
                            "levadura": 100,
                            "sal": 100,
                            "grasa": 100,
                            "descripcion": "Descripcion de Ciabatta",
                            "conMasaMadre": true
                        }
                          },
        {
                            "id": 7,
                            "nombre": "Croissant",
                            "ingredientes": {
                                "harina": 100,
                                "detalleHarina":"50% harina 000 + 50% harina 0000",
                                "agua": 100,
                                "levadura": 100,
                                "sal": 100,
                                "grasa": 100,
                                "descripcion": "Descripcion de Ciabatta",
                                "conMasaMadre": true
                            }
                              },
        {
                                "id": 8,
                                "nombre": "Hogaza Rústica",
                                "ingredientes": {
                                    "harina": 100,
                                    "detalleHarina":"50% harina 000 + 50% harina 0000",
                                    "agua": 100,
                                    "levadura": 100,
                                    "sal": 100,
                                    "grasa": 100,
                                    "descripcion": "Descripcion de Ciabatta",
                                    "conMasaMadre": true
                                }
                                  },
            {
                                    "id": 9,
                                    "nombre": "Pan Frica",
                                    "ingredientes": {
                                        "harina": 100,
                                        "detalleHarina":"50% harina 000 + 50% harina 0000",
                                        "agua": 100,
                                        "levadura": 100,
                                        "sal": 100,
                                        "grasa": 100,
                                        "descripcion": "Descripcion de Ciabatta",
                                        "conMasaMadre": true
                                    }
                                      },
            {
                                        "id": 10,
                                        "nombre": "Pan Amasado",
                                        "ingredientes": {
                                            "harina": 100,
                                            "detalleHarina":"50% harina 000 + 50% harina 0000",
                                            "agua": 100,
                                            "levadura": 100,
                                            "sal": 100,
                                            "grasa": 100,
                                            "descripcion": "Descripcion de Ciabatta",
                                            "conMasaMadre": true
                                        }
                                          }
    
]`


console.log(typeof dataEntrada);
// Se parsean los datos JSON.
const totalRecetas = JSON.parse(dataEntrada);
console.log(typeof totalRecetas);

// Se genera el select usando map desde el array totalRecetas. falta generar ese array desde JSON. Con el tiempo se implementará un buscador de texto que se autocomplete tipo google. 

let opcionesSelect = totalRecetas.map(e => {
    return `<option value="${e.id}">${e.nombre}</option>`
})
document.getElementById("select-receta").innerHTML = '<option value="0" disabled selected hidden>Seleccione receta...</option>' + opcionesSelect;

// Referencia a elementos dentro del DOM 
const btnCalcularReceta = document.getElementById("btnCalcular");
const btnDescargarReceta = document.getElementById("btnDescargar");
const btnCoffee = document.getElementById("coffee");
const abreLibreta = document.getElementById("abre-libreta");
const libreta = document.querySelector("#libreta");
const anotarLibreta = document.querySelector("#anotar");
const borrarRecetas = document.querySelector("#borraRecetas");
let enfocar = document.querySelector(".canvas");
let infoExtra = document.querySelector("#infoAdicional");
let btnDescarga = document.querySelector("#btnDescargar");



// Funcion Principal

function calculaReceta(calcula) {
    let contenidoResultante = document.getElementById("to-print");
    let idSeleccionado = parseInt(document.getElementById("select-receta").value);
    let contenido = document.querySelector("#recetaPrint");
    let recetaEncabezado = document.querySelector("#recetaHeader");
    let cambiaTamano = document.getElementById("gramaje-unidad").checked;
    let checkOnzas = document.getElementById("onzas").checked;
    let tamano = 1;
    let tamanoPieza = "normal";
    let cantidadPanes = document.getElementById("cantidad").value;
    let errorReceta = document.querySelector("#error-receta");
    let errorCantidad = document.querySelector("#error-cantidad");
    idItemLibreta = Math.round(Math.random() * 3577874);
    infoExtra.classList.remove("muestra");
    btnDescarga.classList.remove("muestra");



    // Valida que haya una receta seleccionada, si no lo está, lo alerta.

    if (idSeleccionado == 0) {
        errorReceta.style.display = "block";
        calcula.preventDefault();

    } else {
        errorReceta.style.display = "none";
        // Valida si el campo de unidades no está vacio. Si lo está, lo alerta.
        if (cantidadPanes !== "") {

            //Chequea si el toggle de tamaño está marcado, y reduce los valores a un 80%

            if (cambiaTamano) {
                tamano = 0.8;
                tamanoPieza = "pequeño";
            } else {
                console.log("Se mantiene la proporcion original");
            };

            //Chequea si es onza o grs.
            let unidadMedida = 1;
            let medidaNombre = "grs";
            if (checkOnzas) {
                unidadMedida = 0.035274;
                medidaNombre = "oz";

                console.log("Se cambia la medida a onzas");
            } else {
                console.log("Se mantiene la medida en gramos");
            }



            // Filtra array por id usando find.

            let recetaFiltrada = totalRecetas.find(receta => receta.id == idSeleccionado);
            console.log(recetaFiltrada);

            // Crea variables desde ese array
            let nombre = recetaFiltrada.nombre;
            let harina = recetaFiltrada.ingredientes.harina;
            let agua = recetaFiltrada.ingredientes.agua;
            let levadura = recetaFiltrada.ingredientes.levadura;
            let sal = recetaFiltrada.ingredientes.sal;
            let grasa = recetaFiltrada.ingredientes.grasa;
            let descripcion = recetaFiltrada.ingredientes.descripcion;
            let conMasaMadre = recetaFiltrada.ingredientes.conMasaMadre;
            let alertaMM = ("");
            let nombreImagen = (nombre).toLowerCase().split(" ", 1); // Genera una variable para el nombre de la imagen a mostrar, usando como fuente el nombre del producto en minusculas. Si el nombre del producto se compone de varias palabras, se selecciona solo la primera.

            if (conMasaMadre == true) {
                alertaMM = (`<span class="aviso">(*)</span>`);
            } else {};


            //Variables para operar
            let harinaTotal = Math.ceil(((harina * cantidadPanes) * tamano)) * unidadMedida;
            let aguaTotal = Math.ceil(((agua * cantidadPanes) * tamano)) * unidadMedida;
            let levaduraTotal = Math.ceil(((levadura * cantidadPanes) * tamano)) * unidadMedida;
            let salTotal = Math.ceil(((sal * cantidadPanes) * tamano)) * unidadMedida;
            let grasaTotal = Math.ceil(((grasa * cantidadPanes) * tamano)) * unidadMedida;
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

            // Optimizar generacion de estas tablas con data. Habrá que modificar los objetos.

            let recetaHeader = `
        <p class="t-center space-t-20"><img src="img/panes/${nombreImagen}.png"></p>
        <h3 class="titulos t-center">${nombre}</h3>
        <hr>
        <p class="disclaimer t-center space-t-20">Cantidades totales para <em>${cantidadPanes} unidades de ${gramajeUnidad} ${medidaNombre} aproximadamente (Tamaño ${tamanoPieza}).
        </em></p>

`;

            let loading = `
                   <div id="cargando" class="loading"><img class="canvas" src="img/loadGif.webp" alt="cargando..."></div>

`;

            recetaData = `
        <table class="data-table t-center">
        <!-- Cabecera de la tabla -->
        <thead>
        <tr>
        <th class="t-center">Ingrediente</th>
        <th class="t-center">Cantidad</th>
        <th class="t-center">%</th>
        </tr>
        </thead>
        <tbody id="informacion">
            
        <tr>
        <td>Harina</td>
        <td>${harinaTotal.toFixed(0)} ${medidaNombre}.</td>
        <td>${porcentajeHarina}%</td>
        </tr>

        <tr>
        <td>Agua</td>
        <td>${aguaTotal.toFixed(0)} ${medidaNombre}.</td>
        <td>${porcentajeAgua}%</td>
        </tr>

        <tr>
        <td>Levadura ${alertaMM}</td>
        <td>${levaduraTotal.toFixed(0)} ${medidaNombre}.</td>
        <td>${porcentajeLevadura}%</td>
        </tr>

        <tr>
        <td>Sal</td>
        <td>${salTotal.toFixed(0)} ${medidaNombre}.</td>
    <td>${porcentajeSal}%</td>
    </tr>

    <tr>
    <td>Materia grasa</td>
    <td>${grasaTotal.toFixed(0)} ${medidaNombre}.</td>
    <td>${porcentajeGrasa}%</td>
    </tr>

    <tr>
    <td></td>
    <td>Total masa</td>
    <td>${masaTotal.toFixed(0)} ${medidaNombre}.</td>
    </tr>
    </tbody>
    </table>

    
    
                        
        `;


            //Se rellenan los bloques HTML
            function draw() {
                contenido.innerHTML = "";
                recetaEncabezado.innerHTML = "";
                recetaEncabezado.insertAdjacentHTML('afterbegin', recetaHeader);
                contenido.insertAdjacentHTML('afterbegin', recetaData);
                anotarLibreta.classList.add("muestra");
                infoExtra.classList.add("muestra");
                btnDescarga.classList.add("muestra");



            }



            anotarLibreta.classList.remove("muestra");
            recetaEncabezado.innerHTML = "";
            contenido.innerHTML = "";
            contenido.insertAdjacentHTML('afterbegin', loading);

            errorCantidad.style.display = "none";
            contenidoResultante.style.display = "block";
            setTimeout(draw, 2000);

        } else {
            errorCantidad.style.display = "block";
            calcula.preventDefault();
        }

    }



};


// Funciones de la libreta

function descargaReceta() {
    alert("Descargar PDF de la receta");
}

function modalCoffee() {
    alert("Se abre link");

}

let contadorRecetas = document.querySelector("#contador");

function anotarReceta() {
    let idContenido = idItemLibreta + "hola";
    let contenido = recetaData;
    sessionStorage.setItem(idContenido, contenido);
    cuentaRecetas();

}

function cuentaRecetas() {
    let contadorStorage = sessionStorage.length;
    contadorRecetas.innerHTML = "";
    contadorRecetas.insertAdjacentHTML('afterbegin', contadorStorage);
};

cuentaRecetas();

function borraReceta() {
    sessionStorage.clear();
    cuentaRecetas();
};

// notificaciones



// Se agrega el listener al boton y se ejecuta funcion al hacer click.

btnCalcularReceta.addEventListener("click", calculaReceta);
btnDescargarReceta.addEventListener("click", descargaReceta);
btnCoffee.addEventListener("click", modalCoffee);
abreLibreta.addEventListener("click", abreCierraLibreta);
anotarLibreta.addEventListener("click", anotarReceta);
borrarRecetas.addEventListener("click", borraReceta);


function abreCierraLibreta() {
    let botonAbreCierra = document.querySelector("#toggleReceta");
    libreta.classList.toggle("muestra");
    botonAbreCierra.classList.toggle("rotate");


};