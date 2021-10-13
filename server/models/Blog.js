const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema(
    {
        title: {type: String, required: true },
        post: {type: String, required: true },
        date : { type : Date, default: Date.now },
        img: {type: String, data: Buffer},
        email: {type: String, required: true},
    }, 
    {   
        collection: "blog"
    }
)

const BlogModel = mongoose.model("BlogModel", BlogSchema );

module.exports = BlogModel
