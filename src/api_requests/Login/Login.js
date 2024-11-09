import axios from 'axios';
import { config } from '../../config/config';

const Login = {
  login: async (username, password) => {
    try {
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      const url = `${config.baseUrl}${config.apiPort}${config.apiUrl}/iam/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

      const response = await axios.post(url, null, { headers });

      localStorage.setItem('access_token', "Bearer " + response.data.access_token);

      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Authentication failed');
    }
  }
};

export default Login;
