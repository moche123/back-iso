const { Schema, model } = require('mongoose');

const ArticuloAprobadoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    publicado: {
        type: Boolean,
        default: false
    },
    habilitado:{
        type: Boolean,
        default: true
    }
});


ArticuloAprobadoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'ArticuloAprobado', ArticuloAprobadoSchema );
