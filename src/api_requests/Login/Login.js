import axios from 'axios';
import qs from 'qs';
import config from '../../config';

const Login = {
    login: async (username, password) => {
        try {
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
            };

            const response = await axios.post(
                `${config.baseUrl}${config.keyLockPort}${config.loginUrl}`,
                qs.stringify({
                    username: username,
                    password: password,
                    grant_type: 'password',
                    client_id: 'front-gluns'
                }),
                { headers }     
            );

            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Authentication failed');
        }
    }
};

export default Login;
