function sum (num1, num2) {
    return num1 + num2;
}

function calc (num1, num2, callback) {
    return callback(num1, num2);
}

console.log(calc (2, 2, sum));


/*ejemplo de https://developer.mozilla.org/es/docs/Glossary/Callback_function

Una función de callback es una función que se pasa a otra función como un argumento, que luego se invoca dentro de la función externa para completar algún tipo de rutina o acción.

Ejemplo:
*/
function saludar(nombre) {
    alert('Hola ' + nombre);
}    
function procesarEntradaUsuario(callback) {
    var nombre = prompt('Por favor ingresa tu nombre.');
    callback(nombre);
}
procesarEntradaUsuario(saludar);



// setTimeOut
    setTimeout (function() {
        console.log('Hola JavaScript');
    },5000);


function gretting (name) {
    console.log(`Hola ${name}`);
}
setTimeout(gretting, 3000, 'Harol');

/* reto platzi
Tienes la función execCallback que recibirá un callback es decir una función como parámetro, tu reto es ejecutar esa función con un tiempo de demora de 2 segundos.

Para hacer que la función se demore 2 segundos debes usar la función setTimeout, pero para ejecutarla debes llamarla mediante el namescpace window para poder monitorear su uso en la ejecución de pruebas, ejemplo:

window.setTimeout(() => {
  // code
})

Dentro del cuerpo de la función execCallback debes escribir tu solución.

Ejemplo:

Input:
const myFunc = () => console.log('Log after 2s')
execCallback(myFunc);

Output:
// Execute myFunc 2s after
*/
export function execCallback(callback) {
    window.setTimeout(() => {
        callback();
    }, 2000);
} 
