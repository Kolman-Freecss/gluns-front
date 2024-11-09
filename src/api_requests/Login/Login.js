import axios from 'axios';
import { config } from '../../config/config';

const Login = {
  login: async (username, password) => {
    try {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const url = `${config.baseUrl}${config.apiUrl}/iam/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
      console.log('Login URL:', url);

      const response = await axios.post(url, null, { headers });

      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Authentication failed');
    }
  }
};

export default Login;
