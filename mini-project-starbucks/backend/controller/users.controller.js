import { User } from "../models/user.model.js";
import { checkAuthToken, isUsefulEmail, scraping, insertUser, getUsersList } from "../services/users.service.js";
import { checkValidationEmail, getWelcomeTemplate, sendTemplateToEmail } from "../utils/email.js";

export const signUpUser = async (req, res) => {
    try{
        const {name, email, personal, prefer, pwd, phone} = req.body;
        const og = await scraping(prefer);
        if(await checkAuthToken(phone) && await isUsefulEmail(email) && checkValidationEmail(email) && personal.length == 14){
            const encPersonal = personal.substring(0, 6) + '-*******';
            const user = new User({
                name, email, personal: encPersonal, prefer, pwd, phone, og
            })
            const id = await insertUser(user);
            const template = getWelcomeTemplate(name);
            await sendTemplateToEmail(email, template);
            res.status(200).send({
                success: true,
                message: "회원 가입 성공",
                data: id
            })
        }
        else{
            res.status(422).send({
                success: false,
                message: "회원 가입 실패",
                data: null
            })
        }

        
    }
    catch(e){
        console.log(e);
        res.status(500).send({
            success: false,
            message: "내부 서버 오류",
            data: null
        })
    }    
}


export const getUsers = async (req, res) => {
    try{
        const data = await getUsersList();
        res.status(200).send({
            success: true,
            message: "유저 목록을 불러왔습니다.",
            data: data
        })     
    }
    catch(e){
        console.log(e);
        res.status(500).send({
            success: false,
            message: "내부 서버 오류",
            data: null
        })
    }    
}