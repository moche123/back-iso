const { response } = require('express');

const Publicacion = require('../models/publicacion');

const getPublicaciones = async(req, res = response) => {

    const publicaciones = await Publicacion.find()
                                .populate('usuario','nombre img')
                                .populate('tema','nombre img')


    res.json({
        ok: true,
        publicaciones
    })
}

const getPublicacionById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const publicacion = await Publicacion.findById(id)
                                    .populate('usuario','nombre img')
                                    .populate('tema','nombre img');
    
        res.json({
            ok: true,
            publicacion
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}
const getPubilcationbyStudentCarear = async (req,res=response) => {
    const carearI = req.params.carear
    
    try{
        const resultadoParcial = await Publicacion.find({}).populate('usuario')
        const resultado = await resultadoParcial.filter(elemento => elemento.usuario.escuela == carearI)
        console.log('Para '+carearI,": "+resultado)
        res.json({
            ok: true,
            resultado
        })
    }catch(error){
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
}

const getPublicationByTema = async(req,res=response)=>{
    const temaI = req.params.tema;

    try{
        const resultadoParcial = await Publicacion.find({}).populate('tema')
        const resultado = await resultadoParcial.filter(elemento => elemento.tema.nombre == temaI)       
        
        res.json({
            ok: true,
            resultado
        })
    }catch(error){
        console.log(error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const crearPublicacion = async (req, res = response) => {

    const uid = req.uid;
    const publicacion = new Publicacion({
        usuario: uid,
        ...req.body
    });


    try {

        const publicacionDB = await publicacion.save();

        
        res.json({
            ok: true,
            publicacion: publicacionDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const actualizarPublicacion = async(req, res = response) => {
    
    const id  = req.params.id;
    const uid = req.uid;

    try {
        
        const publicacion = await Publicacion.findById( id );

        if ( !publicacion ) {
            return res.status(404).json({
                ok: true,
                msg: 'Publicacion no encontrado por id',
            });
        }

        const cambiosPublicacion = {
            ...req.body,
            usuario: uid
        }

        const publicacionActualizado = await Publicacion.findByIdAndUpdate( id, cambiosPublicacion, { new: true } );


        res.json({
            ok: true,
            publicacion: publicacionActualizado
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const borrarPublicacion = async (req, res = response) => {
   
    const id  = req.params.id;

    try {
        
        const publicacion = await Publicacion.findById( id );

        if ( !publicacion ) {
            return res.status(404).json({
                ok: true,
                msg: 'Publicacion no encontrado por id',
            });
        }

        await Publicacion.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Publicación borrada'
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
    getPublicaciones,
    crearPublicacion,
    actualizarPublicacion,
    borrarPublicacion,
    getPublicacionById,
    getPubilcationbyStudentCarear,
    getPublicationByTema
}