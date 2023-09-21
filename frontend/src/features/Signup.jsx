import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync, stateSignUpMessage, stateloggedInUser } from "../Slices/AuthSlice";


const Welcome = () => {
  const dispatch = useDispatch();
  const message = useSelector(stateSignUpMessage);
  const user = useSelector(stateloggedInUser);
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
                Welcome to NoteMon! Please create account to access your personal notes and start organizing your thoughts and ideas effortlessly, securely at your fingertips.
              </div>
            </div>
          </div>
          <div className="md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-gray-50">
            <div className="max-w-md w-full space-y-8">
              <div className="text-center">
                <h2 className="mt-6 text-3xl font-bold text-gray-900">
                  Welcome!
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Create Account
                </p>
                {message.length > 0 && <p className="mt-2 text-sm text-purple-500">
                  {message}
                </p>}
              </div>
              <form noValidate className="mt-8 space-y-6" onSubmit={handleSubmit((data) => {
                const newUser = {
                  email: data.email, password: data.password, user_img: "https://raw.githubusercontent.com/bluebrown/tailwind-zendesk-clone/master/public/assets/avatar.png",
                  bg_img: "https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
                  full_name: data.full_name, biography: ""
                };
                dispatch(createUserAsync(newUser));
                reset();
              })}>
                <div className="relative">
                  <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide" htmlFor="email">
                    Email
                  </label>
                  <input
                    className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                    type="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                        message: 'email not valid',
                      },
                    })}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email.message}</p>
                  )}
                </div>
                <div className="mt-8 content-center">
                  <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    {...register('password', {
                      required: 'Password is required',
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: `at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                      },
                    })}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs">{errors.password.message}</p>
                  )}
                </div>
                <div className="mt-8 content-center">
                  <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                    type="password"
                    {...register('confirmPassword', {
                      required: 'confirm password is required',
                      validate: (value, formValues) =>
                        value === formValues.password || 'password not matching',
                    })}
                    placeholder="confirm password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <div className="relative">
                  <label className="ml-3 text-sm font-bold text-gray-700 tracking-wide" htmlFor="full_name">
                    Full Name
                  </label>
                  <input
                    className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                    type="text"
                    {...register('full_name', {
                      required: 'Full Name is required',
                    })}
                    placeholder="Enter your Name"
                  />
                  {errors.full_name && (
                    <p className="text-red-500 text-xs">{errors.full_name.message}</p>
                  )}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Register
                  </button>
                </div>
                <p className="flex flex-col items-center justify-center mt-10 text-center text-md text-gray-500">
                  <span>Have an account?</span>
                  <Link to="/login">
                    <button
                      className="text-indigo-400 hover:text-blue-500 no-underline hover:underline cursor-pointer transition ease-in duration-300"
                    >
                      Sign In
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