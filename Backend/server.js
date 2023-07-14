const port = 4500;

require('dotenv').config();
const fs = require('fs')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())

const UserModel = require('./Models/userRegisterModel')
const CardModel = require('./Models/cardModel')

const verifyToken = require('./verifyToken');
const verifyAdmin = require('./verifyAdmin');

const adminRouter = require('./Routers/adminRouter.js')
const loginRouter = require('./Routers/loginRouter.js')
const registerRouter = require('./Routers/registerRouter.js')
const userDetailsRouter = require('./Routers/userDetailsRouter.js')
const cardsRouter = require('./Routers/cardsRouter.js')


async function main() {
    await mongoose
        .connect(process.env.DATABASE)
        .then(() => {
            console.log("conected to Mongo");
        })
        .catch(() => {
            console.log("something in mongo went wrong");
        });
}

main();

app.use('/admin', verifyToken, verifyAdmin, adminRouter)
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/userDetails', verifyToken, userDetailsRouter);
app.use('/cards', cardsRouter);


// http://localhost:4500/initilaize
// Initilaize Database with data
app.get('/initilaize', async (req, res) => {
    try {
        let myData = JSON.parse(fs.readFileSync("./initalizeData.json").toString());

        // Insert users
        myData.users.forEach(async (user) => {
            user.password = await bcrypt.hash(user.password, 10)
            const newUser = new UserModel(user);
            await newUser.save();
        });

        // Insert cards
        myData.cards.forEach(async (card) => {
            const newCard = new CardModel(card);
            await newCard.save();
        });

        res.status(200).send('Data initialized');
    } catch (err) {
        res.status(500).send(err.message);
    }
})

app.listen(port, () => {
    console.log('Server is running...');
})
