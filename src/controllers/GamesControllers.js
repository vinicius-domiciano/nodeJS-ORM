const Games = require('../models/Games')

module.exports = {
    async listAll( req, res ) {
        const games = await Games.findAll();

        res.json(games)
    },

    async new (req, res) {
        const { nome, descricao } = req.body;

        const game = await Games.create({ nome, descricao })

        return res.json(game);
    }
}