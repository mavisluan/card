const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
        term: {
            type: String,
            required: [true, "Term is required."],
            minlength: [1, "Term must be more than 1 characters"]
        },
        star: {
            type: Boolean,
            required: [ true, "Star is required"],
        },
        definition: {
            type: String,
            required: [true, "Definition is required."],
            minlength: [3, "Definition must be more than 3 characters"]
        },
    },
    {timestamps: true}
);

const SetSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [ true, "Name is required"],
            minlength: [3, "Name must be more than 2 characters"]
        },
        cards: [CardSchema],
    },
    {timestamps: true}
);

// Create collection and add schema
const Card = mongoose.model('Card', CardSchema);
// Create collection and add schema
const Set = mongoose.model('Set', SetSchema);
module.exports = { Card, Set };
