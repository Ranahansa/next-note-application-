"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoCaretBack } from "react-icons/io5";
import { MdEditCalendar } from "react-icons/md";

const page = () => {
    const [id, setId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [router, setRouter] = useState<any>(null);

    useEffect(() => {
        setRouter(useRouter());
    }, []);

    useEffect(() => {
        if (router && Array.isArray(router.query.id)) {
            setId(router.query.id[0] ?? "");
        } else if (router && router.query.id) {
            setId(router.query.id ?? "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router?.query.id]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
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
            <Link href="/">
                <button className="bg-[#64a0aa] hover: bg-[#64a0aa]/90 text-white font-bold rounded-lg text-sm px-3 py-2 text-center inline-flex dark:focus:ring-[#64a0aa]/50 mt-4 sm:mt-0 ml-20 ">
                    <IoCaretBack className="w-4 h-4 mt-[0.15rem] text-black" />
                    GoBack
                </button>
            </Link>
            <div className="max-w-5xl mx-auto pt-5">
                {/* Container for the title and form */}
                <span className="text-2xl sm:text-3xl font-extrabold flex pt-6">
                    Edit your note <MdEditCalendar className="ml-2" />
                </span>
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
                        className="bg-[#64a0aa] hover: bg-[#64a0aa]/90 text-white font-bold rounded-lg text-sm px-5 py-2 text-center inline-flex dark:focus:ring-[#64a0aa]/50 mt-4 sm:mt-0 w-1/6 justify-center"
                    >
                        Save Note
                    </button>
                </form>
                <div className="absolute bottom-[-15.75rem] right-1 ">
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

export default page;
