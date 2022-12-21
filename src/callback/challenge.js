/*
📥 𝗖𝗹𝗮𝘀𝗲 #𝟳: 𝗫𝗠𝗟𝗛𝗧𝗧𝗣𝗥𝗲𝗾𝘂𝗲𝘀𝘁𝟳/𝟮𝟭 📤
.
📲 XMLHttpRequest es un objeto de JS que permite hacer peticiones hacia servicios en la nube(URLs o APIs).

Para poder trabajarlo de la manera correcta, se debe instalar en la consola, de la siguiente manera:

npm i xmlhttprequest
.
📪 Existen 5 estados en un llamado XMLHttpRequest:
.

    º   0 → Se ha inicializado.
    º   1 → Loading (cargando).
    º   2 → Se ha cargado.
    º   3 → Procesamiento si existe alguna descarga.
    º   4 → Completado.
.
📫 Métodos y propiedades:
.
xmlhttp.open() → Prepara la petición para ser enviada tomando tres parámetros: prótocolo, url, asíncrono (true).
xmlhttp.readyState → Retorna el estado de la petición.
xmlhttp.onreadystatechange → Un eventHandler que es llamado cuando la propiedad readyState cambia.
xmlhttp.status → Retorna el estado de la respuesta de la petición. (200,400,500)
xmlhttp.send() → Envía la petición.
.
📬 Características del protocolo http:
.
Verbos: Los verbos indican acciones que están asociadas a peticiones y recursos, es decir, sirven para la manipulación de recursos cliente/servidor. Los Verbos http son:

    º   GET → Solicita un recurso.
    º   HEAD → Solicita un recurso pero sin retornar información, la estructura de esta petición es igual que get tanto en su headers como estatus. Es útil cuando vamos a utilizar API, para comprobar si lo que vamos a enviar esta correcto y puede ser procesado.
    º   POST → Sirve para la creación de recursos en el servidor.
    º   PUT → Actualiza por completo un recurso, reemplaza todas las representaciones actuales del recurso de destino con la carga útil de la petición.
    º   PATCH → Actualiza parcialmente un recurso.
    º   DELETE → Elimina un recurso.
.
📭 Los códigos de estados del servidor:
.
El código de estado (status codes) sirve para describir el estado de la petición hecha al servidor.

    º   1xx → Indican que la petición fue recibida por el servidor, pero está siendo procesada por el servidor.
    º   2xx → Indican que la petición fue recibida, aceptada y procesada correctamente.
    º   3xx → Indican que hay que tomar acciones adicionales para completar la solicitud.
    º   4xx → Indican errores del lado del cliente que hizo mal una solicitud.
    º   5xx → Indican errores del servidor. Suelen aparecer cuando existe un fallo en la ejecución en el servidor.
.
📧 Los códigos más comunes a la hora de interactuar con una API son:
.

    º   200 → OK → Indica que todo está correcto.
    º   201 → Created → Todo está correcto cuando se hizo una solicitud POST, el recurso se creó y se guardó correctamente.
    º   204 → No Content → Indica que la solicitud se completó correctamente pero no devolvió información. Este es común cuando se hacen peticiones con el verbo DELETE.
    º   400 → Bad Request → Indica que algo está mal en la petición (no encontró algo).
    º   401 → Unauthorized → Significa que antes de hacer una solicitud al servidor nos debemos autenticar.
    º   403 → Forbidden → Indica que no tenemos acceso a ese recurso aunque se esté autenticado.
    º   404 → Not Found → Indica que no existe el recurso que se está intentando acceder.
    º   500 → Internal Server Error → Indica que algo falló, es un error que retorna el servidor cuando la solicitud no pudo ser procesada.
.
Fuente: aquí
.
🖍️ Ejemplo en VSC:
.

1. Ir a la consola y ubicarnos en la carpeta del proyecto y escribir el comando para instalar el paquete XMLHttpRequest:
npm i xmlhttprequest
2. Ir al VSC y crear un archivo llamado challenge.js en la ruta src/callback. El archivo queda:
*/
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; //llamado al XmlHttpRequest
const API = 'https://api.escuelajs.co/api/v1'; //API en mayúscula porque es una referencia que no va a cambiar

function fetchData(urlApi, callback){ //urlApi: no confundir y colocar API -- Callback es la información que nos va a retornar los elementos, ya sean la data que estamos recibiendo o el error que se pueda generar la llamada.
	let xhttp = new XMLHttpRequest(); //referencia a new XMLHttpRequest

	xhttp.open('GET', urlApi, true); //Open abre la conexión a nuestra API -- GET el tipo de dato que vamos a obtener, en este caso del fake de platzi-- url que va a utilizar  //petición "obtener" con true para habilitarlo
	xhttp.onreadystatechange = function(event) { //escucha diferentes estados de la solicitud y conocer cuando está disponible la información
	if(xhttp.readyState === 4) { //si el estado ha sido completada la llamada
		if(xhttp.status === 200 ){ //el servido responde de forma correcta
			callback(null, JSON.parse(xhttp.responseText));//El primer elemento que le pasamos es nulo, y el segundo elemento una transformación de la información, parsing de datos  //dentro de xhttp.responseTex recibimos lo que entrega el servidor en texto y se hace la transformación en JSON, como estamos recibiendo un texto y queremos un objeto, tenemos que hacer esta transformación.
	    	}else {// logica para la información cuando tengamos un error.
            const error = new Error('Error' + urlApi);
            return callback(error,null); //es null porque no se está regresando ningún dato
	        }
	    }
	}
	xhttp.send();//Se ejecuta.
}

fetchData(`${API}/products`, function(error1, data1){
    if (error1) return console.error(error1); //si hay error, devuelve el error
    fetchData(`${API}/products/${data1[0].id}`, function(error2, data2){
        if (error2) return console.error(error2);//valida el error 2
        //se usa Optional chaining '?.' que es una forma segura de acceder a las propiedades de los objetos anidados, incluso si no existe una propiedad intermedia:
        fetchData(`${API}/categories/${data2?.category?.id}`, function(error3, data3){
            if (error3) return console.error(error3); //evitar el callback hell
            console.log(data1[0]);
            console.log(data2.title);
            console.log(data3.name);
            //CallBacks Hell: Consiste en múltiples Callbacks anidados que provocan que el código se vuelva difícil de leer y ‘debuggear’ y por eso se debe evitar.
        });
    });
});

/*Para ejecutar mediante un script, se edita el archivo package.json y en la parte de “scripts” se sustituye la línea:

    “scripts”: {
        "test": "echo \"Error: no test specified\" && exit 1" 
    }

por 

    “scripts”: {
        "callback": "node src/callback/challenge.js"
    }
*/