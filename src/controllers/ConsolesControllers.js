const Consoles = require('../models/Consoles')

module.exports = {
    async newStorage(req, res) {
        const { nome }  = req.body;
        
        const user = await Consoles.create({ nome })

        return res.status(201).json(user)
    },
}