import express from 'express'
import { hello } from '../services/user.service.js';
export const router = express.Router();

//로그인 처리
router.get('/hello', hello);


