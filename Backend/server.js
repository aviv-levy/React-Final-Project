const port = 4500;

require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())

const verifyToken = require('./verifyToken');

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


app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/userDetails', verifyToken, userDetailsRouter);
app.use('/cards', cardsRouter);

app.listen(port, () => {
    console.log('Server is running...');
})