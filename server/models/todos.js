import { Schema, model } from "mongoose";

const todoSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Changed user to userId
    title: { type: String, required: true },
    description: { type: String } // Keep this as optional or set required: true if needed
});

const Todo = model('Todo', todoSchema);

export default Todo;
