var express = require('express');
const {Set} = require("../models/set");
const {Card} = require("../models/set");
const {ObjectID} = require('mongodb');

var router = express.Router();

// CREATE New WITH multiple cards objects
router.post('/', async (req, res) => {
    console.log('POST');
    // const {name, term, definition} = req.body;
    const {name, term1, term2, term3, term4, term5, definition1, definition2, definition3, definition4, definition5} = req.body;
    const item = new Set({name});
    const card1 = new Card({term: term1, definition: definition1, star: false});
    const card2 = new Card({term: term2, definition: definition2, star: false});
    const card3 = new Card({term: term3, definition: definition3, star: false});
    const card4 = new Card({term: term4, definition: definition4, star: false});
    const card5 = new Card({term: term5, definition: definition5, star: false});
    item.cards.push(card1, card2, card3, card4, card5);

    // const card = new Card({term, definition, star: false});
    // item.cards.unshift(card);
    console.log(item);

    try {
        const doc = await item.save();
        res.send(doc);
    } catch (e) {
        res.status(400).send(e);
    }
});

//
// UPDATE with multiple cards objects
router.patch('/:id', async (req, res) => {
    console.log('UPDATE');

    const id = req.params.id;
    const {name, term1, term2, term3, term4, term5, definition1, definition2, definition3, definition4, definition5, star1, star2, star3, star4, star5} = req.body
    const cards = [
        {term: term1, definition: definition1, star: star1},
        {term: term2, definition: definition2, star: star2},
        {term: term3, definition: definition3, star: star3},
        {term: term4, definition: definition4, star: star4},
        {term: term5, definition: definition5, star: star5}
    ]
    try {
        const item = await Set.findOneAndUpdate({
            _id: id,
        }, {$set: {name: name, cards: cards}}, {new: true});

        if (!item) {
            return res.status(404).send();
        }
        res.send(item);
    } catch (e) {
        res.status(400).send(e);
    }
})

// READ
// Get All
router.get('/', async (req, res) => {
    console.log('GET ALL');
    try {
        // sort it by createdAt Desc order
        const items = await Set.find({}).sort({createdAt: -1});
        res.send(items);
    } catch (e) {
        res.status(400).send(e);
    }
});


// GET ONE
router.get(`/:id`, async (req, res) => {
    const id = req.params.id;

    try {
        const item = await Set.findById(id);
        // const item = await Set.findOne({ _id: id })
        if (!item) {
            return res.status(404).send()
        }
        res.send(item)
    } catch (e) {
        res.status(400).send()
    }
});

// GET SETS BY NAME PARTIALLY MATCH
router.get(`/search/:name`, async (req, res) => {
    const name = req.params.name;
    console.log('search', name);
    try {
        const items = await Set.find({ "name": { "$regex": name, "$options": "i" } });
        // const item = await Set.findOne({ _id: id })
        if (!items) {
            return res.status(404).send()
        }
        console.log('items', items);

        res.send(items);
    } catch (e) {
        res.status(400).send()
    }
})


// UPDATE
router.patch('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const item = await Set.findOneAndUpdate({
            _id: id,
        }, {$set: req.body}, {new: true});

        if (!item) {
            return res.status(404).send();
        }
        res.send(item);
    } catch (e) {
        res.status(400).send(e);
    }
})


// DELETE

router.delete(`/:id`, async (req, res) => {
    const id = req.params.id;

    try {
        const item = await Set.findOneAndRemove({
            _id: id,
        });
        if (!item) {
            return res.status(404).send()
        }
        res.status(200).send(item)
    } catch (e) {
        res.status(400).send()
    }
});


// UPDATE card star
// Add card object into set.cards array
router.patch('/:setId/cards/:cardId/star', async (req, res) => {
    const {setId, cardId} = req.params;

    try {
        const set = await Set.findById(setId);
        // console.log('set',set)

        if (!set) {
            return res.status(404).send();
        }
        set.cards.forEach(card => {
            if (ObjectID(card._id).toString() === cardId) {
                card.star = !card.star;
                console.log('card', card);
            }
            return card;
        });

        set.save();
        res.send(set);
    } catch (e) {
        res.status(400).send(e);
    }
});


// DELETE set card
// Remove a card by Id from set.cards
router.delete(`/:setId/cards/:cardId/delete`, async (req, res) => {
    const {setId, cardId} = req.params;
    let avgRating;
    try {
        const set = await Set.findById(setId);
        set.cards.id(cardId).remove();
        if (set.cards.length === 0) {
            avgRating = null;
        } else {
            avgRating = getAvgRating(set);
        }
        set.avgRating = avgRating;
        set.save();
        res.send(set);
    } catch (e) {
        res.status(400).send(e);
    }
});


module.exports = router;
