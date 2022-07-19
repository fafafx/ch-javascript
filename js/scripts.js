// Confirma si se quiere iniciar el cálculo.

if (confirm("¿Deseas iniciar el cálculo?") == true) {
    console.log("Cálculo iniciado.");

    //funcion que crea el objeto

    function Pan(nombre, harina, agua, levadura, sal, grasa, conMasaMadre) {
        this.nombre = nombre;
        this.harina = harina;
        this.agua = agua;
        this.levadura = levadura;
        this.sal = sal;
        this.grasa = grasa;
        this.conMasaMadre = conMasaMadre;
    }


    //se crea el objeto
    const pan1 = new Pan("Ciabatta", 73, 42, 1, 2, 10, true);
    const pan2 = new Pan("Hallulla", 50, 30, 1, 2, 20, false);
    const pan3 = new Pan("Marraqueta", 50, 30, 1, 2, 20, false);
    const pan4 = new Pan("Bocado de Dama", 50, 30, 1, 2, 20, false);
    const pan5 = new Pan("Baguette", 50, 30, 1, 2, 20, true);
    const pan6 = new Pan("Brioche", 50, 30, 1, 2, 20, false);
    const pan7 = new Pan("Bollo", 50, 30, 1, 2, 20, true);
    const pan8 = new Pan("Hogaza", 50, 30, 1, 2, 20, true);
    const pan9 = new Pan("Frica", 50, 30, 1, 2, 20, false);
    const pan10 = new Pan("Amasado", 50, 30, 1, 2, 20, false);
    //se crea un array vacio ene spera de llenarlo.
    const filtro = [];
    //crea una array con los objetos pan.
    const recetas = [pan1, pan2, pan3, pan4, pan5, pan6, pan7, pan8, pan9, pan10];

    //filtra el array seleccionando los objetos que su propiedad conMasaMadre sea true.

    const tieneMasaMadre = recetas.filter((m) => m.conMasaMadre === true);
    tieneMasaMadre.forEach(function (item) {
        //Agrega los resultados al array filtro
        filtro.push(item.nombre);
    });
    // almacena el array filtro a una variable, pero lo convierte a un string.
    let filtrado = filtro.toString();


    // Solicita ingreso de cantidad de panes que se requiere.
    let cantidadPanes = parseInt(prompt("¿Cuantas unidades deseas preparar?\n (minimo 5 unidades) "));
    let totalHarina = pan1.harina * cantidadPanes;


    // Funcion porcentajePanadero calcula que porcentaje es cada ingrediente del total de la mezcla, considerando que la Harina SIEMPRE sera el 100%.

    function porcentajePanadero() {
        porcentajeHarina = Math.ceil(((pan1.harina * cantidadPanes) / totalHarina) * 100);
        porcentajeAgua = Math.ceil(((pan1.agua * cantidadPanes) / totalHarina) * 100);
        porcentajeSal = Math.ceil(((pan1.sal * cantidadPanes) / totalHarina) * 100);
        porcentajeLevadura = Math.ceil(((pan1.levadura * cantidadPanes) / totalHarina) * 100);
        porcentajeGrasa = Math.ceil(((pan1.grasa * cantidadPanes) / totalHarina) * 100);
    }

    porcentajePanadero();


    // Verifica si la cantidad ingresada es mayor al minimo.

    do {
        if (cantidadPanes < 5) {
            console.log("Ingresó menos de 5 unidades. Repita.")
            cantidadPanes = parseInt(prompt("¿Cuantas unidades deseas preparar?\n (minimo 5 unidades) "));
        } else {
            console.log("Cantidad ingresada OK.")

        }

    } while (cantidadPanes < 5);
    // Comienza la elección del tipo de pan, para mostrar las cantidades.
    console.log("Preparando " + cantidadPanes + " panes.");
    console.log("Selecciona el tipo de pan");
    let seleccionPan = prompt("Selecciona tu receta:\n1.- Ciabatta\n2.- Hallulla\nPresiona C para cancelar.");
    console.log("La opción seleccionada es " + seleccionPan);

    while (seleccionPan != "C" || seleccionPan != "c") {
        console.log("Switch de selección");
        switch (seleccionPan) {
            case "1":
                console.log("Ciabatta");
                alert("Para preparar " + cantidadPanes + " " + pan1.nombre + " necesitas:\n" + pan1.harina * cantidadPanes + " grs. (Porcentaje panadero: " + porcentajeHarina + "%.)\n" + pan1.levadura * cantidadPanes + " grs. de levadura. (Porcentaje panadero: " + porcentajeLevadura + "%.)\n" + pan1.agua * cantidadPanes + " grs. de agua. (Porcentaje panadero: " + porcentajeAgua + "%.)\n" + pan1.sal * cantidadPanes + " grs. (Porcentaje panadero: " + porcentajeSal + "%.)\n" + pan1.grasa * cantidadPanes + " grs. (Porcentaje panadero: " + porcentajeGrasa + "%.)\n");
                break;
            case "2":
                console.log("Hallulla");
                totalHarina = pan2.harina * cantidadPanes;
                alert("Para preparar " + cantidadPanes + " " + pan1.nombre + " necesitas:\n" + pan1.harina * cantidadPanes + " grs. (Porcentaje panadero: " + porcentajeHarina + "%.)\n" + pan1.levadura * cantidadPanes + " grs. de levadura. (Porcentaje panadero: " + porcentajeLevadura + "%.)\n" + pan1.agua * cantidadPanes + " grs. de agua. (Porcentaje panadero: " + porcentajeAgua + "%.)\n" + pan1.sal * cantidadPanes + " grs. (Porcentaje panadero: " + porcentajeSal + "%.)\n" + pan1.grasa * cantidadPanes + " grs. (Porcentaje panadero: " + porcentajeGrasa + "%.)\n");
                break;
            default:
                alert("La opción elegida no existe.");
                break;
        }
        console.log("Terminado.");
        alert("Esta calculadora tiene disponible " + recetas.length + " recetas de pan, de las cuales las siguientes utilizan prefermentos o masa madre en vez de levadura: " + filtrado + ".");
        alert("Gracias por usar la calculadora de masas.")

        break;

    }
} else {
    console.log("Has cancelado la operación.");
}