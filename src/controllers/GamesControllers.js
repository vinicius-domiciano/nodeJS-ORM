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

    async new (req, res) {
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

    async searchPk(req, res) {
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
    }
}