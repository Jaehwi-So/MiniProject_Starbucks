import { getToday } from "./date.js";
import nodemailer from 'nodemailer';


export const getWelcomeTemplate = (name) => {
    //const {name, age, schhol, createAt } = Object 의 형태로 구조분해할당됨

    const createdAt = getToday();
    const result = `
        <html>
            <body>
                <h1>${name}님 가입을 환영합니다.</h1>
            </body>
        </html>
    `
    return result;
}

export const checkValidationEmail = (email) => {
    if(!email || !(email.includes("@"))){
        return false;
    }else{
        return true;
    }
}

export const sendTemplateToEmail = async (email, template) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    const result = await transporter.sendMail({
        from: process.env.EMAIL_SENDER,
        to: email,
        subject: "[Starbucks] 가입을 축하합니다.",
        html: template
    })

    return true;
}