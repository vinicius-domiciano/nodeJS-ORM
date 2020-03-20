const Consoles = require('../models/Consoles')

module.exports = {

    async listAll(req, res) {

        const consoles = await Consoles.findAll({
            attributes: ['id', 'nome']
        })
        
        if(consoles.length == 0)
            return res.status(400).json({'Ops': 'Consoles Not Found'})

        res.json(consoles)

    },

    async searchId(req, res) {
        const { id } = req.params

        const platform = await Consoles.findByPk(id)

        if(!platform)
            res.json({'error':'Console Not Found'})

        res.json(platform)

    },

    async newStorage(req, res) {
        const { nome }  = req.body;
        
        const user = await Consoles.create({ nome })

        return res.status(201).json(user)
    },

    async dataUpdate(req, res) {
        const { id } = req.params
        const { nome } = req.body

        // if(!platform)
        //     return res.json({'error': 'Console Not Found'})

        const updatedConsole = await Consoles.update({ nome },{
            where: {
                id
            },
        })

        if(!updatedConsole[0])
            return res.json({'error': 'Console Not Found'})

        const platform = await Consoles.findByPk(id)

        res.json(platform)

    },

    async deleteStorage(req, res) {
        const { id } = req.params

        if(!await Consoles.findByPk(id))
            return res.json({'error': 'Consoles Not Found'})

        const deletedConsole = await Consoles.destroy({
            where: {
                id
            }
        })

        if(!deletedConsole)
            res.status(400).json()

        res.status(204).json()

    },
}