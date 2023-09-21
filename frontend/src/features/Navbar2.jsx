import { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import nightwind from "nightwind/helper"
import { StarIcon } from '@heroicons/react/24/solid'
import { stateloggedInUser, resetUser } from '../Slices/AuthSlice'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { stateMode, changeMode } from '../Slices/DarkModeSlice'
import { getAllNotesAsync, getAllStarredNotesAsync, searchNotesAsync, stateNotes } from '../Slices/NotesSlice'
import { store } from '../constants/store';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}



const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Sign out', href: '/login' },
]

export default function Navbar2({ children }) {
  const [searchVal, setSearchVal] = useState("");
  const [search, setSearch] = useState(false);
  const [star, setStar] = useState(false);
  const user = useSelector(stateloggedInUser);
  const mode = useSelector(stateMode);
  const dispatch = useDispatch();
  function handleClick() {
    nightwind.toggle();
    dispatch(changeMode());
  }

  const getNotes = useSelector(stateNotes);

  useEffect(() => {

    dispatch(searchNotesAsync({ id: user._id, query: searchVal, star: star }))

  }, [dispatch, star, user._id, search, searchVal]);


  function handleSignOut(item) {
    console.log("clicked");
    if (item === "Sign out") {
      dispatch(resetUser());
    }
  }

  function handleStar() {
    setStar(!star);
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
                  <div className="md:flex">
                    <div className="ml-4 flex items-center md:ml-6">
                      {search && <input
                        type="text"
                        name="search"
                        id="search"
                        autoComplete='off'
                        value={searchVal}
                        onChange={(e) => {

                          console.log(e.target.value);
                          setSearchVal(e.target.value);
                        }}
                        className="block  rounded-md border-0 px-2 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-1 bg-gray-50"
                      />}
                      <button
                        type="button"
                        onClick={(e) => {
                          setSearch(!search);
                          setSearchVal("");
                        }}
                        className="relative rounded-full bg-purple-500 p-1 text-white hover:text-black nightwind-prevent mx-1"
                      >
                        <span className="absolute -inset-1.5" />
                        <MagnifyingGlassIcon className="h-6 w-6"></MagnifyingGlassIcon>
                      </button>
                      <button
                        type="button"
                        className={star ? "relative rounded-full bg-red-500 p-1 text-white hover:text-black nightwind-prevent mx-1" : "relative rounded-full bg-purple-500 p-1 text-white hover:text-black nightwind-prevent mx-1"}
                        onClick={handleStar}
                      >
                        <span className="absolute -inset-1.5" />
                        <StarIcon className="h-6 w-6 text-yellow-300 nightwind-prevent"></StarIcon>
                      </button>

                      <button
                        type="button"
                        onClick={handleClick}
                        className="relative rounded-full bg-purple-500 p-1 text-white hover:text-black nightwind-prevent mr-5 ml-1"
                      >
                        <span className="absolute -inset-1.5" />
                        {(mode) ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                      </button>
                      <Menu as="div" className="relative mx-1">
                        <div>
                          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none ">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.user_img} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name} >
                                {({ active }) => (
                                  <Link to={item.href} onClick={(e) => handleSignOut(item.name)}>

                                    <div

                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item.name}
                                    </div>

                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
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
