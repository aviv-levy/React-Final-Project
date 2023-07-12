const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const userDetailsModel = require('../Models/userLoginModel')
const UserRegisterModel = require("../Models/userRegisterModel");

//http://localhost:4500/userDetails
router.get('/', async (req, res) => {
    try {
        const user = await userDetailsModel.findOne({ _id: req.id });
        user.password = undefined;
        res.status(200).json(user);
    } catch (err) {
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
        user.password = undefined;
        res.status(201).json(user);

    } catch (err) {
        res.status(500).send(err.message);
    }
})


// http://localhost:4500/userDetails/updateUser/:userId
router.put('/updateUser', async (req, res) => {
    try {
        const userId = req.body._id;
        delete req.body.__v;
        delete req.body._id;
        if (req.body.password === undefined)
            req.body.password = 'Aa!12345';

        const valRes = UserRegisterModel.validatePost(req.body);
        if (valRes.error)
            return res.status(400).send(valRes.error);

        if (req.body.password === 'Aa12345') {
            const user = await userDetailsModel.findOne({ _id: req.id });
            req.body.password = user.password;
        }
        else
            req.body.password = await bcrypt.hash(req.body.password, 10)

        await UserRegisterModel.updateOne({ _id: userId }, { $set: req.body })
        let user = await userDetailsModel.findOne({ _id: req.id });
        user.password = undefined;
        res.status(201).json(user);

    } catch (err) {
        res.status(500).send(err.message);
    }
})





module.exports = router;