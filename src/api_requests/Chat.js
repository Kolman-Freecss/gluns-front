import axios from 'axios';
import { config } from '../config/config.js';


const Chat = {

    chat: async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await axios.get(
                `${config.apiUrl}/chat`,
                { headers }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    contexts: async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
            };
            const response = await axios.get(
                `${config.apiUrl}/chat/contexts`,
                { headers }
            );
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    },

    // historic: async (email, password, firstName, lastName) => {
    //     try {
    //         const headers = {
    //             'Content-Type': 'application/json',
    //             'Authorization': '9286f77fdac66818891b5845814812dcb0830fb87c6f167f0c7b77377fe8d640cecaa2b23949b442c0bb165f777f68c9fe692615da1cd59a33ee8e7f8f699bd8'
    //         };
    //         const response = await axios.post(
    //             `${config.apiUrl}/register`,
    //             { email, password, first_name: firstName, last_name: lastName },
    //             { headers }
    //         );
    //         return response.data;
    //     } catch (error) {
    //         throw new Error(error.response.data.message);
    //     }
    // },
};

export default Chat;