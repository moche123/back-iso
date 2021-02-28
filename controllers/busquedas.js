const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Tema = require('../models/tema');


const getTodo = async(req, res = response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [ usuarios, medicos, temas ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Tema.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        medicos,
        temas
    })

}

const getDocumentosColeccion = async(req, res = response ) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp( busqueda, 'i' );

    let data = [];

    switch ( tabla ) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                                .populate('usuario', 'nombre img')
                                .populate('tema', 'nombre img');
        break;

        case 'temas':
            data = await Tema.find({ nombre: regex })
                                    .populate('usuario', 'nombre img');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/medicos/temas'
            });
    }
    
    res.json({
        ok: true,
        resultados: data
    })

}


module.exports = {
    getTodo,
    getDocumentosColeccion
}

