import { connectDB } from "@/lib/db";
import Note from "@/models/Note";
import { NextRequest, NextResponse } from "next/server";


connectDB();

export async function GET(request: NextRequest) {
    try {
        const notes = await Note.find({});
        return NextResponse.json(notes);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
    }
}


export async function POST(request: NextRequest) {

    try{
        const {title, description} = await request.json();
        const note = new Note({
            title,
            description
        });
        await note.save();
        return NextResponse.json({note}, {status: 201});
    }
    catch(error){
        return NextResponse.json({error : "Failed to create note"}, {status: 500});
    }
}




