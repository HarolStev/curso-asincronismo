/*
Por medio de Fetch se puede realizar peticiones HTTP asíncronas de JavaScript (JS) con promesas. La API Fetch proporciona una interfaz JS más cómoda para acceder y manipular; fetch() es un método global.
.
🛠️ Para poder usar fetch, primero tenemos que instalarlo:
.

Ir a la terminal e instalar fetch con: npm i node-fetch
Para poder compilar desde VSC, debemos registrar el modulo en package.json, abrimos el archivo y al final se agrega:

"type": "module"

Importante agregar una coma (,) a la llave que cierra a “dependencies”.
En la ruta src/promise crear el archivo challenge.js
En el archivo challenge.js inicialmente se debe importar lo que acabamos de instalar, agregando el código: import fetch from 'node-fetch';
Dado que la API es una constante, nunca va a cambiar, por convección se coloca en letras mayúsculas: const API = 'https://api.escuelajs.co/api/v1';
Ahora se crea la lógica con fetch, then y catch:

*/
import fetch from "node-fetch";
const API = 'https://api.escuelajs.co/api/v1'; // función que va a recibir como argumento la url que queremos llamar y esto retornará el llamado de fecth: una promesa

 function fetchData(urlApi) {
    return fetch(urlApi);
};
/*//El llamado
fetchData(`${API}/products`)
    .then(response => response.json())
    .then(products => {
            console.log(products);
    })
    .then(() => {
        console.log('Hola'); // Se puede anidar múltiples .then
    })
    .catch(error => console.log(error)); */

fetchData(`${API}/products`)
    .then(response => response.json()) //se hace la conversión a un objeto json
    .then(products => {
        console.log(products);
        return fetchData(`${API}/products/${products[0].id}`) // solo se quiere mostrar el primer elemento de la primera solicitud
    })
    .then(response => response.json())
    .then(product => {
        console.log(product);
        return fetchData(`${API}/categories/${product?.category?.id}`) //se quiere mostrar la categoria de un producto en particular
    })
    .then(response => response.json()) //se vuelve traer la data
    .then(category => {
        console.log(category.name); //se quiere mostrar la categoria de un producto en particular
    })
    .catch(err => console.log('error'))
    .finally(() => console.log('Finally'));//es opcional para mostrar que se terminó la solicitud