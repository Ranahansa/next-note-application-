"use client"; // This is a client component

// import necessary react components and icons
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoCaretBack } from "react-icons/io5";
import { MdEditCalendar } from "react-icons/md";


//Interface for Props received by the Page component
interface PageProps {
  params: {
    id: string;
  }
}

// Functional component for the Edit Note page
const Page : React.FC<PageProps> = ({ params }) => {
  //Access the router object for navigation
  const router = useRouter();

  //Extract note ID from the URL parameters
  const id = params.id

  //State variables for title, description, and error message
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  //Functional to handle changes in the title input field 
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Functional to handle changes in the description textarea
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  //Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      //Send a PUT request to the API endpoint to update the note
      const response = await fetch(`/api/note/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      if (response.ok) {
        console.log("Note updated successfully");
        setTitle("");
        setDescription("");
        // Redirect to the homepage after creating the note
        router.push("/");
      } else {
        console.error("Failed to update note");
      }
    } catch (error) {
      console.error("Failed to update note");
    }
  };

  return (
    <div>
      {/* Link to go back to the homepage */}
      <Link href="/">
        <button className="bg-[#64a0aa] hover:bg-[#64a0aa]/90 text-white font-bold rounded-lg text-sm px-3 py-2 text-center inline-flex dark:focus:ring-[#64a0aa]/50 mt-4 sm:mt-0 ml-20">
          <IoCaretBack className="w-4 h-4 mt-[0.15rem] text-black" /> GoBack
        </button>
      </Link>
      <div className="max-w-5xl mx-auto pt-5">
        {/* Container for the title and form */}
        <span className="text-2xl sm:text-3xl font-extrabold flex pt-6">
          Edit your note <MdEditCalendar className="ml-2" />
        </span>
        {/* Form for editing edited note title and description */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-9 text-black mb-10 ml-10"
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
            className="bg-[#64a0aa] hover:bg-[#64a0aa]/90 text-white font-bold rounded-lg text-sm px-5 py-2 text-center inline-flex dark:focus:ring-[#64a0aa]/50 mt-4 sm:mt-0 w-1/6 justify-center"
          >
            Save Note
          </button>
        </form>
        <div className="absolute bottom-[-15.75rem] right-1">
          <Image
            src="/edit.png"
            alt="note"
            width={520}
            height={520}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
