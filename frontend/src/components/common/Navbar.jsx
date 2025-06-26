import Typical from 'react-typical';
import TaskMateLogo from '../svgs/logo';
import { Link } from 'react-router-dom';
import { LuListTodo } from "react-icons/lu";
import { MdOutlinePending,MdNotificationImportant } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className='drawer'>
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div className="navbar fixed top-0 left-0 right-0 z-50 px-10 shadow-sm bg-base-100 flex justify-between">
        <div className='navbar-start'>
          <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
          <Typical
            className="text-3xl ml-4 font-extrabold"
            steps={['', 100,'ToDo List.', 5000,'']}
            loop={Infinity}
            wrapper='p'
          />
        </div>

        <div className='navbar-end space-x-5'>
          <input type="checkbox" value="retro" className="toggle theme-controller" />
          <div className="avatar cursor-pointer dropdown relative">
            <div tabIndex={0} role="button" className="ring-primary ring-offset-base-100 w-9 rounded-full ring-2 ring-offset-2">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 shadow-sm absolute top-10 right-0 text-lg font-bold">
              <li><a className=''>Profile Page</a></li>
              <li className='text-error'><a>Log Out</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="drawer-side z-50">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-6 text-xl gap-y-3">

          {/* Logo */}
          <TaskMateLogo className="fill-primary-content  mb-6" textColor='text-secondary' />

          {/* Menu Items */}
          <Link to={'/all'}>
            <li>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-primary hover:text-primary-content shadow-sm">
                <LuListTodo className="text-lg" /> All Tasks
              </div>
            </li>
          </Link>

          <Link to={'/completed'}>
            <li>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-success hover:text-success-content shadow-sm">
                <FaCheck className="text-lg" /> Completed Tasks
              </div>
            </li>
          </Link>

          <Link to={'/pending'}>
            <li>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-warning hover:text-warning-content shadow-sm">
                <MdOutlinePending className="text-lg" /> Pending Tasks
              </div>
            </li>
          </Link>

          <Link to={'/important'}>
            <li>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-error hover:text-error-content shadow-sm">
                <MdNotificationImportant className="text-lg" /> Important Tasks
              </div>
            </li>
          </Link>
        </ul>
      </div>

    </div>
  );
};

export default Navbar;
