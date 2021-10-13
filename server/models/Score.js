const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema(
    {
        email: {type: String, required: true},
        score:{ type: Number, required: true},
    }, 
    {   
        collection: "score"
    }
)

const ScoreModel = mongoose.model("ScoreModel", ScoreSchema );

module.exports = ScoreModel
