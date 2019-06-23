const admin = require('firebase-admin');

module.exports = {
    active: function() {
        var serviceAccount = require('./rpgapi-6b430-d87cd299f342.json');
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });
        return admin.firestore();
    },

    getId: async function(db, nomeTabela) {
        try {
            var doc = await db.collection('contagem').doc(nomeTabela).get();
            return doc.get('id');
        } catch (err) {
            console.log('Erro pego no catch: ', err);
            return undefined;
        }
    },
    
    updateId: async function(db, nomeTabela, novoId) {
        try {
            await db.collection('contagem').doc(nomeTabela).update({id: novoId});
            return true;
        } catch (err) {
            console.log('Erro pego no catch: ', err);
            return false;
        }
    }
};