const express = require("express");
const router = express.Router();
const CardModel = require('../Models/cardModel.js');
const UserModel = require('../Models/userLoginModel.js')
const verifyToken = require("../verifyToken.js");

// http://localhost:4500/cards/getAllCards
router.get('/getAllCards', async (req, res) => {
    try {
        const Cards = await CardModel.find({});
        if (Cards === null)
            res.status(404).send('not found any')

        res.status(200).json(Cards);

    } catch (err) {
        res.status(500).send(err.message);
    }
})

// http://localhost:4500/cards/addNewCard
router.post('/addNewCard', verifyToken, async (req, res) => {

    try {
        // 1**. Validate the request with the JOI model
        req.body.userId = req.id;
        const valRes = CardModel.validatePost(req.body); // synchronized method for running validations
        if (valRes.error) {
            return res.status(400).send(valRes.error);
        }

        // 2**. Create a Mongoose Model based on the JOI Model

        // Create a new card
        const card = new CardModel(req.body);
        await card.save();
        res.status(201).send('Card has been created')

    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
})


// http://localhost:4500/cards/getMyCards
router.get('/getMyCards', verifyToken, async (req, res) => {
    try {

        const Cards = await CardModel.find({ userId: req.id });
        if (Cards === null)
            res.status(404).send('not found any')

        res.status(200).json(Cards);

    } catch (err) {
        res.status(500).send(err.message);
    }
})

// http://localhost:4500/cards/getCard/:cardId
router.get('/getCard/:cardId', verifyToken, async (req, res) => {
    try {
        const cardId = req.params.cardId;
        const Card = await CardModel.findOne({ _id: cardId });
        if (Card === null)
            res.status(404).send('not found any')

        res.status(200).json(Card);

    } catch (err) {
        res.status(500).send(err.message);
    }
})

// http://localhost:4500/cards/getFav
router.get('/getFav', verifyToken, async (req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.id });

        const favCards = await CardModel.find({ _id: { $in: user.likedCards } })
        res.status(200).json(favCards);

    } catch (err) {
        res.status(500).send(err.message);
    }
})



module.exports = router;