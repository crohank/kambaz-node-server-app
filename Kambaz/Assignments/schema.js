import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
    {
        title: String,
        course: String,
        releaseDate: Date,
        dueDate: Date,
        points: Number,
        modules: String,
        description: String,
    },
    { collection: "assignments" }
);

export default assignmentSchema;
