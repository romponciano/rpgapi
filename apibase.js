module.exports = {
    getById,
    getAll,
    updateById,
    criptografar
}

async function getById(db, res, id, tabela) {
	try {
		var saida = await db.collection(tabela).doc(id.toString()).get();
		if (saida) {
			return res.status(200).send({
				success: 'true',
                object: saida.data()
			});
		} else {
			return res.status(204).send({
				success: 'true',
                object: saida.data()
			})
		}
	} catch (err) {
		console.log('Error: ', err);
        return res.status(500).send({
            success: 'false',
            object: null
        });
	}
};

async function getAll(db, res, tabela) {
    var todos = [];
    try {
        var snapshot = await db.collection(tabela).get();
        snapshot.docs.forEach(doc => {
            todos.push(doc.data());
        });
        if (todos.lenght > 0) {
            return res.status(200).send({
                success: 'true',
                object: todos
            });
        } else {
            return res.status(204).send({
                sucess: 'true',
                object: todos
            });
        }
    } catch (err) {
        console.log('Erro: ', err);
        return res.status(500).send({
            success: 'false',
            object: null
        });
    };
};

async function updateById(db, res, tabela, id, obj) {
    try {
        var novo = await db.collection(tabela).doc(id.toString()).update(obj);
        if (novo) {
            return res.status(200).send({
                success: 'true',
                id: id
            });
        } else {
            throw 500;
        }
    } catch (err) {
        console.log('Error: ', err);
        return res.status(500).send({
            sucess: 'false',
            id: -1
        });
    };
};

function criptografar(msg) {
    var cript = require('crypto-js/sha256');
    return cript(msg);
}