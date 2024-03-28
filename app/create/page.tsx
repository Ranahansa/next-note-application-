import Image from 'next/image';
import React from 'react'
import { MdOutlinePostAdd } from "react-icons/md";

const page = () => {
    return (
        <div className="max-w-5xl mx-auto pt-5">
            <span className="text-2xl sm:text-3xl font-extrabold flex ">
                Create new note
                <MdOutlinePostAdd className="ml-2" />
            </span>
            <form className="flex flex-col gap-9 text-black mb-10 ml-10">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="py-2 px-4 mt-10 w-3/4 rounded-md"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="py-1 px-4 w-3/4 rounded-md resize-none h-60 overflow-y-auto"
                ></textarea>
                <button className="bg-[#64a0aa] hover: bg-[#64a0aa]/90 text-white font-bold rounded-lg text-sm px-5 py-2 text-center inline-flex dark:focus:ring-[#64a0aa]/50 mt-4 sm:mt-0 w-1/6 justify-center">
                    Save Note
                </button>
            </form>
            <div className='absolute bottom-[-10.75rem] right-0 '>
                <Image
                    src="/note1.png"
                    alt="note"
                    width={600}
                    height={600}
                    className="object-contain"
                />
            </div>
        </div>
    );
}

export default page