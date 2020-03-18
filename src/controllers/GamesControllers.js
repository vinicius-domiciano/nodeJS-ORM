const Games = require('../models/Games')
const Console = require('../models/Consoles')
const { Op } = require('sequelize')

module.exports = {
    async listAll( req, res ) {
        const games = await Games.findAll({
            include: [
                {
                    association: 'desenvolvedor',
                    attributes: [ 
                        ['id', 'id_desenvolvedor'],
                        'nome'
                    ],
                },
                {
                    association: 'consoles',
                    attributes: [
                        ['id', 'id_console'],
                        'nome'
                    ],
                    through: {
                        attributes: []
                    },
                }
            ],
            attributes: ['id', 'nome', 'descricao'],
        });

        if(!games){
            res.status(400).json({'error': 'Games Not Found'})
        }

        res.json(games)
    },

    async newStorage (req, res) {
        const { nome, descricao, id_desenvolvedor, consoles } = req.body;

        console.log(consoles)

        const game = await Games.create({ 
            nome,
            descricao, 
            id_desenvolvedor,
        })

        const plataforma = await Console.findAll({
            where: {
                [Op.or]: consoles
            }
        })

        console.log(plataforma)

        await game.addConsoles(plataforma)

        return res.json(game);
    },

    async searchId(req, res) {
        const { id } = req.params;

        const game = await Games.findByPk(id, {
            attributes: ['id', 'nome', 'descricao'],
            include: [
                {
                    association: 'desenvolvedor',
                    attributes: [ 
                        ['id', 'id_desenvolvedor'],
                        'nome'
                    ],
                },
                {
                    association: 'consoles',
                    attributes: [
                        ['id', 'id_console'],
                        'nome'
                    ],
                    through: {
                        attributes: []
                    },
                },
            ],
        })

        if(!game)
            res.status(400).json({'error': 'Game Not Found'})

        return res.json(game)
    },

    async deleteStorage(req, res) {
        const { id } = req.params;

        const deletedGame = await Games.destroy({
            where: {
                id,
            },
        })

        if(!deletedGame){
            return res.json({"error": "Games Not Found"})
        }

        return res.status(200).json()

    },

    async dataUpdate(req, res) {
        const { id } = req.params;

        let game = req.body;
        console.log(game)

        const updatedGame = await Games.update(game, {
            where: {
                id
            }
        })

        if(!updatedGame)
            return res.json({"error": "Game Not Found"})

        game = {id, ...game}

        return res.status(200).json(game)
    },

    async consoleUpdate(req, res) {
        const { id } = req.params;

        let { consoles } = req.body;

        let game = await Games.findByPk(id);

        if(!game)
            return res.json({"error": "Game Not Found"})

        let platform = await Console.findAll({
            where: {
                [Op.or]: consoles
            }
        })

        game.setConsoles(platform)

        game = game.get()

        res.json({'msg': 'success'})
    }

}