
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
    html += "<li>" + data[i] + "</li>" + '<button onclick=leer()'+'>'+'Mostrar Contenido</button>\n';
  } 
  
  html += "</ul>\n";
  contenedor.innerHTML = html;
}

function leer() {
  const url = "http://localhost:3000/leer";
  
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector("#textoMark").innerHTML = data.text;
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