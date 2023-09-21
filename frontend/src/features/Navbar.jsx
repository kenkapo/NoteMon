import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline'
import nightwind from "nightwind/helper"
import { stateMode, changeMode } from '../Slices/DarkModeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar({ children }) {
  const mode = useSelector(stateMode);
  const dispatch = useDispatch();
  function handleClick() {
    nightwind.toggle();
    dispatch(changeMode());
  }

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="gradient sticky top-0 z-50">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <Link to="/" className='hover:no-underline'>
                    <div className="flex items-center">

                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-8"
                          src="https://icon-library.com/images/take-notes-icon/take-notes-icon-22.jpg"
                          alt="Your Company"
                        />
                      </div>
                      <div className="md:block">
                        <div className="ml-3 flex items-baseline space-x-4">
                          <div className="text-white , rounded-md pr-2 py-2 text-xl font-weight-400">
                            NoteMon
                          </div>
                        </div>
                      </div>


                    </div>
                  </Link>
                  <div className="md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        onClick={handleClick}
                        className="relative rounded-full bg-purple-500 p-1 text-white hover:text-black nightwind-prevent"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        {(mode) ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}
        </Disclosure>
        <main>
          <div className="mx-auto h-fit">{children}</div>
        </main>
      </div>
    </>
  )
}
