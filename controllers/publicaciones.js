const { response } = require('express');

const Publicacion = require('../models/publicacion');
const ArticuloAprobado = require('../models/articuloaprobado'); 


const getPublicaciones = async(req, res = response) => {
    let i=0;
    const publicaciones = await Publicacion.find()
                                .populate('usuario','nombre email img role habilitado')
                                .populate('tema','nombre img habilitado')
                                
    publicaciones.forEach(async publicacion=>{
        let articulo =  await ArticuloAprobado.find({nombre:publicacion.caa});
        publicacion.artic = articulo;
        i=i+1;
        if(i == publicaciones.length){
            console.log(publicaciones)
            res.json({
                ok: true,
                publicaciones
            })
        }
    })
   
    
}

const getPublicacionById = async(req, res = response) => {

    const id = req.params.id;

    try {
        const publicacion = await Publicacion.findById(id)
                                    .populate('usuario','nombre email img role habilitado')
                                    .populate('tema','nombre img habilitado');
    
  /*       const articulo = await ArticuloAprobado.find({nombre:publicacion.articulo});
        if(articulo.habilitado == false){
            res.json({
                ok: true,
                mensaje:"Articulo eliminado"
            })
            
        } */
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
        const resultadoParcial = await Publicacion.find({}).populate('usuario').populate('tema')
        const resultado = await resultadoParcial.filter(elemento => elemento.usuario.escuela == carearI
            && elemento.usuario.habilitado && elemento.tema.habilitado == true)
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
        const resultadoParcial = await Publicacion.find({}).populate('tema').populate('usuario')
        const resultado = await resultadoParcial.filter(elemento => elemento.tema.nombre == temaI 
            && elemento.usuario.habilitado && elemento.tema.habilitado == true)       
        
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
    /* console.log(publicacion) */

    try {

        const publicacionDB = await publicacion.save();

        await ArticuloAprobado.findOneAndUpdate({nombre:publicacionDB.caa},{publicado:true},{new:true});


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

        //await Publicacion.findByIdAndDelete( id );
        const publicacionActualizado = await Publicacion.findByIdAndUpdate( id,{habilitado:false}, { new: true } );

    
        res.json({
            ok: true,
            msg: 'Publicación borrada',
            publicacion:publicacionActualizado
        }); 

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}
const buscarArticuloAprobado = async ( req,res=response ) => {
    const palabra = req.params.palabra;
    const regex = new RegExp( palabra, 'i' );
    try{
        //console.log(await ArticuloAprobado.find({}));
        const articuloapropiado = await ArticuloAprobado.find({nombre:palabra});
        
        res.json({
            ok: true,
            articulo:articuloapropiado
        })
    } catch (error) {

        //console.log(error);

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
    getPublicationByTema,
    buscarArticuloAprobado
}