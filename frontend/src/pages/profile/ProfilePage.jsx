import Typical from 'react-typical';
import { CiEdit } from 'react-icons/ci';

const ProfilePage = () => {
  const user = {
    userName: 'Manpreet Singh',
    email: 'manpreet210028@gmail.com',
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="mt-32 px-6 max-w-4xl mx-auto flex flex-col items-center shadow-sm shadow-accent border-sm border-accent rounded-2xl space-y-10 py-10 backdrop-blur-md relative">
        {/* Edit button */}
        <button className="btn btn-ghost absolute top-5 right-5 btn-lg rounded-lg">
          <CiEdit />
        </button>

        {/* Avatar */}
        <div className="avatar">
          <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 shadow-xl">
            <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" alt="Profile" />
          </div>
        </div>

        {/* User Info */}
        <div className="text-center space-y-6">
          {/* Name with Label */}
          <div className="space-y-1">
            <p className="text-xs uppercase text-neutral-content tracking-wide">Name</p>
            <h1 className="text-5xl font-extrabold text-primary drop-shadow-md">
              <Typical steps={['', 100, user.userName]} wrapper="span" />
            </h1>
          </div>

          {/* Email with Label */}
          <div className="space-y-1">
            <p className="text-xs uppercase text-neutral-content tracking-wide">Email</p>
            <p className="text-lg md:text-xl font-medium text-secondary-content italic">
              <Typical steps={['', 50, user.email]} wrapper="span" />
            </p>
          </div>
        </div>
        <div className='divider text-3xl'>STATS</div>
        <div className="stats stats-vertical md:stats-horizontal shadow">
          <div className="stat">
            <div className="stat-title">Total Tasks</div>
            <div className="stat-value">20</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-title">Completed Tasks</div>
            <div className="stat-value">12</div>
            <div className="stat-desc"> Completion rate 22%</div>
          </div>

          <div className="stat">
            <div className="stat-title">Pending Tasks</div>
            <div className="stat-value">4</div>
            <div className="stat-desc"> Gotta do 'em fast</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
