const multer = require('multer');
const storage = multer.memoryStorage();
const util = require('util');

const uploadMulter = multer({
  storage: storage,
});

const middlewareMulter = function(field, size) {
  return async (req, res, next) => {  // Note que agora estou passando 'next'
    const upload = util.promisify(uploadMulter.array(field, size));

    try {
      await upload(req, res);  // Se não houver erro, ele passa direto
      next();  // Chama o próximo middleware na pilha
    } catch (err) {
      return res.status(500).send({ 
        errors: [{ msg: `Ocorreu um erro ao subir os arquivos. É permitido apenas ${size} imagens por vez.` }] 
      });
    }
  }
}

module.exports = middlewareMulter;
