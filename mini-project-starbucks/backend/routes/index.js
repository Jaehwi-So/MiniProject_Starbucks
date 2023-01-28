import express from 'express'
import { sendTokenToSMS, varifyToken } from '../controller/token.controller.js';
import { signUpUser } from '../controller/user.controller.js';
export const router = express.Router();

//로그인 처리
router.put('/tokens/phone', varifyToken);

router.post('/tokens/phone', sendTokenToSMS);

router.post('/user', signUpUser)



