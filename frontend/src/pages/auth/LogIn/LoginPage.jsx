import TaskMateLogo from '../../../components/svgs/logo.jsx';
import { Link } from 'react-router-dom'

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center bg-base-100 text-base-content px-6 py-10">
      
      {/* Logo Section */}
      <div className="w-full lg:w-1/2 flex justify-center mb-10 lg:mb-0">
        <TaskMateLogo
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          size={500}
          textColor="currentColor"
        />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md bg-base-200 p-8 rounded-box shadow-lg">
        <h2 className="text-3xl font-extrabold mb-6">
          Let’s get started
        </h2>

        <form className="space-y-5">
          <label className="form-control w-full">
            <span className="label-text mb-1">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full"
              required
            />
          </label>

          <button className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <p className="text-sm text-center text-base-content/60 mt-6">
          Don’t have an account? <Link to='/signup' className="link link-accent">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
