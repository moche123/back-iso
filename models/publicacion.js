const { Schema, model } = require('mongoose');

const PublicacionSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    tema: {
        type: Schema.Types.ObjectId,
        ref: 'Tema',
        required: true
    },
    contenido: {
        type: String,
        required:true
    },
    articulo: {
        type: String,
        
    }
});


PublicacionSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Publicacion', PublicacionSchema );
