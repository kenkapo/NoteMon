import React, { useEffect, useState } from 'react'
import { stateloggedInUser, updateUserAsync } from '../Slices/AuthSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";

const Profile = () => {
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  const user = useSelector(stateloggedInUser);

  const [edit, setEdit] = useState(false);
  const dispatch=useDispatch();
  function handleBio() {
    setEdit(!edit);
  }

  useEffect(()=>{
    setValue("biography",user.biography); 
    setValue("bg_img",user.bg_img);
    setValue("user_img",user.user_img);
  },[user])
  
  return (
    <div className="w-full relative shadow-2xl rounded  overflow-hidden">
      <div className="top h-64 w-full bg-blue-600 overflow-hidden relative ">
        <img
          src={user.bg_img}
          alt="background image"
          className="bg w-full h-full object-cover object-center absolute z-0 nightwind-prevent"
        />
        <div className="flex flex-col justify-center items-center relative h-full  text-white">
          <img
            src={user.user_img}
            alt="user image"
            className="h-24 w-24 object-cover rounded-full nightwind-prevent"
          />
          <h1 className="text-2xl font-semibold ">{user.full_name}</h1>
        </div>
      </div>
      <div className="grid bg-white">

        <div className="md:border-solid md:border-l md:border-black md:border-opacity-25 h-full pb-12 ">
          <div className="px-4 pt-4 flex justify-center">
            <form className="flex flex-col space-y-8" onSubmit={handleSubmit((data) => {
              const updateUser = { ...user };
              console.log(updateUser);
              setEdit(!edit);
              if (!data.biography === false) { updateUser.biography = data.biography; }
              if (!data.user_img === false) {
                updateUser.user_img = data.user_img;
              }
              if (!data.bg_img === false) {
                updateUser.bg_img = data.bg_img;
              }
              dispatch(updateUserAsync(updateUser));
            })}>
              <div>
                <h3 className="text-2xl font-semibold text-black">Your Profile</h3>
                <hr />
              </div>
              <div className="form-item">
                <label className="text-xl text-black">Full Name</label>
                <input
                  type="text"
                  defaultValue={user.full_name}
                  className="w-full appearance-none text-black  rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 bg-gray-100"
                  disabled
                />
              </div>
              <div className="form-item w-full">
                <label className="text-xl text-black">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full appearance-none text-black bg-gray-100 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200  "
                  disabled
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-black">More About Me</h3>
                <hr />
              </div>
              <div className="form-item w-full">
                <label className="text-xl text-black">Biography</label>
                <textarea
                  cols={70}
                  rows={6}
                  className="w-full appearance-none text-black bg-gray-100 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200  "
                  placeholder='Enter something about yourself'
                  disabled={!edit}
                  {...register("biography")}
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-black">Profile Images</h3>
                <hr />
              </div>
              <div className="form-item">
                <label className="text-xl text-black">User Profile Image</label>
                <input
                  type="text"
                  className="w-full appearance-none text-black bg-gray-100 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 "
                  disabled={!edit}
                  {...register("user_img")}
                />
              </div>
              <div className="form-item">
                <label className="text-xl text-black">User Banner Image</label>
                <input
                  type="text"
                  className="w-full appearance-none text-black bg-gray-100 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200  "
                  disabled={!edit}
                  {...register("bg_img")}
                />
              </div>
              {!edit ? <button className="hover:shadow-form rounded-md gradient2 py-2 px-8 text-base font-semibold text-white outline-none " onClick={handleBio}>
                Edit
              </button> :
                <div >
                  <button type="submit" className="hover:shadow-form rounded-md gradient3 py-2 px-8 text-base font-semibold text-white outline-none ">
                    Submit
                  </button>
                  <button className="hover:shadow-form rounded-md gradient4 py-2 px-8 text-base font-semibold text-white outline-none mx-5 " onClick={handleBio}>
                    Cancel
                  </button>
                </div>}
            </form>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Profile