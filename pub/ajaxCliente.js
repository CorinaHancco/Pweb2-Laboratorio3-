function recitar(markupText) {
  const url = "http://localhost:3000/";
  const data = {
    text: markupText,
  };
  console.log(data);
  const request = {
    method: "post", // podría ser get
    headers: {
      "content-type": "application/json",
    },
    body: json.stringify(data),
  };
  http = fetch(url, request);
  http
    .then((response) => response.json())
    .then((data) => {
      document.queryselector("#htmlcode").innerhtml = data.text;
    });
}

function listar() {
  const url = "http://localhost:3000/archivos";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderList(data);
    });
}

function renderList(data) {
  var html = "<ul>\n";
  for (var i = 0; i < data.length; i++) html += "<li>" + data[i] + "</li>\n";
  html +=
    '<li><p  value="' +data[i] +'.txt">' +data[i] +" <button onclick='leer()'>Mostrar Contenido</button> </p> </li>\n";
  html += "</ul>\n";
  document.getElementById("listar").innerHTML = html;
}

function leer() {
  const url = "http://localhost:3000/leer";
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
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

  	http = fetch(url, request);
  	http.then((response) => response.json())
    .then((data) => {
		console.log("Works");
    });

	console.log(data);
}


document.addEventListener("DOMContentLoaded", function () {
	const text = document.querySelector("#markupText");
	const title = document.querySelector("#markupTitle");
  document.querySelector("#markupForm").onsubmit = () => {
    sendFile(title.value, text.value);
    return false;
  };
});
