import React, { useEffect, useState } from "react";
import {
  StarIcon,
  PencilIcon,
  EyeIcon,
  TrashIcon,
  ArrowDownIcon,
  ArrowUpIcon
} from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { AddForm, SeeForm, EditForm, SendForm } from "./Form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { stateloggedInUser } from "../Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import notesReducer, { createNoteAsync, deleteNoteAsync, getAllNotesAsync, stateNotes, updateNoteAsync } from "../Slices/NotesSlice";
import pagesFunc from "../constants/functions";
import DeleteModal from "./DeleteModal";
import { convert } from "html-to-text";

const Home = () => {
  const date = new Date();
  const [currPage, setCurrPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [addForm, setAddForm] = useState(false);
  const [seeForm, setSeeForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [sendForm, setSendForm] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [rev, setRev] = useState(false);

  const getNotes = useSelector(stateNotes);
  const dispatch = useDispatch();
  const user = useSelector(stateloggedInUser);

  const [seeIndex, setSeeIndex] = useState(-1);
  const [editIndex, setEditIndex] = useState(-1);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [sendIndex, setSendIndex] = useState(-1);

  const length = getNotes.length;

  function handleStar(e, index) {
    setSeeForm(false);
    setEditForm(false);
    setAddForm(false);
    const obj = { ...getNotes[index], starred: !getNotes[index].starred };
    console.log(index)
    dispatch(updateNoteAsync(obj));
  }

  function handleDelete(index) {
    console.log(index);
    if (getNotes.length % 5 === 1) {
      setCurrPage(Math.max(1, currPage - 1));
    }
    dispatch(deleteNoteAsync(getNotes[index]._id));
  }

  function handleAddForm() {
    setSeeIndex(-1);
    setDeleteIndex(-1);
    setEditIndex(-1);
    setSendIndex(-1);
    setSeeForm(false);
    setEditForm(false);
    setAddForm(!addForm);
  }

  function handleSeeForm(e, index, bool) {
    setDeleteIndex(-1);
    setEditIndex(-1);
    setSendIndex(-1);
    setSeeIndex(index);
    setSeeForm(bool);
    setEditForm(false);
    setAddForm(false);
    setSendForm(false);
  }

  function handleSendForm(e, index, bool) {
    setSeeIndex(-1);
    setDeleteIndex(-1);
    setEditIndex(-1);
    setSendIndex(index);
    setSendForm(bool);
    setSeeForm(false);
    setEditForm(false);
    setAddForm(false);
  }

  function handleEditForm(e, index, bool) {
    setSeeIndex(-1);
    setDeleteIndex(-1);
    setSendIndex(-1);
    setEditIndex(index);
    setSeeForm(false);
    setEditForm(bool);
    setAddForm(false);
  }

  function handleSort() {
    setRev(!rev);
  }

  function increment() {
    setSeeForm(false);
    setEditForm(false);
    setCurrPage(Math.min(currPage + 1, totalPage));
  }
  function decrement() {
    setSeeForm(false);
    setEditForm(false);
    setCurrPage(Math.max(currPage - 1, 1));
  }

  function DeleteFunc(e, index) {
    console.log(index);
    setSeeForm(false);
    setEditForm(false);
    setDeleteIndex(index);
    setDeleteModal(true);
  }

  function htmltotext(note) {
    const options = {
      wordwrap: 500,
      // ...
    };
    const html = note;
    const text = convert(html, options);
    return text;
  }

  function shareOnWhatsApp(e, index) {
    const whatsappNote = getNotes[index];
    const content = htmltotext(whatsappNote.content);
    const noteContent = `Title-> *${whatsappNote.title}* \nCategory-> *${whatsappNote.category}* \nContent-> \n${content}`;
    const whatsappLink = `whatsapp://send?text=${encodeURIComponent(noteContent)}`;
    window.location.href = whatsappLink;
  }

  useEffect(() => {
    setSeeForm(false);
    setEditForm(false);
    setTotalPage(pagesFunc(getNotes.length));
    if (length !== getNotes.length) { setCurrPage(1); }
  }, [getNotes, length])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();


  function listComp(note, index) {
    return (
      <li>
        <article
          tabIndex={0}
          className="cursor-pointer border rounded-md p-3 bg-gray-50 flex text-gray-700 mb-2 hover:border-green-500 focus:outline-none focus:border-green-500"
        >

          <div className="flex-1">
            <header className="mb-1 font-bold text-lg" onClick={(e)=>handleSeeForm(e,index,true)}>
              <span className="text-cyan-600 ">{(index + 1) + ". "}</span>{note.title.substring(0, 21)}{note.title.length > 21 ? "..." : ""}
            </header>
            <footer className="text-purple-500 mt-2 text-sm flex nightwind-prevent">
              {note.date}
              <button onClick={(e) => handleStar(e, index)}>
                {!note.starred ? (
                  <StarIcon className="h-5 w-6 ml-2 text-yellow-600 nightwind-prevent"></StarIcon>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-5 ml-2 text-yellow-300 nightwind-prevent"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
              <button onClick={(e) => handleSeeForm(e, index, true)}>
                <EyeIcon className="h-5 w-6 ml-2 text-green-600 nightwind-prevent"></EyeIcon>
              </button>
              <button onClick={(e) => handleEditForm(e, index, true)}>
                <PencilIcon className="h-5 w-6 ml-2 text-blue-600 nightwind-prevent"></PencilIcon>
              </button>
              <button onClick={(e) => DeleteFunc(e, index)}>
                <TrashIcon className="h-5 w-6 ml-2 text-red-600 nightwind-prevent"></TrashIcon>
              </button>
              <button onClick={(e) => handleSendForm(e, index, true)}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png" alt="gmail logo" className="h-4 w-5 ml-2 text-red-600 nightwind-prevent" />
              </button>
              <button onClick={(e) => shareOnWhatsApp(e, index)}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png" alt="whatsapp logo" className="h-5 w-5 ml-3 text-red-600 nightwind-prevent" />
              </button>
            </footer>
          </div>
        </article>
      </li>);
  }

  return (
    <div className="h-full w-full flex overflow-hidden antialiased text-gray-800 bg-white min-h-screen">
      <div className="flex-1 flex flex-col">
        <header
          aria-label="page caption"
          className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center"
        >
          <h1 id="page-caption" className="font-normal text-2xl">
            Welcome{" "}🙏{" "}
            <span className="font-semibold">
              <i>{user.full_name}</i>
            </span>
          </h1>
        </header>
        {/* main content */}
        <main className="flex-grow flex min-h-0 border-t">
          {/* section update to tickets */}
          {deleteModal && <DeleteModal index={deleteIndex} delfunc={handleDelete} showModal={setDeleteModal} />}
          <section className="flex flex-col p-4 w-full max-w-sm flex-none bg-gray-100 min-h-0 overflow-auto">
            <h1 className="font-semibold mb-3">Your Notes</h1>
            <button onClick={handleSort}>
              <h4 className="font-semibold mb-3 flex">{!rev ? "Oldest to Newest" : "Newest to Oldest"}{!rev ? <ArrowDownIcon className="h-5 w-6 ml-2" /> : <ArrowUpIcon className="h-5 w-6 ml-2" />}</h4>

            </button>
            <ul>
              {!rev ?
                getNotes.slice((currPage - 1) * 5, Math.min(getNotes.length, currPage * 5)).map((note, index) => {
                  let newIndex = (currPage - 1) * 5 + index;
                  return listComp(note, newIndex);
                })
                : getNotes.slice((currPage - 1) * 5, Math.min(getNotes.length, currPage * 5)).map((note, index) => {
                  let newIndex = getNotes.length - (currPage - 1) * 5 - index - 1;
                  let newNote = getNotes[newIndex];
                  return listComp(newNote, newIndex);
                })
              }
            </ul>
            <div class='flex items-center justify-center mt-6'>
              <div class="flex justify-center items-center space-x-4">
                <div class="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm" onClick={decrement}>{"<"}</div>
                <div class="text-slate-500">{currPage} / {totalPage}</div>
                <div class="border rounded-md bg-gray-100 px-2 py-1 text-3xl leading-6 text-slate-400 transition hover:bg-gray-200 hover:text-slate-500 cursor-pointer shadow-sm" onClick={increment}>{">"}</div>
              </div>
            </div>
          </section>
          {/* section content */}
          <section
            aria-label="main content"
            className="flex min-h-0 flex-col flex-auto border-l"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1527345931282-806d3b11967f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80)",
            }}
          >
            {sendForm ? <SendForm index={sendIndex} formFunc={handleSendForm} /> : (editForm ? <EditForm formFunc={handleEditForm} index={editIndex} /> : (seeForm ? <SeeForm formFunc={handleSeeForm} index={seeIndex} /> : (addForm ? <AddForm formFunc={handleAddForm} /> : (
              <header className=" border-t flex items-center justify-center py-1 px-4">
                <div className="flex">
                  <h2
                    id="content-caption"
                    className="font-medium text-2xl select-none"
                  >
                    <button
                      className="group relative h-16 w-80 rounded-2xl gradient3 text-lg font-bold text-white my-2 flex-auto"
                      onClick={handleAddForm}
                    >
                      Add a New Note
                      <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30 flex" />
                    </button>
                  </h2>
                </div>
              </header>
            ))))}

            {/* content footer, currently hidden */}
            <footer
              aria-label="content footer"
              className="flex p-3 bg-white border-t hidden"
            >
              footer
            </footer>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
