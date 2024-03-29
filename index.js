require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');


// Crear el servidor de express
const app = express();

// Configurar CORS
app.use( cors() );

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

// Directorio público
app.use( express.static('public') );

// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/temas', require('./routes/temas') );
app.use( '/api/publicaciones', require('./routes/publicaciones') );
app.use( '/api/todo', require('./routes/busquedas') );
app.use( '/api/login', require('./routes/auth') );
app.use( '/api/upload', require('./routes/uploads') );
app.use( '/api/escuelas', require('./routes/escuelas') );
app.use( '/api/articulosaprobados', require('./routes/articulosaprobados') );
app.use( '/api/comentarios', require('./routes/comentarios') );
// Lo último
app.get('*', (req, res) => {
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) );
});


app.listen( process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT );
});

