import coolsms from 'coolsms-node-sdk';
import dotenv from 'dotenv'
import { Token } from '../models/token.model.js';
dotenv.config();

const API_KEY = process.env.SMS_KEY
const API_SECRET = process.env.SMS_SECRET
const SENDER_PHONE = process.env.SMS_SENDER

export const checkPhoneLength = (phone) => {
    if(phone.length != 10 && phone.length != 11){
        return false;
    } else{
        return true;
    }
}


export const createToken = (length) => {
    if(length === undefined){
        console.log('Error occured');
        return null;
    } else if(length <= 0) {
        console.log('Error occured');
        return null;
    }
    const token = String(Math.floor(Math.random() * 10 ** length)).padStart(length, "0"); // **은 거듭제곱 연산
    return token;
}



//인증문자 발송
export const sendTokenSMS = async (phone, token) => {
    const mysms = coolsms.default;
    const messageService = new mysms(API_KEY, API_SECRET);
    const result = await messageService.sendOne({
        to: phone,
        from: SENDER_PHONE,
        text: `인증문자가 발송됩니다. ${token}`
    })
    console.log(`${phone}으로 ${token}을 전송합니다.` , result)
    return true;
}

export const insertTokenDatabase = async (phoneNumber, newToken) => {
    const exist = await Token.findOne({phone: phoneNumber});
    if(exist){
        exist.token = newToken,
        exist.isAuth = false;
        await exist.save();

    }
    else{
        const token = new Token({
            phone: phoneNumber,
            token: newToken,
            isAuth: false
        })
        await token.save();
    }
    
}

export const checkVerifyToken = async (token, phoneNumber) => {
    const exist = await Token.findOne({
        phone: phoneNumber, 
        token: token
    });
    if(exist){
        if(!exist.isAuth){
            exist.isAuth = true;
            await exist.save();
        }
        return true;
    }
    else{
        return false;
    }
}
