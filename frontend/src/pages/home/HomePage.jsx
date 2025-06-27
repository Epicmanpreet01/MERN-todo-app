import { RxCross1 } from "react-icons/rx";
import TaskSkeleton from "../../components/skeletons/TaskSkeleton";
import useTasksQuery from "../../hooks/queries/Tasks";
import useAddTaskMutation from "../../hooks/mutations/AddTaskMutation";
import { useState, useMemo } from "react";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import StaticHeading from "../../components/memos/HeaderTypical";
import useUpdateTaskMutation from "../../hooks/mutations/UpdateTaskMutation";
import useDeleteTaskMutation from "../../hooks/mutations/DeleteTaskMutation";
import formatDate from "../../utils/common/formatDate.js";
const HomePage = ({mode, setMode}) => {

  const { data:tasks, isLoading } = useTasksQuery(mode);
  const { mutate:addTaskMutate, isPending: addPending } = useAddTaskMutation(mode);
  const { mutate:updateTaskMutate } = useUpdateTaskMutation(mode);
  const { mutate:deleteTaskMutate } = useDeleteTaskMutation(mode);

  const [ taskData,setTaskData ] = useState({
    heading: '',
    description: '',
    dueDate: '',
    priority: ''
  });
  const [ search,setSearch ] = useState('');

  const headingSteps = useMemo(() => ['', 100, 'Task List', 5000, ''], []);

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];
    return tasks.filter(task =>
      task.heading.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);



  function handleClick(e) {
    const { name } = e.target;
    if(name === 'add') {
      addTaskMutate(taskData);
      setMode('all');
    }
    setTaskData({
      heading: '',
      description: '',
      dueDate: '',
      priority: ''
    })
    document.getElementById('my_modal_4').close()
  }

  function handleChange(e) {
    const { name,value } = e.target;
    setTaskData(prevTaskData => ({
      ...prevTaskData, [name]:value
    }))
  }

  function handleSearch(e) {
    const { value } = e.target;
    setSearch(value);
  }

  function handleCheck(e,completed) {
    const { name } = e.target;
    updateTaskMutate({
      task: {
        completed
      },
      id: name
    })
  }

  function handleDelete(e) {
    const { name } = e.currentTarget;
    deleteTaskMutate(name);
  }

  return (
    <div className="max-w-6xl mx-auto min-h-screen mt-24 px-6 py-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-primary pb-6">
        <div className="text-4xl font-extrabold text-primary-content">
          <StaticHeading text={headingSteps} />
        </div>

        {/* Search + Add Task */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="flex space-x-1 items-center">
            <div className="text-xs">Priority:</div>
            <div className="badge badge-outline badge-error badge-xs flex-1">High</div>
            <div className="badge badge-outline badge-warning badge-xs flex-1">Medium</div>
            <div className="badge badge-outline badge-info badge-xs flex-1">Low</div>
          </div>

          <input
            type="text"
            placeholder="Search tasks..."
            className="input input-bordered w-full sm:w-72"
            value={search}
            onChange={handleSearch}
          />
          <button className="btn btn-accent font-bold w-full sm:w-auto" onClick={()=>document.getElementById('my_modal_4').showModal()}>+ Add Task</button>
          <dialog id="my_modal_4" className="modal modal-middle">
            <div className="modal-box max-w-xl bg-base-100 shadow-lg border border-primary rounded-2xl">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-primary">📝 Add a New Task</h3>
                <button
                  className="btn btn-sm btn-circle btn-ghost text-error"
                  onClick={() => document.getElementById("my_modal_4").close()}
                >
                  ✕
                </button>
              </div>

              <div className="divider"></div>

              {/* Modal Body */}
              <div className="flex flex-col space-y-4 px-4">
                <label className="form-control w-full">
                  <span className="label-text font-semibold">Heading</span>
                  <input
                    type="text"
                    placeholder="Task heading"
                    className="input input-bordered input-primary w-full"
                    name="heading"
                    value={taskData.heading}
                    onChange={handleChange}
                  />
                </label>

                <label className="form-control w-full">
                  <span className="label-text font-semibold">Description</span>
                  <input
                    type="text"
                    placeholder="Describe your task"
                    className="input input-bordered input-primary w-full"
                    name="description"
                    value={taskData.description}
                    onChange={handleChange}
                  />
                </label>

                <label className="form-control w-full">
                  <span className="label-text font-semibold">Due Date</span>
                  <input
                    type="date"
                    className="input input-bordered input-primary w-full"
                    name="dueDate"
                    value={taskData.dueDate}
                    onChange={handleChange}
                  />
                </label>

                <label className="form-control w-full">
                  <span className="label-text font-semibold">Priority</span>
                  <select
                    className="select select-bordered select-primary w-full"
                    name="priority"
                    value={taskData.priority}
                    onChange={handleChange}
                  >
                    <option disabled value="">Select priority</option>
                    <option>high</option>
                    <option>medium</option>
                    <option>low</option>
                  </select>
                </label>
              </div>

              <div className="divider my-6"></div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3">
                <button
                  name="add"
                  className="btn btn-accent font-semibold px-6"
                  onClick={handleClick}
                  disabled={addPending}
                >
                  {addPending ? <LoadingSpinner /> : "Add Task"}
                </button>
                <button
                  name="close"
                  className="btn btn-outline"
                  onClick={() => document.getElementById("my_modal_4").close()}
                >
                  Cancel
                </button>
              </div>
            </div>

            <form method="dialog" className="modal-backdrop bg-opacity-40 backdrop-blur-sm">
              <button>close</button>
            </form>
          </dialog>
        </div>
      </div>
      {!isLoading && tasks.length === 0 && (
        <div className="text-4xl text-center mt-4 font-extrabold">No Tasks yet 😔</div>
      )}
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
        {!isLoading && filteredTasks.length === 0 && (
          <div className="text-2xl text-center col-span-full font-semibold opacity-50">
            No Tasks Found 🔍
          </div>
        )}
        {!isLoading && filteredTasks.map((task, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between p-5 rounded-2xl shadow-xl transition-all duration-300 hover:scale-[1.015] text-base-content`}
              style={{
                backgroundColor: task.completed
                  ? "var(--color-success)"
                  : task.priority === "high"
                  ? "var(--color-error)"
                  : task.priority === "medium"
                  ? "var(--color-warning)"
                  : task.priority === "low"
                  ? "var(--color-info)"
                  : "var(--color-base-200)",
                color: task.completed
                  ? "var(--color-success-content)"
                  : task.priority === "high"
                  ? "var(--color-error-content)"
                  : task.priority === "medium"
                  ? "var(--color-warning-content)"
                  : task.priority === "low"
                  ? "var(--color-info-content)"
                  : "var(--color-base-content)",
              }}
            >
              {/* Task Header */}
              <div className="flex items-start gap-2">
                <input
                  name={task._id}
                  type="checkbox"
                  className="checkbox checkbox-secondary mt-1"
                  checked={task.completed}
                  onChange={(e) => handleCheck(e,!task.completed)}
                />
                <h4 className="text-lg font-semibold flex-1">{task.heading}</h4>
                <button name={task._id} className="btn btn-ghost btn-xs text-error-100 hover:bg-error hover:text-error-content" onClick={handleDelete}>
                  <RxCross1 />
                </button>
              </div>

              {/* Description */}
              <p className="mt-4 text-base opacity-80">{task.description}</p>

              {/* Time */}
              <span className="text-[10px] mt-6 italic text-right opacity-60">
                Created: {formatDate(task.createdAt)} · Due: {formatDate(task.dueDate)}
              </span>
            </div>
          ))
        }

      </div>
    </div>
  );
};

export default HomePage;
