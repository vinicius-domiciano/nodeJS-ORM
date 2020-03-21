const Dev = require('../models/Desenvolvedores')

const gamesAssociation = () => {
    return {
        association: 'games',
        attributes: [
            ['id', 'id_game'],
            ['nome', 'game'],
            'descricao'
        ],
    }
}

module.exports = {

    async listAll(req, res) {

        const devs = await Dev.findAll({
            include: [
                gamesAssociation(),
            ],
            attributes: ['id', 'nome']
        })

        if(devs.length == 0){
            return res.json({'Ops': 'Devs Not Found'})
        }

        return res.json(devs)

    },

    async searchId(req, res) {
        const { id } = req.params

        const dev = await Dev.findByPk(id,{
            include: [
                gamesAssociation(),
            ],
            attributes: ['id', 'nome']
        })
        
        if(!dev)
            return res.json({'error' : 'Dev Not Found'})

        return res.json(dev)

    },

    async newStorage(req, res) {
        const { nome }  = req.body;
        
        const user = await Dev.create({ nome })

        return res.status(201).json(user)
    },

    async dataUpdate(req, res) {
        const { id } = req.params
        let { nome } = req.body;

        const updated = await Dev.update({nome},{
            where: {
                id
            }
        })

        console.log(updated)

        if(!updated[0])
            return res.json({'error' : 'Dev Not Found'})

        const dev = {
            id,
            nome
        }

        return res.json(dev)

    },

    async deleteStorage(req, res) {
        const { id } = req.params

        const deleted = await Dev.destroy({
            where: {
                id
            }
        })

        if(!deleted)
            return res.json({'error' : 'Dev Not Found'})

        return res.json()

    },

}