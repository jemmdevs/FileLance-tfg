export const UploadFile = async (fileData) => {
    try{
        // Determinar la URL del backend según el entorno
        let backendUrl = import.meta.env.VITE_BACKEND_URL;
        
        // Si estamos en producción y no hay URL configurada, usar la URL de Render
        if (import.meta.env.PROD && !backendUrl) {
            backendUrl = 'https://filelance-tfg.onrender.com';
        }
        
        console.log('Frontend usando URL:', backendUrl);
        
        const response = await fetch(`${backendUrl}/upload`, {
            method: "POST",
            body: fileData,
        });
        return response.json();

    }catch(error){
        console.log("Error while uploading file", error.message);
    }

}