import axios from 'axios'

const api_url = `http://localhost:${process.env.PORT}`;

export const UploadFilesAndSendLink = async (files) =>{
    try {
        const payload = {files};
        const response = await axios.post(`${api_url}/upload`,payload);
        return response;
    } catch (error) {
        console.error('Error linking API from Frontend to Backend: ',error.message);
    }
};