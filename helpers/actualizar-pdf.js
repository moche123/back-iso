const fs = require('fs');
const Publicacion = require('../models/publicacion');


const borrarPDF = ( path ) => {
    if ( fs.existsSync( path ) ) {
        // borrar el pdf anterior
        fs.unlinkSync( path );
    }
}


const actualizarPdf = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'publicaciones':
            const publicacion = await Publicacion.findById(id);
            if ( !publicacion ) {
                console.log('No es un tema por id');
                return false;
            }

            pathViejo = `./fileuploads/publicacione/${ publicacion.articulo }`;
            borrarPDF( pathViejo );

            publicacion.articulo = nombreArchivo;
            await publicacion.save();
            return true;

        break;
    }


}



module.exports = { 
    actualizarPdf
}
