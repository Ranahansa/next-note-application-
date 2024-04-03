"use client"; // This is a client component

//import necessary react components and icons
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { ImFire } from "react-icons/im";
import { MdAddTask } from "react-icons/md";
import Link from "next/link";

// Define the Note interface
interface Note {
    _id: string;
    title: string;
    description: string;
}

//Functional component for the Hero section
const Hero = () => {
    // State variables for notes, loading state, and error message
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        //Fetch notes from the API
        const fetchNotes = async () => {
            try {
                const response = await fetch("/api/note");
                if (!response.ok) {
                    throw new Error("Failed to fetch notes");
                }
                const data = await response.json();
                setNotes(data);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch notes");
            } finally {
                setIsLoading(false);
            }
        };
        fetchNotes();
    }, []); // Empty dependency array to run the effect only once

    //Function to delete a note
    const deleteNote = async (noteId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this note?");
        if (confirmed) {
            try {
                const response = await fetch(`/api/note/${noteId}`, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    throw new Error("Failed to delete note");
                }
                setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
                alert("Note deleted successfully");
            } catch (error) {
                console.error(error);
                setError("Failed to delete note");
            }
        } else {
            alert("Note not deleted");
        }

    };

    return (
        <div>
            {/* Display error message if any */}
            {error && <p className="text-red-500 p-3">{error}</p>}
            <div className="w-full py-5 flex justify-center flex-col items-center pt-20">

                {/*Link to create a new note*/}
                <Link href="/create">
                    <button
                        type="button"
                        className="bg-[#64a0aa] hover: bg-[#64a0aa]/90 text-white font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex dark:focus:ring-[#64a0aa]/50 mt-4 sm:mt-0"
                    >
                        Add Note
                        <MdAddTask className="w-4 h-4 ml-2 text-black" />
                    </button>
                </Link>

                {/* Display loading message or notes */}
                {isLoading ? (
                    <p className="text-red-500 p-3">Loading...</p>
                ) : (
                    notes.map((note) => (
                        <div
                            key={note._id}
                            className="w-3/4 bg-white py-1 px-10 rounded-2xl text-justify mt-7 shadow-xl"
                        >
                            <span className="font-bold mb-2 text-red-700">
                                <ImFire className="inline-block mb-1 mr-1" />
                                {note.title}
                                <div className="flex justify-end items-center">
                                    
                                    {/*Link to edit and delete a note*/}

                                    <Link
                                        href={`/edit/${note._id}`}
                                        className="text-black hover:text-gray-700 cursor-pointer mr-2"
                                    >
                                        <FaEdit className="text-black hover:text-gray-700 cursor-pointer" />
                                    </Link>
                                    <button
                                        onClick={() => deleteNote(note._id)}
                                        className="text-black hover:text-gray-700 cursor-pointer"
                                    >
                                        <FaTrash className="text-black hover:text-gray-700 cursor-pointer" />
                                    </button>
                                </div>
                            </span>
                            <div className="flex justify-between items-center">
                                <div className="line-clamp-3 text-ellipsis overflow-hidden">
                                    <GoDotFill className="text-black inline-block mr-1 " />
                                    <span className="font-bold text-black text-balance">
                                        {note.description}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Hero;
