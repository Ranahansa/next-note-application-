import { connectDB } from "@/lib/db"; // Import the connectDB function
import Note from "@/models/Note"; // Import the Note model
import { NextRequest, NextResponse } from "next/server"; // Import the NextRequest and NextResponse types

// Establish a connection to the database
connectDB();

// Api route handler for PUT requests (update a note)
export async function PUT(request: NextRequest) {
    try {
        // Extract the note ID from the request URL
        const { pathname } = new URL(request.url);
        const paths = pathname.split("/");
        const id = paths[paths.length - 1];

        // check if note ID is provided
        if (!id) {
            return NextResponse.json(
                { error: "Note ID is required" },
                { status: 400 } // bad request error 
            );
        }

        // Parse the incomming JSON request body to get updated titile and description
        const { title, description } = await request.json();

        // Find the note by ID and update its title and description
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, description },
            { new: true } // return the updated note
        );
        
        // check if the note was found and updated
        if (!updatedNote) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        return NextResponse.json(updatedNote);
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


// Api route handler for DELETE requests (delete a notes)
export async function DELETE(request: NextRequest) {
    try {
        // Extract the note ID from the request URL

        const { pathname } = new URL(request.url);
        const paths = pathname.split("/");
        const id = paths[paths.length - 1];

        // check if note ID is provided
        if (!id) {
            return NextResponse.json(
                { error: "Note ID is required" },
                { status: 400 }
            );
        }

        // Find the note by ID and delete it using findBYIdAndDelete method
        const deletedNote = await Note.findByIdAndDelete(id);

        // check if the note was found and deleted
        if (!deletedNote) {
            return NextResponse.json({ error: "Note not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Note deleted successfully" });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
