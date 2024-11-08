import axios from 'axios';
import { config } from '../config/config.js';


const Dashboard = {

    // chat : async () => {
    //     try {
    //         const headers = {
    //             'Content-Type': 'application/json',
    //         };
    //         const response = await axios.post(
    //             `${config.apiUrl}/chat`,
    //             { headers }
    //         );
    //         return response.data;
    //     } catch (error) {
    //         throw new Error(error.response.data.message);
    //     }
    // },
};

export default Dashboard;