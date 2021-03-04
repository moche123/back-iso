const Usuario = require('../models/usuario');
const fs = require('fs');

const Publicacion = require('../models/publicacion');
const Tema = require('../models/tema');

const borrarImagen = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar la imagen anterior
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'publicaciones':
            const publicacion = await Publicacion.findById(id);
            if ( !publicacion ) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/publicaciones/${ publicacion.img }`;
            borrarImagen( pathViejo );

            publicacion.img = nombreArchivo;
            await publicacion.save();
            return true;

        break;
        
        case 'temas':
            const tema = await Tema.findById(id);
            if ( !tema ) {
                console.log('No es un tema por id');
                return false;
            }

            pathViejo = `./uploads/temas/${ tema.img }`;
            borrarImagen( pathViejo );

            tema.img = nombreArchivo;
            await tema.save();
            return true;

        break;
        
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen( pathViejo );

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;

        break;
    }


}



module.exports = { 
    actualizarImagen
}
