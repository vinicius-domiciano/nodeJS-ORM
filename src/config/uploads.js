const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    storage: multer.diskStorage({
        destination: 'images/',
        filename: function (req, file, cb) {
            const ext = path.extname(file.originalname)
            const nome = path.basename(file.originalname, ext)

            const hash = crypto.createHash('sha256')
                    .update(nome + Date.now())
                    .digest('hex')
            
            cb(null, `Imagem-${hash}${ext}`)
        }
    })
}