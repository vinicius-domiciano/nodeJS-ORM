const Game = require('../models/GameDao')

const jogos = {
    async listar (req, res){
        try{
            const lista = await Game.findAll();
            res.status(200).send(lista)
        }catch(error){
            res.status(500).send({'erro': error})
        }

    },

    async jogo (req, res){
        const id = req.params.id;
        try{
            const jogo = await Game.findByPk(id);
            console.log(jogo)
            res.status(200).send(jogo)
        }catch(error){
            res.status(500).send({'erro': error})
        }
    },

    async inserir (req, res){
        const jogo = req.body;
        try{
            const resultado = await Game.create(jogo)
            res.status(200).send(resultado)
        }catch(error){
            res.status(500).send({'erro': error})
        }
    },

    async atualizar (req, res){
        const id = req.params.id;
        let jogo = req.body;
        const params = {
            where : {
                id
            }
        }
        try{
            const resultado = await Game.update(jogo, params)
            console.log(resultado)
            if(resultado){
                jogo = {
                    success: "Autualizado com sucesso",
                    "Result":{id, ... jogo}
                }
                res.status(200).send(jogo)
            }
        }catch(error){
            console.log(error)
            res.status(500).send({"erro": error})
        }
    },

    async deletar (req, res){
        const id = req.params.id;
        const params = {
            where : {
                id
            }
        }
        try{
            const retorno = await Game.destroy(params)
            res.status(200).send({linhasAfetadas: retorno})
        }catch(error){
            res.status(500).send({'erro': error})
        }
    }

} 

module.exports = jogos;