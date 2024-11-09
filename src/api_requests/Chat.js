import axios from 'axios';
import { config } from '../config/config.js';

const token = localStorage.getItem('access_token');

const Chat = {
    chat: async () => {
        try {
            
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': token
            };

            const response = await axios.get(
                `${config.baseUrl}${config.apiPort}${config.apiUrl}/chat`,
                { headers }
            );
            return response;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    contexts: async () => {
        try {
            const headers = {
                'Authorization': token
            };
            const response = await axios.get(
                `${config.baseUrl}${config.apiPort}${config.apiUrl}/chat/contexts`,
                { headers }
            );
            return response;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    request: async (chatId, context, message) => {
        try {
            const headers = {
                'Authorization': token,
                'Content-Type': 'application/json'
            };
            const response = await axios.post(
                `${config.baseUrl}${config.apiPort}${config.apiUrl}/chat/request`,
                { "chatHistoryId": chatId, "contextType": context, "message": message },
                { headers }
            );
            return response.data;

        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },
};

export default Chat;