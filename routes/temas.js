/*
    Temas
    ruta: '/api/temas'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getTemas,
    crearTema,
    actualizarTema,
    borrarTema
} = require('../controllers/temas')


const router = Router();

router.get( '/', getTemas );

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del tema es necesario').not().isEmpty(),
        validarCampos
    ], 
    crearTema 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del tema es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarTema
);

router.delete( '/:id',
    validarJWT,
    borrarTema
);



module.exports = router;
