import fileModel from "../model/fileModel.js";
import dotenv from 'dotenv';

export const UploadController = async (req, res) => {
    try{

        dotenv.config();
        // Determinar la URL del backend según el entorno
        let backendUrl = process.env.BACKEND_URL;
        
        // Si estamos en producción (Render), usar la URL de la aplicación
        if (process.env.NODE_ENV === 'production') {
            // Usar la URL de Render o la URL base de la solicitud
            backendUrl = 'https://filelance-tfg.onrender.com';
        }
        
        //functionality to upload files to database
        const fileObject = {
            path: req.file.path,
            name: req.file.originalname,
        }
        const file = await fileModel.create(fileObject);
        console.log(file);
        
        // Enviar respuesta al cliente con los datos del archivo
        return res.status(200).json({
            path: `${backendUrl}/files/${file._id}`,
            fileInfo: {
                id: file._id,
                name: file.name,
                originalPath: file.path
            }
        });


    }catch(err){
        return res.status(500).json({message:err.message});
    }
}

export const DownloadController = async (req, res) => {
    try{
        //functionality to download files from database
        const file = await fileModel.findById(req.params.fileId);
        if(!file){
            return res.status(404).json({message:"File not found"});
        }
        // Verificar si el archivo existe antes de intentar descargarlo
        const fs = await import('fs');
        const path = await import('path');
        
        // Asegurar que usamos rutas absolutas
        const filePath = path.default.isAbsolute(file.path) 
            ? file.path 
            : path.default.join(process.cwd(), file.path);
            
        console.log('Intentando descargar archivo:', filePath);
        
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({message:"Archivo físico no encontrado: " + filePath});
        }
        res.download(filePath, file.name);
        
    }catch(err){
        return res.status(500).json({message:err.message});
    }
    
}