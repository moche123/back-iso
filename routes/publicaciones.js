/*
    Publicaciones
    ruta: '/api/publicacion'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getPublicaciones,
    crearPublicacion,
    actualizarPublicacion,
    borrarPublicacion,
    getPublicacionById
} = require('../controllers/publicaciones')


const router = Router();

router.get( '/', validarJWT, getPublicaciones );

router.post( '/',
    [
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('tema','El tema id debe de ser válido').isMongoId(),
        validarCampos
    ], 
    crearPublicacion 
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('tema','El tema id debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarPublicacion
);

router.delete( '/:id',
    validarJWT,
    borrarPublicacion
);

router.get( '/:id',
    validarJWT,
    getPublicacionById
);



module.exports = router;



