const { response } = require('express');

const Tema = require('../models/tema');


const getTemas = async(req, res = response) => {

    const temas = await Tema.find()
                                    .populate('usuario','nombre img role habilitado');

    res.json({
        ok: true,
        temas
    })
}

const crearTema = async(req, res = response) => {

    const uid = req.uid;
    const tema = new Tema({ 
        usuario: uid,
        ...req.body 
    });

    try {
        
        const temaDB = await tema.save();
        

        res.json({
            ok: true,
            tema: temaDB
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    


}

const actualizarTema = async (req, res = response) => {

    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const tema = await Tema.findById( id );

        if ( !tema ) {
            return res.status(404).json({
                ok: true,
                msg: 'Tema no encontrado por id',
            });
        }

        const cambiosTema = {
            ...req.body,
            usuario: uid
        }

        const temaActualizado = await Tema.findByIdAndUpdate( id, cambiosTema, { new: true } );


        res.json({
            ok: true,
            tema: temaActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const borrarTema = async(req, res = response) => {

    const id  = req.params.id;

    try {
        
        const tema = await Tema.findById( id );

        if ( !tema ) {
            return res.status(404).json({
                ok: true,
                msg: 'Tema no encontrado por id',
            });
        }

        //await Tema.findByIdAndDelete( id );
        const temaActualizado = await Tema.findByIdAndUpdate( id, {habilitado:false}, { new: true } );

        res.json({
            ok: true,
            msg: 'Tema eliminado',
            tema: temaActualizado
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}



module.exports = {
    getTemas,
    crearTema,
    actualizarTema,
    borrarTema
}