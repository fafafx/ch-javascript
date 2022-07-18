// Confirma si se quiere iniciar el cálculo.

if (confirm("¿Deseas iniciar el cálculo?") == true) {
    console.log("Cálculo iniciado.");


    // Solicita ingreso de cantidad de panes que se requiere.
    let cantidadPanes = parseInt(prompt("¿Cuantas unidades deseas preparar?\n (minimo 5 unidades) "));
    let harina = 50;
    let agua = 30;
    let sal = 2;
    let levadura = 1;
    let mGrasa = 10;
    let hOnzas = 0;
    let aOnzas = 0;
    let sOnzas = 0;
    let lOnzas = 0;
    let gOnzas = 0;
    let totalHarina = harina * cantidadPanes;
    // Funcion porcentajePanadero calcula que porcentaje es cada ingrediente del total de la mezcla, considerando que la Harina SIEMPRE sera el 100%.

    function porcentajePanadero() {
        porcentajeHarina = ((harina * cantidadPanes) / totalHarina) * 100;
        porcentajeAgua = ((agua * cantidadPanes) / totalHarina) * 100;
        porcentajeSal = ((sal * cantidadPanes) / totalHarina) * 100;
        porcentajeLevadura = ((levadura * cantidadPanes) / totalHarina) * 100;
        porcentajeGrasa = ((mGrasa * cantidadPanes) / totalHarina) * 100;
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
    let seleccionPan = prompt("Selecciona tu receta:\n1.- Marraqueta\n2.- Hallulla\nPresiona C para cancelar.");
    console.log("La opción seleccionada es " + seleccionPan);

    while (seleccionPan != "C" || seleccionPan != "c") {
        console.log("Switch de selección");
        switch (seleccionPan) {
            case "1":
                console.log("Marraqueta");
                alert("Para preparar " + cantidadPanes + " marraquetas, necesitas:\n" + harina * cantidadPanes + " grs. (Porcentaje panadero: " + porcentajeHarina + "%.)\n" + levadura * cantidadPanes + " grs. de levadura. (Porcentaje panadero: " + porcentajeLevadura + "%.)\n" + agua * cantidadPanes + " grs. de agua. (Porcentaje panadero: " + porcentajeAgua + "%.)\n" + sal * cantidadPanes + " grs. (Porcentaje panadero: " + porcentajeSal + "%.)\n" + mGrasa * cantidadPanes + " grs. (Porcentaje panadero: " + porcentajeGrasa + "%.)");
                break;
            case "2":
                console.log("Hallulla");
                alert("Para preparar " + cantidadPanes + " marraquetas, necesitas:\n" + harina * cantidadPanes + " grs. (Porcentaje panadero: " + porcentajeHarina + "%.)\n" + levadura * cantidadPanes + " grs. de levadura. (Porcentaje panadero: " + porcentajeLevadura + "%.)\n" + agua * cantidadPanes + " grs. de agua. (Porcentaje panadero: " + porcentajeAgua + "%.)\n" + sal * cantidadPanes + " grs. (Porcentaje panadero: " + porcentajeSal + "%.)\n" + mGrasa * cantidadPanes + " grs. (Porcentaje panadero: " + porcentajeGrasa + "%.)");
                break;
            default:
                alert("La opción elegida no existe.");
                break;
        }
        console.log("Terminado.")
        alert("Gracias por usar la calculadora de masas.")
        break;

    }
} else {
    console.log("Has cancelado la operación.");
}