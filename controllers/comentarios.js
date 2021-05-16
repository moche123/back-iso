const { response } = require('express');
const  Comentario  = require('../models/comentario'); 

const crearComentario = async (req, res = response) => {
    const uid = req.uid;
    //console.log(uid)
    const comentario = new Comentario({
        usuario: uid,
        ...req.body
    });
    console.log(comentario)

    try {

        const comentarioBD = await comentario.save();

        
        res.json({
            ok: true,
            comentario: comentarioBD
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const getComentarios = async(req, res = response) => {
    const comentarios = await Comentario.find({}) .populate('usuario','nombre email img')
    console.log(comentarios)
    res.json({
        ok: true,
        comentarios
    })
}


module.exports = {
    crearComentario,
    getComentarios
    //borrarComentario

}