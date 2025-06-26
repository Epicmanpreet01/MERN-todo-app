import { CiEdit } from 'react-icons/ci';

const EditProfileModal = () => {

  const user = {
    userName: 'Manpreet Singh',
    email: 'manpreet210028@gmail.com'
  }

  return (
    <>
      <button className="btn btn-ghost absolute top-5 right-5 btn-lg rounded-lg" onClick={()=>document.getElementById('my_modal_2').showModal()}> <CiEdit /> </button>
      <dialog id="my_modal_2" className="modal modal-middle">
        <div className="modal-box max-w-xl shadow-sm shadow-primary">
          <h3 className="font-bold text-lg">Edit Profile</h3>
          <div className='divider'></div>
          <div className='flex flex-col space-y-4 px-20'>
            <label className="floating-label">
              <span>Name</span>
              <input type="text" placeholder='epicmanpreet02' value={user.userName} className="input input-md w-full" />
            </label>
            <label className="floating-label">
              <span>Email</span>
              <input type="email" placeholder='xyz@gmail.com' value={user.email} className="input input-md w-full" />
            </label>
            <label className="floating-label">
              <span>New Password</span>
              <input type="password" placeholder='********' className="input input-md w-full" />
            </label>
            <label className="floating-label">
              <span>Current Password</span>
              <input type="password" placeholder='********' className="input input-md w-full" />
            </label>
          </div>
          <div className='divider'></div>
          <div className='flex justify-end space-x-2'>
            <button 
              className='btn btn-outline btn-primary-content' 
              onClick={() => document.getElementById('my_modal_2').close()}
            >
              Update
            </button>
            <button 
              className='btn btn-ghost'
              onClick={() => document.getElementById('my_modal_2').close()}
            >Close</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export default EditProfileModal