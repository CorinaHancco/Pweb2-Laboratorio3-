const { json, response } = require("express");

function listar() {
  const url = "http://localhost:3000/archivos";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderList(data);
    });
}

function renderList(data) {
  let html = "<h3>Archivos</h3><hr>\n";
  html += "<ul>\n";
  const contenedor = document.querySelector("#boxContent-second");

  for (var i = 0; i < data.length; i++){
    html += "<li class='file' onclick='leer(this)'>" + data[i] + "</li>\n";
  } 
  
  html += "</ul>\n";
  contenedor.innerHTML = html;
}

function leer(file) {
  const url = "http://localhost:3000/leer";
  console.log(file.innerHTML);
  
  const data = {
    title: file.innerHTML,
  }

  const request = {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  };
  
  http = fetch(url, request)
  http.then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector("#boxContent-first").innerHTML = data.text;
    });

}


function sendFile(markupTitle, markupText){

	const url = "http://localhost:3000/write"

	const data = {
		title: markupTitle,
		text: markupText
	};

	const request = {
    method: "post", // podría ser get
    headers: {
      	"content-type": "application/json",
  	},
    	body: JSON.stringify(data),
  	};

  fetch(url, request);

	console.log(data);
}

function mostrarFormArchivo(){

  const contenedor = document.querySelector("#boxContent-first");
  contenedor.innerHTML = ""; // Borra el contenido de contenedor
  const form = document.createElement("form"); // Crea un tag form
  form.setAttribute("class", "formArchivo");
  
  form.innerHTML = "<h2>Crear Archivo MD</h2>\n"+
                   "<input id='markupTitle' type='text' placeholder='Titulo'>"+
                   "<textarea id='markupText' rows='4' cols='50'></textarea>"+
                   "<input type='submit' value='Enviar'>";
  
  contenedor.append(form); // agregar form a contenedor
  submitForm(form);

}

function submitForm(form){
  const text = document.querySelector("#markupText");
	const title = document.querySelector("#markupTitle");
  form.onsubmit = () =>{
    sendFile(title.value, text.value);
    return false;
  };
}

function mostrarInicio(){
  const contenedor = document.querySelector("#boxContent-first");
  
  let txt = "<h1>Lab 03</h1><hr>\n"+
            "<p>En grupos de 3 a 5 personas (los grupos se definirán en clase)<br>"+
            "implemente una aplicación web que navegue sobre archivos Markdown y permita:<br>"+
            "<ul><li>Listar los archivos Markdown disponibles</li>"+
            "<li>Ver el contenido de un archivo Markdown traducido a HTML</li>"+
            "<li>Crear nuevos archivos MarkDown y almacenarlos en el servidor</li></ul>";
  
  contenedor.innerHTML = txt;
}

addEventListener("DOMContentLoaded", function(){
  mostrarInicio();
  listar();
})