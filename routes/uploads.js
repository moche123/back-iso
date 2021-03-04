/*

    ruta: api/uploads/
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');


const { validarJWT } = require('../middlewares/validar-jwt');
const { pdfUpload, retornaPdf } = require('../controllers/pdfuploads');
const { fileUpload,retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use( expressFileUpload() );

router.put('/:tipo/:id', validarJWT , fileUpload );

router.get('/:tipo/:foto', retornaImagen );



router.put('/articulo/:tipo/:id', validarJWT , pdfUpload );

router.get('/articulo/:tipo/:file', retornaPdf );



module.exports = router;