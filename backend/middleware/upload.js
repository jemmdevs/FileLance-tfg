import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Asegurar que la carpeta de archivos exista
const fileDir = path.join(process.cwd(), 'fileFolder');
if (!fs.existsSync(fileDir)) {
    fs.mkdirSync(fileDir, { recursive: true });
    console.log(`Carpeta de archivos creada en: ${fileDir}`);
}

const storage = multer({dest: fileDir});

export default storage;