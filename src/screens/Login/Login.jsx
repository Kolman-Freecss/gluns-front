export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-3xl font-bold mb-6">Login</h2>
          <form>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full"
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
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full">Login</button>
            </div>
          </form>
          <p className="text-center mt-4">
            Don’t have an account?{' '}
            <a href="#" className="link link-primary">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
