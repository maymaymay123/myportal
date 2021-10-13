const mongoose = require('mongoose');

const TranslatorSchema = new mongoose.Schema(
    {
        original: {type: String, required: true },
        translated: {type: String, required: true },
        email: {type: String, required: true},
    },  
    {   
        collection: "translator"
    }
)

const TranslatorModel = mongoose.model("TranslatorModel", TranslatorSchema );

module.exports = TranslatorModel
