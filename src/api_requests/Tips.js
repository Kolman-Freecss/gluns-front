import axios from 'axios';
import { config } from '../config/config.js';

const token = localStorage.getItem('access_token');

const Tips = {

    tips : async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': token
            };
            const response = await axios.post(
                `${config.baseUrl}${config.apiPort}${config.apiUrl}/tips`,
                { headers }
            );

            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
};

export default Tips;