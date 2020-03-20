const Games = require('../models/Games')
const Console = require('../models/Consoles')
const { Op } = require('sequelize')

const tablesAssociate = [
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
]

module.exports = {
    async listAll( req, res ) {
        const games = await Games.findAll({
            include: tablesAssociate,
            attributes: ['id', 'nome', 'descricao'],
        });

        if(!games){
            res.status(400).json({'error': 'Games Not Found'})
        }

        res.json(games)
    },

    async newStorage (req, res) {
        const { nome, descricao, id_desenvolvedor, consoles } = req.body;
        
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

        await game.addConsoles(plataforma)

        return res.json(game);
    },

    async searchId(req, res) {
        const { id } = req.params;

        const game = await Games.findByPk(id, {
            attributes: ['id', 'nome', 'descricao'],
            include: tablesAssociate,
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
            return res.json({"error": "Game Not Found"})
        }

        return res.status(200).json()

    },

    async dataUpdate(req, res) {
        const { id } = req.params;

        let game = req.body;
        // if(!await Games.findByPk(id))
        //     return res.json({"error":"Game Not Found"})

        const updatedGame = await Games.update(game, {
            where: {
                id
            }
        })

        if(!updatedGame[0])
            return res.json({"error": "Game Not Found"})

        game = await Games.findByPk(id, {
            attributes: ['id', 'nome', 'descricao'],
            include: tablesAssociate,
        })

        return res.status(200).json(game)
    },

    async platformGame(req, res) {
        const { id } = req.params
        let { consoles } = req.body

        let game = await Games.findByPk(id, {
            attributes: ['id', 'nome', 'descricao'],
            include: tablesAssociate,
        })

        if(!game)
            return res.json({"error": "Game Not Found"})

        let platform = await Console.findAll({
            where: {
                [Op.or]: consoles
            }
        })

        if(platform.length == 0)
            return res.json({'error':'Console Not Found'})

        game.setConsoles(platform)

        game = game.get()
        game.consoles = platform

        res.json(game)
    }

}