import Typical from "react-typical";
import { RxCross1 } from "react-icons/rx";
import TaskSkeleton from "../../components/skeletons/TaskSkeleton";

const HomePage = () => {
  const tasks = [
    {
      heading: "I love tasks",
      description: "Aggressively bruh ",
      checked: true,
    },
    {
      heading: "I love doing",
      description: "Aggressively bruh ",
      checked: false,
    },
    {
      heading: "I love doing tasks",
      description: "Aggressively bruh ",
      checked: false,
    },
    {
      heading: "I love",
      description: "Aggressively bruh ",
      checked: false,
    },
  ];

  const isLoading = false;

  return (
    <div className="max-w-6xl mx-auto min-h-screen mt-24 px-6 py-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-primary pb-6">
        <div className="text-4xl font-extrabold text-primary-content">
          <Typical steps={["", 100, "Task List", 5000, ""]} loop={Infinity} wrapper="p" />
        </div>

        {/* Search + Add Task */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search tasks..."
            className="input input-bordered w-full sm:w-72"
          />
          <button className="btn btn-accent font-bold w-full sm:w-auto" onClick={()=>document.getElementById('my_modal_4').showModal()}>+ Add Task</button>
          <dialog id="my_modal_4" className="modal modal-middle">
            <div className="modal-box max-w-xl shadow-sm shadow-primary">
              <h3 className="font-bold text-lg">Add Task</h3>
              <div className='divider'></div>
              <div className='flex flex-col space-y-4 px-20'>
                <label className="floating-label">
                  <span>Heading</span>
                  <input type="text" placeholder='Heading' className="input input-md w-full" />
                </label>
                <label className="floating-label">
                  <span>Description</span>
                  <input type="email" placeholder='Description' className="input input-md w-full" />
                </label>
                <label className="floating-label">
                  <span>Date</span>
                  <input type="date" placeholder='Date' className="input input-md w-full" />
                </label>
                <select defaultValue="Pick a color" className="select w-full">
                  <option disabled={true}>Priority</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div className='divider'></div>
              <div className='flex justify-end space-x-2'>
                <button 
                  className='btn btn-outline btn-primary-content' 
                  onClick={() => document.getElementById('my_modal_4').close()}
                >
                  Add
                </button>
                <button 
                  className='btn btn-ghost'
                  onClick={() => document.getElementById('my_modal_4').close()}
                >Close</button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-10 bg-base-100">
        {isLoading && (
          <>
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
            <TaskSkeleton />
          </>
        )}
        {!isLoading && tasks.map((task, index) => (
          <div
            key={index}
            className={`flex flex-col justify-between p-5 rounded-2xl shadow-xl transition-all duration-300 ${
              task.checked ? "bg-success text-success-content" : "bg-base-200"
            } hover:scale-[1.015]`}
          >
            {/* Task Header */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                className="checkbox checkbox-secondary mt-1"
                checked={task.checked}
                readOnly
              />
              <h4 className="text-lg font-semibold flex-1">{task.heading}</h4>
              <button className="btn btn-ghost btn-xs text-error hover:bg-error hover:text-error-content">
                <RxCross1 />
              </button>
            </div>

            {/* Description */}
            <p className="mt-4 text-base opacity-80">{task.description}</p>

            {/* Time */}
            <span className="text-sm mt-6 italic text-right opacity-60">10:00 - 12:00</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
