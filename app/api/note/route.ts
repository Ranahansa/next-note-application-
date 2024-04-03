import { connectDB } from "@/lib/db";// Import the connectDB function
import Note from "@/models/Note"; // Import the Note model
import { NextRequest, NextResponse } from "next/server";// Import the NextRequest and NextResponse types

//Establish a connection to the database
connectDB();

// Api route handler for GET requests (fetch all notes)
export async function GET(request: NextRequest) {
    try {
        // Find all notes from the database using the Note model 
        const notes = await Note.find({});

        // Return the notes as a JSON response
        return NextResponse.json(notes);
    } catch (error) {
        console.error(error); // Log the error to the console

        // Return an error response if the notes could not be fetched
        return NextResponse.json(
            { error: "Failed to fetch notes" },
            { status: 500 }
        );
    }
}

// Api route handler for POST requests (create a new note)
export async function POST(request: NextRequest) {
    try {
        // Parse the incoming JSON request body to get title and description
        const { title, description } = await request.json();

        // Create a new note object with the parsed data
        const note = new Note({
            title,
            description,
        });
        // save the new note to the database using the Note model
        await note.save();

        
        return NextResponse.json({ data: note }, { status: 201 }); // Change this line
    } catch (error) {
        // Return an error response if the note could not be created
        return NextResponse.json(
            { error: "Failed to create note" },
            { status: 500 }
        );
    }
}
