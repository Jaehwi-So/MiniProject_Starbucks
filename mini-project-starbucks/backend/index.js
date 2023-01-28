import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import { Starbucks } from './models/starbucks.model.js';
import { User } from './models/user.model.js';
import { Token } from './models/token.model.js';
import { router } from './routes/index.js'

const app = express();


app.use(express.json());    //body의 JSON 파싱
/* cors set */
app.use(cors({
    origin: '*' //허용할 origin
}))

/* swagger setup */


/* end of swagger setup */


app.get('/stocks', async (req, res) => {
    const a = await Starbucks.find();
    const b = await Token.find();
    const stocks = await User.find();
    res.send(stocks);
})


//MongoDB connection
mongoose.connect('mongodb://localhost:27017/mydocker03'); //docker-compose로 연결되어 있으므로 네임리졸루션사용가능


app.listen(process.env.SERVER_PORT || 3001, () => {
    console.log(`Example app listening on port! ${3001}`);
})

app.use('/', router);
