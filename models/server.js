const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); 
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            usuarios: "/api/usuarios",
            shorturl: "/api/shorturl"
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // BodyParser
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // Directorio Público
        this.app.use( express.static('public') );

    }

    routes() {
        
        this.app.use( this.paths.usuarios, require("../routes/usuarios.routes"));
        this.app.use( this.paths.shorturl, require("../routes/shorturl.routes"));
        
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;