import { Schema, model } from "mongoose";

//create a schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});
//create model

const User = model ('User', userSchema);

//export model

export default User;