/*
    Escuelas
    ruta: '/api/temas'
*/
const { Router } = require('express');

const router = Router();
const listaEscuelas = ['EPM','EPF','EPICI','EPE','EPIE']

router.get( '/', (req,res)=>{
    res.send(listaEscuelas)
    
} );


module.exports = router;