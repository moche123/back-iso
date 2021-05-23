const { response } = require('express');

const Usuario = require('../models/usuario');
const Publicacion = require('../models/publicacion');
const Tema = require('../models/tema');
const ArticuloAprobado = require('../models/articuloaprobado');


const getTodo = async(req, res = response ) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i' );

    const [ usuarios, publicaciones, temas ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Publicacion.find({ nombre: regex }),
        Tema.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        publicaciones,
        temas
    })

}

const getDocumentosColeccion = async(req, res = response ) => {

    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp( busqueda, 'i' );

    let data = [];

    switch ( tabla ) {
        case 'publicaciones':
            data = await Publicacion.find({ nombre: regex })
                                .populate('usuario', 'nombre img habilitado')
                                .populate('tema', 'nombre img habilitado');
        break;

        case 'temas':
            data = await Tema.find({ nombre: regex })
                                    .populate('usuario', 'nombre img habilitado');
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex,habilitado:true });
            
        break;

        case 'publicacionesaprobadas':
            data = await ArticuloAprobado.find({ nombre: regex });
            
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/publicaciones/temas'
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

