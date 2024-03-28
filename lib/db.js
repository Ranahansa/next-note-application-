import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected !");
        });
    } catch (error) {
        console.error(error);
    }
}
