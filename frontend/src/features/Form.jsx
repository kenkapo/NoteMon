import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./rich-text.css";
import { stateloggedInUser } from "../Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAsync, deleteNoteAsync, getAllNotesAsync, stateNotes, updateNoteAsync ,sendNotesAsync} from "../Slices/NotesSlice";
export const AddForm = (props) => {
  const date = new Date();
  const getNotes = useSelector(stateNotes);
  const dispatch = useDispatch();
  const user = useSelector(stateloggedInUser);
  const [value, setValue] = useState("");
  const isEditorEmpty = !value.trim();

  function handleReset() {
    props.formFunc();
    reset();
    setValue("");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  return (
    <div className="flex items-center justify-center p-12"
      onSubmit={handleSubmit((data) => {
        const note = { ...data };
        note.content = value;
        note.date = ("" + date).substring(4, 15);
        note.starred = false;
        note.user_id = user._id;
        dispatch(createNoteAsync(note));
        handleReset();
      })}>
      <div className="mx-auto w-full max-w-[550px]">
        <form autocomplete="off">
          <div className='rounded-xl bg-white bg-opacity-80'>
            <div className="mb-5">
              <input
                type="text"
                {...register("title", {
                  required: "Title is required",
                })}
                id="Title"
                placeholder="Title"
                className="w-full  rounded-xl  bg-white pt-4 px-6 text-xl font-medium text-black outline-none focus:border-[#6A64F1] bg-opacity-0"
              />
              {errors.title && (
                <p className="text-red-500 text-xs">
                  {errors.title.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <input
                type="text"
                {...register("category", {
                  required: "Category is required",
                })}
                id="Category"
                placeholder="Category"
                className="w-full bg-white py-1 px-6 text-sm font-medium text-black outline-none focus:border-[#6A64F1] bg-opacity-0"
              />
              {errors.category && (
                <p className="text-red-500 text-xs">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="mb-5 container">

              <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                className='w-full pb-3 px-3 quill-editor '
                placeholder='Content'
              />
            </div>
          </div>
          <div className='flex flex-col  md:flex-row '>
            <button type="submit" className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none " disabled={isEditorEmpty}>
              Add
            </button>
            <button className="hover:shadow-form rounded-md bg-gray-500 py-3 px-8 text-base font-semibold text-white outline-none mx-5 md:my-0 my-3" onClick={props.formFunc}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export const SeeForm = (props) => {
  const getNotes = useSelector(stateNotes);
  const note = getNotes[props.index];

  try {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form>
            <div className='rounded-xl bg-white bg-opacity-80'>
              <div className="mb-5">

                <h1 className=' px-6 text-center'>{note.title}</h1>
              </div>
              <div className="mb-5">

                <h3 className='text-green-500 nightwind-prevent px-6 text-center'>{note.category}</h3>

              </div>
              <div className="mb-5">
                <ReactQuill theme="bubble" value={note.content} readOnly={true} className="w-full resize-none rounded-md   px-3 quill-editor" />
              </div>
            </div>
            <div>
              <button className="hover:shadow-form rounded-md gradient4 py-3 px-8 text-base font-semibold text-white outline-none" onClick={props.formFunc}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  catch {

  }
}
export const EditForm = (props) => {

  const getNotes = useSelector(stateNotes);
  const note = getNotes[props.index];
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const isEditorEmpty = !content.trim();
  //console.log("edit index", props.index);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  useEffect(() => {
    setValue("title", note.title);
    setValue("category", note.category);
    setContent(note.content);
  }, [setValue, setContent, props.index])

  function handleReset() {
    props.formFunc();
    reset();
    setContent("");
  }


  try {

    return (
      <div className="flex items-center justify-center p-12" onSubmit={handleSubmit((data) => {
        const updateNote = { ...note, ...data };
        updateNote.content = content;
        console.log(updateNote);
        dispatch(updateNoteAsync(updateNote));
        handleReset();
      })}>
        <div className="mx-auto w-full max-w-[550px]">
          <form >
            <div className='rounded-xl bg-white bg-opacity-80'>
              <div className="mb-5">
                <input
                  type="text"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  id="Title"
                  placeholder="Title"
                  className="w-full  rounded-xl bg-white pt-4 px-6 text-xl font-medium text-black outline-none focus:border-[#6A64F1] bg-opacity-0"
                />
                {errors.title && (
                  <p className="text-red-500 text-xs">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  {...register("category", {
                    required: "Category is required",
                  })}
                  id="Category"
                  placeholder="Category"
                  className="w-full bg-white py-1 px-6 text-sm font-medium text-black outline-none focus:border-[#6A64F1] bg-opacity-0"
                />
                {errors.category && (
                  <p className="text-red-500 text-xs">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div className="mb-5 container">

                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  className='w-full pb-3 px-3 '
                  placeholder='Content'
                />
              </div>
            </div>
            <div className='flex flex-col  md:flex-row '>
              <button type="submit" className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none " disabled={isEditorEmpty}>
                Edit
              </button>
              <button className="hover:shadow-form rounded-md bg-gray-500 py-3 px-8 text-base font-semibold text-white outline-none mx-5 md:my-0 my-3" onClick={props.formFunc}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  catch {

  }
}


export const SendForm = (props) => {
  const getNotes = useSelector(stateNotes);
  const note = getNotes[props.index];
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  function handleReset() {
    props.formFunc();
    reset();
  }

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px]" onSubmit={handleSubmit((data) => {
        const sendNote = { title: note.title, category: note.category, content: note.content, email: data.email , id:note._id};
        console.log(sendNote);
        dispatch(sendNotesAsync(sendNote));
        handleReset();
      })}>
        <form>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-3 block text-xl font-medium text-blue-500"
            >
              Enter a valid Email Address
            </label>
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: 'email not valid',
                },
              })}
              id="email"
              placeholder="example@domain.com"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm font-medium">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className='flex flex-col  md:flex-row '>
            <button type="submit" className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none">
              Send
            </button>
            <button className="hover:shadow-form rounded-md bg-gray-500 py-3 px-8 text-base font-semibold text-white outline-none mx-5 md:my-0 my-3" onClick={props.formFunc}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}
