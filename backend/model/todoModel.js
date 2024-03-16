import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    task:{
        type: String,
        required: true
    },
}, {timestamps: true})

export default mongoose.model('Todo', TodoSchema);

