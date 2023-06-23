const express = require("express");
const router = express.Router();
const userDetailsModel = require('../Models/userLoginModel')

//http://localhost:4500/userDetails
router.get('/', async (req, res) => {
    try {
        const user = await userDetailsModel.findOne({ _id: req.id });
        user.password = undefined;
        user._id = null;
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
})


// http://localhost:4500/userDetails/likeCard/:cardId
router.put('/likeCard/:cardId', async (req, res) => {
    try {
        const cardId = req.params.cardId;
        let user = await userDetailsModel.findOne({ _id: req.id });
        let flag = true;
        user.likedCards.forEach(async (card) => {
            if (card === cardId) {
                flag = false;
                await userDetailsModel.updateOne({ _id: req.id }, { $pull: { likedCards: cardId } })
                return;
            }
        });

        if (flag)
            await userDetailsModel.updateOne({ _id: req.id }, { $push: { likedCards: cardId } })

        user = await userDetailsModel.findOne({ _id: req.id });
        res.status(200).json(user);

    } catch (err) {
        console.log(err.message);
        res.status(500).send(err.message);
    }
})





module.exports = router;