import Typical from 'react-typical';
import EditProfileModal from './EditProfileModal';

import useAuthUserQuery from '../../hooks/queries/AuthUser.js'
import useTasksQuery from '../../hooks/queries/Tasks.js';
import ProfileSkeleton from '../../components/skeletons/ProfileSkeleton.jsx';

const ProfilePage = () => {

  

  const {data:authUser, isLoading:userLoading } = useAuthUserQuery();
  const {data:tasks, isLoading:taskLoading, isRefetching: taskRefatching} = useTasksQuery('all');

  const totalTasks = tasks?.length;
  const completedTasks = tasks?.filter(task => task.completed === true).length;
  const pendingTasks = tasks?.filter(task => task.completed === false).length;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {(userLoading || taskLoading || taskRefatching) && <ProfileSkeleton />}
      {!userLoading && !taskLoading && !taskRefatching && (
        <div className="mt-32 px-6 max-w-4xl mx-auto flex flex-col items-center shadow-sm shadow-accent border-sm border-accent rounded-2xl space-y-10 py-10 backdrop-blur-md relative">
          {/* Edit button */}
          <EditProfileModal authUser={authUser} />

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
                <Typical steps={['', 100, authUser?.userName]} wrapper="span" />
              </h1>
            </div>

            {/* Email with Label */}
            <div className="space-y-1">
              <p className="text-xs uppercase text-neutral-content tracking-wide">Email</p>
              <p className="text-lg md:text-xl font-medium text-secondary-content italic">
                <Typical steps={['', 100, authUser?.email]} wrapper="span" />
              </p>
            </div>
          </div>
          <div className='divider text-3xl'>STATS</div>
          <div className="stats stats-vertical md:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-title">Total Tasks</div>
              <div className="stat-value">{totalTasks}</div>
              <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>

            <div className="stat">
              <div className="stat-title">Completed Tasks</div>
              <div className="stat-value">{completedTasks}</div>
              <div className="stat-desc"> Completion rate {(completedTasks/totalTasks)*100}%</div>
            </div>

            <div className="stat">
              <div className="stat-title">Pending Tasks</div>
              <div className="stat-value">{pendingTasks}</div>
              <div className="stat-desc"> Gotta do 'em fast</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
