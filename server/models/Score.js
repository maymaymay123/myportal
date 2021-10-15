const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema(
    {
        email: {type: String, required: true},
        highestscore:{ type: Number, default: 0},
    }, 
    {   
        collection: "score"
    }
)

const ScoreModel = mongoose.model("ScoreModel", ScoreSchema );

module.exports = ScoreModel
