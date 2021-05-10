// 1. Listar los archivos Markdown disponibles
function listar(){
    const url = "http://localhost:3000/listar";
    console.log(url);
  
    fetch(url)
    .then((response) => response.json())
    .then((files) => {
      document.querySelector("#lista").innerHTML = files;
    });
}
// 2. Ver el contenido Markdown traducido a HTML
// 3. Crear nuevos archivos MarkDown y almacenarlos en el servidor
