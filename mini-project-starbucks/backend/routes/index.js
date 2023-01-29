import express from 'express'
import { getMenuList } from '../controller/starbucks.controller.js';
import { sendTokenToSMS, varifyToken } from '../controller/tokens.controller.js';
import { getUsers, signUpUser } from '../controller/users.controller.js';
export const router = express.Router();

router.put('/tokens/phone', varifyToken);

router.post('/tokens/phone', sendTokenToSMS);

router.post('/user', signUpUser)

router.get('/user', getUsers)

router.get('/starbucks', getMenuList)

