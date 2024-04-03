"use client";// This is a client component

//import necessary react components and icons
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoCaretBack } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";

//Functional component for the Create Note page
const page = () => {
  //State variables for title, description, and error message
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const router = useRouter(); //Access the router object for navigation

  //Function to handle title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  //Function to handle description changes
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  //Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //send a POST request to the API endpoint to create a note 
      const response = await fetch("/api/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      if (response.ok) {
        console.log("Note created successfully");
        setTitle("");
        setDescription("");
        alert("Note created successfully");
        
        //Redirect to the homepage after creating the note
        router.push("/");
      } else {
        console.error("Failed to create note");
      }
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="sm:px-4">
      {/* Link to go back to the homepage */}
      <Link href="/">
        <button className="bg-[#64a0aa] hover: bg-[#64a0aa]/90 text-white font-bold rounded-lg text-sm px-3 py-2 text-center inline-flex dark:focus:ring-[#64a0aa]/50 mt-4 sm:mt-0 ml-20 sm:ml-0">
          <IoCaretBack className="w-4 h-4 mt-[0.15rem] text-black" />
          GoBack
        </button>
      </Link>
      <div className="max-w-5xl mx-auto pt-5">
        {/* Container for the title and form */}
        <span className="text-2xl sm:text-xl font-extrabold flex pt-6">
          Create new note
          <MdOutlinePostAdd className="ml-2" />
        </span>

        {/* Form to create a new note */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-9 text-black mb-10 ml-4 sm:ml-0"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            className="py-2 px-4 mt-10 w-3/4 rounded-md"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={handleDescriptionChange}
            className="py-1 px-4 w-3/4 rounded-md resize-none h-60 overflow-y-auto"
          ></textarea>

          <button
            type="submit"
            className="bg-[#64a0aa] hover: bg-[#64a0aa]/90 text-white font-bold rounded-lg text-sm px-5 py-2 text-center inline-flex dark:focus:ring-[#64a0aa]/50 mt-4 sm:mt-0 w-1/6 justify-center"
          >
            Save Note
          </button>
        </form>
        <div className="absolute bottom-[-12.75rem] right-0 ">
          <Image
            src="/note1.png"
            alt="note"
            width={600}
            height={600}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default page;
