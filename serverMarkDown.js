const path = require('path');
const express = require('express');
const app = express();
app.use(express.static('pub'));

app.listen(3000, () => {
	console.log("App Escuchando en: http://localhost:3000")
});

app.get('/', (request, response) => {
	response.sendFile(path.resolve(__dirname, 'index.html'));
});

app.get("/listar", (request, response) => {
	fs.readdir(path.resolve(__dirname, "pub/"),(err, files) => {
		if (err) {
		  console.error(err);
		  response.status(500).json({
			error: "message",
		  });
		  return;
		}
		console.log(files);
		response.json(files);
		//response.text(files);
		/*response.json({
		  text: data.replace(/,/g, "<br>"),
		});*/
		});
	});

