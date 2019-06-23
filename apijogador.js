module.exports = {
	init
}

var base = require('./apibase');
var models = require("@rpf37/rpgmodels");

function init(app, server, db) {
    const tabela = 'jogador';

	// POST
	app.post('/jogador', async (req, res) => {
		try {
            var id = await server.getId(db, tabela);
            var hashSenha = base.criptografar(req.body.senha);
            var jogador = new models.Jogador(id, req.body.nome, req.body.login, hashSenha);
			var jogRef = db.collection(tabela).doc(id.toString());
			var conRef = db.collection('contagem').doc(tabela);

			let transaction = await db.runTransaction(trans => {
				return trans.get(jogRef).then(doc => {
					trans.set(jogRef, JSON.parse(JSON.stringify(jogador)));
					trans.update(conRef, { id: id + 1 });
					return true;
				});
			}).then(out => {
				if (out) {
					return res.status(201).send({
						success: 'true',
						id: id
					});
				};
				throw 501;
			});
		} catch (err) {
			console.log('Error: ', err);
			return res.status(501).send({
				success: 'false',
				id: -1
			});
		};
	});

	// GET
    app.get("/jogador", async (req, res) => {
        return base.getAll(db, res, tabela);
	})

	// GET ID
	app.get('/jogador/:id', async (req, res) => {
        const id = parseInt(req.params.id, 10);
        return base.getById(db, res, id, tabela);
	});

	// UPDATE
	app.put('/jogador/:id', async (req, res) => {
		const id = parseInt(req.params.id, 10);
        var jogador = new models.Jogador(id, req.body.nome);
        return base.updateById(db, res, tabela, jogador);
	});
	
	return app;
}