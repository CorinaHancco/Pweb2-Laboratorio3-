const fs = require("fs");
const path = require("path");
const express = require("express");
const bp = require("body-parser");
const MarkdownIt = require("markdown-it"),
  md = new MarkdownIt();
const app = express();

app.use(express.static("pub"));
app.use(bp.json());
app.use(
  bp.urlencoded({
    extended: true,
  })
);

app.listen(3000, () => {
  console.log("Escuchando en: http://localhost:3000");
});

app.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname, "index.html"));
});


// Write file
app.post("/write", (request, response) => {

  let title = request.body.title + ".md";
  let text = request.body.text;
  let ruta = __dirname + "/priv/" + title;

  fs.writeFile(ruta, text, function (err) {
    if (err) {
      console.log(err);
      response.status(500).end();
    }
    console.log("funciona");
    response.status(200).end();
  });
});

app.get("/archivos", (request, response) => {
  fs.readdir(path.resolve(__dirname, "priv/"), (err, archivos) => {
    if (err) {
      onError(err);
      return;
    }
    console.log(archivos);
    response.json(archivos);
  });
});

app.get('/leer', (request, response) => {

	fs.readFile(path.resolve(__dirname, 'priv/e.md'), 'utf8',
		(err, data) => {
			if (err) {
				console.error(err)
				response.status(500).json({
					error: 'message'
				})
				return
			}
			response.json({
				text: data.replace(/\n/g, '<br>')
			})
		})

	})
