const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizarPdf } = require('../helpers/actualizar-pdf');


const pdfUpload = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    // Validar tipo
    const tiposValidos = ['publicaciones'];
    if ( !tiposValidos.includes(tipo) ){
        return res.status(400).json({
            ok: false,
            msg: 'No es una publicación (tipo)'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    // Procesar el pdf...
    const file = req.files.pdf;

    const nombreCortado = file.name.split('.'); 
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];
    
    // Validar extension
    const extensionesValidas = ['pdf'];
    if ( !extensionesValidas.includes( extensionArchivo ) ) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar el pdf
    const path = `./fileuploads/${ tipo }/${ nombreArchivo }`;

    // Mover el pdf
    file.mv( path , (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover el pdf'
            });
        }

        // Actualizar base de datos
        actualizarPdf( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

}


const retornaPdf = ( req, res = response ) => {

    const tipo = req.params.tipo;
    const file = req.params.file;

    const pathPdf = path.join( __dirname, `../fileuploads/${ tipo }/${ file }` );
    console.log(tipo,file,pathPdf)
    // imagen por defecto
    if ( fs.existsSync( pathPdf ) ) {
        res.sendFile( pathPdf );
    } else {
        console.log('not found')
        const pathPdf = path.join( __dirname, `../fileuploads/no-pdf.pdf` );
        console.log(pathPdf)
        res.sendFile( pathPdf );
    }

}


module.exports = {
    pdfUpload,
    retornaPdf
}