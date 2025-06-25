import TaskMateLogo from '../svgs/logo';
import { Link } from 'react-router-dom';
import { Sunsvg } from '../svgs/sun.jsx';
import { MoonSvg } from '../svgs/moon.jsx';
const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between px-10">
      <Link to={'/'}>
        <TaskMateLogo />
      </Link>
      <div className='flex space-x-5 '>
      <label className="swap swap-rotate">
        {/* this hidden checkbox controls the state */}
        <input type="checkbox" className="theme-controller" value="synthwave" />

        {/* sun icon */}
        <Sunsvg />

        {/* moon icon */}
        <MoonSvg />
      </label>
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-11 rounded-full ring-2 ring-offset-2 cursor-pointer">
            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
