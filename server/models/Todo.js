const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
    {
        todo: {type: String, required: true },
        description: {type: String, required: true },
        priority: {type: String, required: true},
        email: {type: String, required: true},
    }, 
    {   
        collection: "todo"
    } 
)

const TodoModel = mongoose.model("TodoModel", TodoSchema );

module.exports = TodoModel
