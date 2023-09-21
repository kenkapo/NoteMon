import React from "react"
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { stateLoginMessage, stateloggedInUser, checkUserAsync } from "../Slices/AuthSlice";
const Welcome = () => {
  const message = useSelector(stateLoginMessage);
  const user = useSelector(stateloggedInUser);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="relative min-h-screen flex">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div
            className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative"
            style={{
              backgroundImage:
                "url(https://i.ibb.co/XDwxBdh/5fb515c0-c6c7-493c-bfe3-60208e578aa4.jpg)"
            }}
          >
            <div className="absolute  bg-gradient-to-b  from-indigo-600 to-blue-500 opacity-30 inset-0 z-0" />
            <div className="w-full  max-w-md z-10">
              <div className="sm:text-xl xl:text-4xl font-bold leading-tight mb-6 text-purple-600 nightwind-prevent font-serif">
                Welcome to NoteMon! Please log in to access your personal notes and start organizing your thoughts and ideas effortlessly, securely at your fingertips.
              </div>
            </div>
            {/*-remove custom style*/}

          </div>
          <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-gray-50">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                  Welcome Back!
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Please sign in to your account
                </p>
                {message.length > 0 && <p className="mt-2 text-sm text-purple-500">
                  {message}
                </p>}
              </div>
              <form className="mt-8 space-y-6" noValidate onSubmit={handleSubmit((data) => {
                const oldUser = { email: data.email, password: data.password };
                dispatch(checkUserAsync(oldUser));
              })}>


                <input type="hidden" name="remember" defaultValue="true" />
                <div className="relative">
                  <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                    type="email"
                    
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required"
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email.message}</p>
                  )}
                </div>
                <div className="mt-8 content-center">
                  <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required"
                    })}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs">{errors.password.message}</p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Sign in
                  </button>
                </div>
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                  <span>Don"t have an account?</span>
                  <Link to="/signup">
                    <button

                      className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                    >
                      Sign up
                    </button>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Welcome;