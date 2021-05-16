const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');


const { getArticulosAprobados, crearArticuloAprobado, borrarArticuloAprobado } = require('../controllers/listaarticulosaprobados')
const router = Router();

router.get( '/', validarJWT, getArticulosAprobados );
router.post( '/', [
    validarJWT,
    check('nombre','El nombre la publicación es necesario').not().isEmpty(),
    validarCampos
], crearArticuloAprobado );


router.delete( '/:id',
    validarJWT,
    borrarArticuloAprobado
);


module.exports = router;