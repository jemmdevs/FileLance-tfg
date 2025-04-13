import express from 'express';
import Connection from './database/db.js';
import router from "./routes/api.js"
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Cargar variables de entorno
dotenv.config();

const app = express();

// Configurar NODE_ENV para producción en Render
if (process.env.RENDER) {
    process.env.NODE_ENV = 'production';
    console.log('Ejecutando en Render - Modo producción activado');
}

const PORT = process.env.PORT || 9000;
// Configurar CORS
app.use(cors());

// Imprimir información de depuración
console.log('Entorno:', process.env.NODE_ENV);
console.log('Backend URL:', process.env.BACKEND_URL);
app.use('/', router);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, './frontend/dist')));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
    console.log("Current directory:", __dirname);
    console.log("File storage path:", path.join(__dirname, 'fileFolder'));
});

Connection();