import cheerio from 'cheerio';
import axios from 'axios';
import { Token } from '../models/token.model.js';
import { User } from '../models/user.model.js';

export const scraping = async (data) => {
    //입력된 데이터에서 http로 시작되는 글자 있는지 찾기
    const url = data.split(" ").filter((element) => {
        return element.includes("http://") || element.includes("https://");
    })

    if(url && url.length > 0){
        const result = await axios.get(url);
        const $ = cheerio.load(result.data);
        const obj = {};
        $("meta").each((index, element) => {    //<meta> 태그에서
            if($(element).attr("property")){    //property 속성이 있으면
                const key = $(element).attr("property").split(":")[1];
                const value = $(element).attr("content");
                obj[key] = value;
            }
        })
        return obj;
    }
    else{
        return null;  
    }
    
}

export const checkAuthToken = async (phoneNumber) => {
    const exist = await Token.findOne({
        phone: phoneNumber, 
        isAuth: true
    });
    if(exist){
        return true;
    }
    else{
        return false;
    }
}

export const isUsefulEmail = async (email) => {
    const exist = await User.findOne({
        email: email,
    });
    if(exist){
        return false;
    }
    else{
        return true;
    }
}

export const insertUser = async (user) => {
    await user.save();
    return user._id;
}

export const getUsersList = async () => {
    const user = await User.find();
    return user;
}