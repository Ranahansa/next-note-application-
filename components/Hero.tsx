import Link from 'next/link'
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import { ImFire } from 'react-icons/im';
import { MdAddTask } from 'react-icons/md'

const Hero = () => {
    return (
        <div className="w-full py-5 flex justify-center flex-col items-center pt-20">
            {/*Container for the  "Add Note Button"*/}
            <Link href="/create">
                <button
                    type="button"
                    className="bg-[#64a0aa] hover: bg-[#64a0aa]/90 text-white font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex dark:focus:ring-[#64a0aa]/50 mt-4 sm:mt-0"
                >
                    Add Note
                    <MdAddTask className="w-4 h-4 ml-2 text-black" />
                </button>
            </Link>
            <div className="w-3/4 bg-white py-1 px-10 rounded-2xl text-justify mt-7 shadow-xl">
                {/* Container for the task card */}
                <span className="font-bold mb-2 text-red-700">
                    <ImFire className="inline-block mb-1 mr-1" />
                    Title
                    <div className="flex justify-end items-center">
                        {/*Edit and Delete icons for the task*/}
                        <Link
                            href="/edit"
                            className="text-black hover:text-gray-700 cursor-pointer mr-2"
                        >
                            <FaEdit className="text-black hover:text-gray-700 cursor-pointer" />
                        </Link>
                        <Link
                            href="/delete"
                            className="text-black hover:text-gray-700 cursor-pointer"
                        >
                            <FaTrash className="text-black hover:text-gray-700 cursor-pointer" />
                        </Link>
                    </div>
                </span>
                <div className="flex justify-between items-center">
                    <div className="line-clamp-3 text-ellipsis overflow-hidden">
                        <GoDotFill className="text-black inline-block mr-1 " />
                        <span className="font-bold text-black text-balance">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos
                            esse voluptas illo explicabo ducimus nihil dolorem blanditiis
                            iusto, corporis illum tempora, modi non quisquam consequatur!
                            Quos reprehenderit neque doloribus maiores, odit eaque natus
                            nulla voluptatum a, rem, voluptas minima. Eligendi ab deleniti
                            voluptatibus iure perspiciatis esse aspernatur ratione
                            temporibus sapiente.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero