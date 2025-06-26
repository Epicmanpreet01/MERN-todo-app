import TaskMateLogo from '../../../components/svgs/logo.jsx';
import { Link } from 'react-router-dom'

const SignUpPage = () => {
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
          Let’s get started.
        </h2>
        
        <form className="space-y-5 gap-x-10">
          <label className="form-control w-full">
            <span className="label-text mb-1 text-lg font-bold">Username</span>
            <input
              type="email"
              placeholder="Epicmanpreet02"
              className="input input-bordered w-full my-2"
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1 font-bold text-lg">Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full my-2"
              required
            />
          </label>

          <label className="form-control w-full">
            <span className="label-text mb-1 text-lg font-bold">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              className="input input-bordered w-full my-2"
              required
            />
          </label>

          <button className="btn btn-primary w-full btn-ghost font-bold lg:text-lg rounded-full">
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-base-content/60 mt-6">
          Already have an account? <Link to='/login' className="link link-accent">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
