const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
    {
        todo: {type: String, required: true },
        completed: {type: Boolean, default: false},
        priority: {type: String, required: true},
        email: {type: String, required: true},
    }, 
    {   
        collection: "todo"
    } 
)

const TodoModel = mongoose.model("TodoModel", TodoSchema );

module.exports = TodoModel
