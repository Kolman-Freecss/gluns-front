import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginService from '../../api_requests/Login/Login';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await LoginService.login(username, password);
      setError(null);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter your username"
                className="input input-bordered w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && (
              <p className="text-red-500 text-center mt-2">{error}</p>
            )}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>
          <p className="text-center mt-4">
            Don’t have an account?{' '}
            <Link to="/register" className="link link-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
