const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { crearComentario, getComentarios } = require('../controllers/comentarios');
const router = Router();


router.get( '/', validarJWT, getComentarios );
router.post( '/', [
    validarJWT,
    check('contenido','El contenido la publicación es necesario').not().isEmpty(),
    validarCampos
], crearComentario );

module.exports = router;