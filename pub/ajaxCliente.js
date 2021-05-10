
/*function recitar(markupText) {
	const url = 'http://localhost:3000/'
	const data = {
		text: markupText
	}
	console.log(data)
	const request = {
		method: 'POST', // Podría ser GET
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}
	http = fetch(url, request)
	http.then(
		response => response.json()
	).then(
		data => {
			document.querySelector("#htmlCode").innerHTML = data.text
		}
	)
}*/


function listar() {
	const url = 'http://localhost:3000/archivos';
	fetch(url)
    .then(response => response.json())
    .then(
		data => {
			renderList(data);
		}
	)
}

function renderList(data){
	var html = "<ul>\n";
	for(var i=0; i<data.length;i++)
	html += "<li>" + data[i] + "</li>\n";
	html += "</ul>\n";
	document.getElementById("listar").innerHTML = html;
}

/*document.addEventListener('DOMContentLoaded', function () {
	const text = document.querySelector('#markupText')
	document.querySelector('#markupForm').onsubmit = () => {
		recitar(text.value)
		return false;
	}
})*/

