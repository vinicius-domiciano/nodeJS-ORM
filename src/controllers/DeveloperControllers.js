const Dev = require('../models/Desenvolvedores')

module.exports = {
    async newStorage(req, res) {
        const { nome }  = req.body;
        
        const user = await Dev.create({ nome })

        return res.status(201).json(user)
    },
}