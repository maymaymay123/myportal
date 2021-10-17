const mongoose = require('mongoose');

const TranslatorSchema = new mongoose.Schema(
    {   
        from: {type: String },
        to: {type: String, required: true},
        text: {type: String, required: true },
        translated: {type: String },
        email: {type: String, required: true},
    },  
    {   
        collection: "translator"
    }
)

const TranslatorModel = mongoose.model("TranslatorModel", TranslatorSchema );

module.exports = TranslatorModel
