
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');


const imgInput = document.getElementById('imgInput');
imgInput.addEventListener('change', function(evento){
    const archivo = imgInput.files[0];

    if (archivo) {
        const reader = new FileReader();

        // Cuando el archivo ha sido leído exitosamente
        reader.onload = function(e) {
            const imagen = new Image();
            imagen.src = e.target.result;

            imagen.addEventListener('load', function() {
                const imgWidth = imagen.width;
                const imgHeigth = imagen.height;
            
                redimensionarCanvas(imagen ,imgWidth, imgHeigth);

            });
        };

        // Leer el archivo como una URL de datos (data URL). Asincrono
        reader.readAsDataURL(archivo);
    }
});

// Evento de click en el canvas
canvas.addEventListener('click', function(evento){
    const posX = evento.offsetX;
    const posY = evento.offsetY;

    console.log(posX, posY);


    colorImg = obtenerColor(posX, posY);

    console.log(colorImg);

    cambiarColorSeleccionado(colorImg);


})

// Evento del movimiento del mouse en el canvas
canvas.addEventListener('mousemove', function(evento){
    const posX = evento.offsetX;
    const posY = evento.offsetY;

    console.log(posX,posY);

    colorImg = obtenerColor(posX, posY);

    console.log(colorImg);

    cambiarColorHover(colorImg);

})


// Cambia el tamaño del canvas para ajustarlo a la imagen
function redimensionarCanvas(imagen, imgWidth, imgHeigth){
    canvas.width = imgWidth;
    canvas.height = imgHeigth;
    ctx.drawImage(imagen, 0, 0);
}


// Obtiene el color de las coordenadas clickeads
function obtenerColor(posX, posY){
    const pixel = ctx.getImageData(posX, posY, 1, 1);
    const data = pixel.data;
    const color = {
        r: data[0],
        g: data[1],
        b: data[2],
        a: data[3] / 255
    };

    return color;
}


// Cambia el color de fondo del hovered color
function cambiarColorHover(imgColor){
    const divColorHover = document.getElementById('hovered');

    const rojo = imgColor['r'];
    const verde = imgColor['g'];
    const azul = imgColor['b'];
    const transparencia = imgColor['a'];

    console.log(rojo,verde,azul,transparencia)

    divColorHover.style.background = `rgba(${rojo}, ${verde}, ${azul}, ${transparencia})`;
}


// Cambia el color de fondo del color seleccionado
function cambiarColorSeleccionado(imgColor){

    const divColorSeleccionado = document.getElementById('seleccionado');
    const r = document.getElementById('r');
    const g = document.getElementById('g');
    const b = document.getElementById('b');
    const a = document.getElementById('a');

    const rojo = imgColor['r'];
    const verde = imgColor['g'];
    const azul = imgColor['b'];
    const transparencia = imgColor['a'];

    console.log(rojo,verde,azul,transparencia)

    divColorSeleccionado.style.background = `rgba(${rojo}, ${verde}, ${azul}, ${transparencia})`;
    r.innerText = `R: ${rojo}`;
    g.innerText = `G: ${verde}`;
    b.innerText = `B: ${azul}`;
    a.innerText = `A: ${transparencia}`;

}

