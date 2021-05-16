const { response } = require('express');
const ArticuloAprobado = require('../models/articuloaprobado'); 
const Publicacion = require('../models/publicacion');


const crearArticuloAprobado = async (req, res = response) => {

    console.log(req.body)
    const ArticuloAp = new ArticuloAprobado({

        ...req.body
    });


    try {

        const articuloAprobadoBD = await ArticuloAp.save();

        
        res.json({
            ok: true,
            articuloAprobado: articuloAprobadoBD
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const borrarArticuloAprobado = async(req, res = response) => {

    const id  = req.params.id;
    console.log(id)
    try {
        
        const tema = await ArticuloAprobado.findById( id );

        if ( !tema ) {
            return res.status(404).json({
                ok: true,
                msg: 'Articulo no encontrado por id',
            });
        }

        //await Tema.findByIdAndDelete( id );
        const articuloAprobadoActualizado = await ArticuloAprobado.findByIdAndUpdate( id, {habilitado:false}, { new: true } );

        res.json({
            ok: true,
            msg: 'Articulo eliminado',
            tema: articuloAprobadoActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



const getArticulosAprobados = async(req, res = response) => {
    const articulosAprobados = await ArticuloAprobado.find({})
    console.log(articulosAprobados)
    res.json({
        ok: true,
        articulosAprobados
    })
}



module.exports = {
    crearArticuloAprobado,
    getArticulosAprobados,
    borrarArticuloAprobado

}