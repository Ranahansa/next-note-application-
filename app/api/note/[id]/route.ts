import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";


connectDB();

export async function PUT(request: NextRequest) {
    try {
        const { pathname } = new URL(request.url);
        const paths = pathname.split("/");
        const id = paths[paths.length - 1];

        if (!id) {
            return NextResponse.json(
                { error: "Note ID is required" },
                { status: 400 }
            );
        }

        const { title, description } = await request.json();
        const note = await Note.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );

        if (!note) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        return NextResponse.json(note);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const { pathname } = new URL(request.url);
        const paths = pathname.split("/");
        const id = paths[paths.length - 1];

        if (!id) {
            return NextResponse.json(
                { error: "Note ID is required" },
                { status: 400 }
            );
        }

        const deletedNote = await Note.findByIdAndDelete(id);

        if (!deletedNote) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Note deleted successfully" });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
