import express from 'express'
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import {swaggerOptions} from './swagger/config.js'
import cors from 'cors'
import mongoose from 'mongoose';
import { Starbucks } from './models/starbucks.model.js';
import { User } from './models/user.model.js';
import { Token } from './models/token.mode.js';

const app = express();


app.use(express.json());    //body의 JSON 파싱
/* cors set */
app.use(cors({
    origin: '*' //허용할 origin
}))

/* swagger setup */
const swaggerSpec = swaggerJsDoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
