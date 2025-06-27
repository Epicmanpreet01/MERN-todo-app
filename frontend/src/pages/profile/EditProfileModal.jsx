import { useState } from 'react';
import { CiEdit } from 'react-icons/ci';

import LoadingSpinner from '../../components/common/LoadingSpinner.jsx'
import useUpdateMutation from '../../hooks/mutations/UpdateProfile.js';

const EditProfileModal = ({authUser}) => {

  const { mutate: updateUserMutation,isPending:updateUserPending } = useUpdateMutation();

  const [formData,setFormData] = useState({
    userName: authUser.userName,
    email: authUser.email,
    newPassword: '',
    currentPassword: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData, [name]:value
    }))
  }

  function handleClick(e) {
    const { name } = e.target;
    
    if(name === 'update') {
      updateUserMutation(formData);
    } else {
      setFormData({
        userName: authUser.userName,
        email: authUser.email,
        newPassword: '',
        currentPassword: ''
      })
      document.getElementById("my_modal_2").close()
    }
  }

  return (
    <>
      <button className="btn btn-ghost absolute top-5 right-5 btn-lg rounded-lg" onClick={()=>document.getElementById('my_modal_2').showModal()}> <CiEdit /> </button>
      <dialog id="my_modal_2" className="modal modal-middle">
        <div className="modal-box max-w-xl bg-base-100 shadow-lg border border-primary rounded-2xl">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-primary">👤 Edit Profile</h3>
            <button
              className="btn btn-sm btn-circle btn-ghost text-error"
              onClick={() => document.getElementById("my_modal_2").close()}
            >
              ✕
            </button>
          </div>

          <div className="divider"></div>

          {/* Modal Body */}
          <div className="flex flex-col space-y-4 px-4">
            <label className="form-control w-full">
              <span className="label-text font-semibold">Name</span>
              <input
                type="text"
                placeholder="epicmanpreet02"
                name='userName'
                value={formData.userName}
                className="input input-bordered input-primary w-full"
                onChange={handleChange}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold">Email</span>
              <input
                type="email"
                placeholder="xyz@gmail.com"
                name='email'
                value={formData.email}
                className="input input-bordered input-primary w-full"
                onChange={handleChange}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold">New Password</span>
              <input
                type="password"
                placeholder="********"
                name='newPassword'
                value={formData.newPassword}
                className="input input-bordered input-primary w-full"
                onChange={handleChange}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold">Current Password</span>
              <input
                type="password"
                name='currentPassword'
                value={formData.currentPassword}
                placeholder="********"
                className="input input-bordered input-primary w-full"
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="divider my-6"></div>

          {/* Modal Footer */}
          <div className="flex justify-end space-x-3">
            <button
              name='update'
              className="btn btn-accent font-semibold px-6"
              onClick={handleClick}
            >
              { updateUserPending? <LoadingSpinner /> : 'Update' }
            </button>
            <button
              name='cancel'
              className="btn btn-outline"
              onClick={handleClick}
            >
              Cancel
            </button>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop bg-opacity-40 backdrop-blur-sm">
          <button>close</button>
        </form>
      </dialog>

    </>
  )
}

export default EditProfileModal