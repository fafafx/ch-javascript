// Deshabilita funcion submit del formulario.

document.getElementById('formulario').addEventListener('submit', function (evt) {
    evt.preventDefault();
})

// Función que trae la data JSON.
const traerDatos = async () => {
    const response = await fetch('https://api.jsonserve.com/p2eaJm', {
        'mode': 'no-cors',
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials' : true 
        }
      }
      );
    const data = await response.json();
    totalRecetas = data;
    return data;
};
            
            //Ejecuta el fetch y completa el select con la data traida.

            (async () => {
                await traerDatos();
                let opcionesSelect = totalRecetas.map(e => {
                    return `<option value="${e.id}">${e.nombre}</option>`
                })
                // Escribe HTML de los options del select.

                document.getElementById("select-receta").innerHTML = '<option value="0" disabled selected hidden>Seleccione receta...</option>' + opcionesSelect;
            })();


            // Referencia a elementos dentro del DOM 
            const btnCalcularReceta = document.getElementById("btnCalcular");
            const btnDescargarReceta = document.getElementById("btnDescargar");
            const btnCoffee = document.getElementById("coffee");
            const abreLibreta = document.getElementById("abre-libreta");
            const libreta = document.querySelector("#libreta");
            const anotarLibreta = document.querySelector("#anotar");
            const borrarRecetas = document.querySelector("#borraRecetas");
            let infoExtra = document.querySelector("#infoAdicional");
            let btnDescarga = document.querySelector("#btnDescargar");



            // Funcion Principal

            function calculaReceta(calcula) {
                const contenidoResultante = document.getElementById("to-print");
                const idSeleccionado = parseInt(document.getElementById("select-receta").value);
                const contenido = document.querySelector("#recetaPrint");
                const recetaEncabezado = document.querySelector("#recetaHeader");
                const cambiaTamano = document.getElementById("gramaje-unidad").checked;
                const checkOnzas = document.getElementById("onzas").checked;
                let tamano = 1;
                let tamanoPieza = "normal";
                const cantidadPanes = document.getElementById("cantidad").value;
                const errorReceta = document.querySelector("#error-receta");
                const errorCantidad = document.querySelector("#error-cantidad");
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
                        let {
                            nombre,
                            ingredientes: {
                                harina,
                                agua,
                                levadura,
                                sal,
                                grasa,
                                descripcion,
                                conMasaMadre
                            }
                        } = recetaFiltrada;

                        // Genera una variable para el nombre de la imagen a mostrar, usando como fuente el nombre del producto en minusculas. Si el nombre del producto se compone de varias palabras, se selecciona solo la primera.
                        let alertaMM = ("");
                        let nombreImagen = (nombre).toLowerCase().split(" ", 1);

                        //Verifica si el la receta puede usar masa madre y lo alerta.
                        conMasaMadre == true ? alertaMM = (`<span class="aviso">(*)</span>`) : alertaMM = ("");

                        //Variables para operar
                        function preparaCantidades(a) {
                            return Math.ceil(((a * cantidadPanes) * tamano)) * unidadMedida;
                        }

                        function porcentajePanadero(a, b) {
                            return Math.ceil((a / b) * 100);
                        }

                        let harinaTotal = preparaCantidades(harina);
                        let aguaTotal = preparaCantidades(agua);
                        let levaduraTotal = preparaCantidades(levadura);
                        let salTotal = preparaCantidades(sal);
                        let grasaTotal = preparaCantidades(grasa);
                        let masaTotal = Math.ceil(harinaTotal + aguaTotal + levaduraTotal + salTotal + grasaTotal);
                        let porcentajeHarina = porcentajePanadero(harinaTotal, harinaTotal);
                        let porcentajeAgua = porcentajePanadero(aguaTotal, harinaTotal);
                        let porcentajeLevadura = porcentajePanadero(levaduraTotal, harinaTotal);
                        let porcentajeSal = porcentajePanadero(salTotal, harinaTotal);
                        let porcentajeGrasa = porcentajePanadero(grasaTotal, harinaTotal);
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

            function cuentaRecetas() {
                let contadorStorage = localStorage.length;
                contadorRecetas.innerHTML = "";
                contadorRecetas.insertAdjacentHTML('afterbegin', contadorStorage);
            };

            /* function anotarReceta() {
                let idContenido = idItemLibreta;
                let contenido = recetaData;
                localStorage.setItem(idContenido, contenido);
                cuentaRecetas();
            } */

            function Nota(idNota, dataNota, fechaNota) {
                this.idNota = idNota;
                this.fechaNota = fechaNota;
                this.dataNota = dataNota;
            }

            let notas = [];

            function anotarReceta() {
                let idContenido = idItemLibreta;
                let contenido = recetaData;
                let fecha = new Date();
                let notaEscribir = new Nota(idContenido, contenido, fecha);
                localStorage.setItem(idContenido, JSON.stringify(notaEscribir));
                cuentaRecetas();
                Toastify({
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    text: "Receta guardada correctamente.",
                    duration: 3000

                }).showToast();

            }

            cuentaRecetas();

            borrarRecetas.addEventListener('click', () => {

                Swal.fire({
                    title: 'Vaciar Libreta',
                    text: '¿Realmente desea eliminar todas las recetas guardadas?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sí, borrarlas.',
                    cancelButtonText: 'No, dejarlas ahí.'

                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.clear();
                        cuentaRecetas();
                        Toastify({
                            gravity: "bottom", // `top` or `bottom`
                            position: "right", // `left`, `center` or `right`
                            text: "Recetas eliminadas correctamente.",
                            duration: 2000
                        }).showToast();
                    }
                })

            })

            /* function borraReceta() {
                localStorage.clear();
                cuentaRecetas();
                Toastify({
                    gravity: "bottom", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    text: "Receta eliminada correctamente de la libreta.",
                    duration: 2000
                }).showToast();
            }; */

            function abreCierraLibreta() {
                let botonAbreCierra = document.querySelector("#toggleReceta");
                libreta.classList.toggle("muestra");
                botonAbreCierra.classList.toggle("rotate");


            };

            // Se agrega el listener al boton y se ejecuta funcion al hacer click.

            btnCalcularReceta.addEventListener("click", calculaReceta);
            btnDescargarReceta.addEventListener("click", descargaReceta);
            btnCoffee.addEventListener("click", modalCoffee);
            abreLibreta.addEventListener("click", abreCierraLibreta);
            anotarLibreta.addEventListener("click", anotarReceta);
            /* borrarRecetas.addEventListener("click", borraReceta); */