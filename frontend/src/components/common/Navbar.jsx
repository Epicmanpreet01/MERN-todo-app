import { Link } from 'react-router-dom';
import TaskMateLogo from '../svgs/logo';
import { Sunsvg } from '../svgs/sun.jsx';
import { MoonSvg } from '../svgs/moon.jsx';

const Navbar = () => {
  return (
    <nav className="navbar bg-base-100 shadow-md px-4 md:px-10 py-2">
      {/* Left - Logo */}
      <div className="flex-1">
        <Link to="/" className="hover:opacity-90 transition">
          <TaskMateLogo className="w-36 md:w-44" />
        </Link>
      </div>

      {/* Right - Theme Switch + Avatar */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <label className="swap swap-rotate btn btn-circle btn-ghost tooltip tooltip-bottom" data-tip="Toggle theme">
          <input
            type="checkbox"
            className="theme-controller"
            value="synthwave"
            aria-label="Toggle Theme"
          />
          {/* Sun */}
          <Sunsvg className="swap-on w-6 h-6 fill-current" />
          {/* Moon */}
          <MoonSvg className="swap-off w-6 h-6 fill-current" />
        </label>

        {/* Avatar with Dropdown (optional) */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar ring ring-primary ring-offset-base-100 ring-offset-2 w-11 rounded-full cursor-pointer transition hover:ring-4"
          >
            <img
              alt="User avatar"
              src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
              className='rounded-full object-center object-cover'
            />
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] w-56 p-2 shadow-xl bg-base-200 text-base-content rounded-box animate-fadeIn"
          >
            <li className="menu-title text-sm opacity-70 px-2">My Account</li>

            <li>
              <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 transition">
                <span className="material-symbols-outlined text-lg">person</span>
                Profile
              </Link>
            </li>

            <li>
              <Link to="/settings" className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-base-300 transition">
                <span className="material-symbols-outlined text-lg">settings</span>
                Settings
              </Link>
            </li>

            <li>
              <button className="flex items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-error text-error hover:text-error-content transition">
                <span className="material-symbols-outlined text-lg">logout</span>
                Logout
              </button>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
