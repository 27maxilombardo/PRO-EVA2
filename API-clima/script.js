//obtener las referencias del DOM/HTML

const ciudadInput = document.getElementById("ciudad");

const obtenerPronosticoBtn = document.getElementById("obtenerPronostico");

const pronosticoDiv = document.getElementById("pronostico");

// funcion de obtener el pronostico

obtenerPronosticoBtn.addEventListener("click", obtenerPronostico);

function obtenerPronostico(){


   const ciudad = ciudadInput.value.trim();//trim para eliminar los espacios
    
   if (ciudad===""){
    mostrarError("Por favor ingresa una ciudad.");
    return;
   }

   // PEGA TU LLAVE API ACA ABAJO
   const apiKey = "a00318aa6f32729329688106da5af79c"; 
   
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`; // tipo de comillas invertidas permite mostrar una variable entre medio de un texto

   // Realizar una solicitud http utilizando la funcion FETCH a la url que esta arriba.

   fetch(url)
    .then(response => response.json())
    .then(data => {

        mostrarPronostico(data);
    })

    .catch(error=>{
    mostrarError("Error al obtener el pronostico.");
    
});
// MOSTRAR LOS DATOS EN EL HTML
function mostrarPronostico(data){

    const {name,main,weather}=data;
    const temperatura = main.temp;
    const sensacion = main.feels_like;
    const humedad = main.humidity;
    const descripcion = weather[0].description;

    const pronosticoHTML = `
        <div class="card>
            <div class="card-body">
                <h2 class="card-title">${name}</h2>
                <p class="card-text">Temperatura: ${temperatura}</p>
                <p class="card-text">Sensación: : ${sensacion}</p>
                <p class="card-text">Humedad:  ${humedad}</p>
                <p class="card-text">Descripcion: ${descripcion}</p>
            </div>
        </div>
    `;

    pronosticoDiv.innerHTML = pronosticoHTML;


}
    function mostrarError(mensaje){
        const errorHTML = `
            <div class="alert alert-danger" role="alert">
                ${mensaje}
            </div>
        `;

        pronosticoDiv.innerHTML = errorHTML;

    }



}