const { Schema, model } = require('mongoose');


const ComentarioSchema = Schema({
    contenido: {
        type: String,
        required: true
    },
    usuario: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },

});


ComentarioSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Comentario', ComentarioSchema );