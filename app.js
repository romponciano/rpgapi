var express = require("express");

// configurando acesso ao banco
var server = require("./server");
const db = server.active();

// configurando básico de API
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.text({ defaultCharset: 'utf-8' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// configurando init da API
const PORT = 3000;
app.listen(PORT, () => {
	console.log('api executando na porta ', PORT);
});

// associando URLs de Jogador
var apijogador = require("./apijogador.js");
app = apijogador.init(app, server, db);

// associando URLs de Vantagens
