import { checkPhoneLength, checkVerifyToken, createToken, insertTokenDatabase, sendTokenSMS } from "../services/tokens.service.js";

export const sendTokenToSMS = async (req, res) => {
    try{
        const phoneNumber = req.body.phone
        const isValid = checkPhoneLength(phoneNumber);
        if(isValid){
            //2. 핸드폰 토큰 6자리 생성
            const newToken = createToken(6);
    
            await insertTokenDatabase(phoneNumber, newToken);
    
            await sendTokenSMS(phoneNumber, newToken)
            res.status(200).send({
                success: true,
                message: "핸드폰으로 인증 문자를 전송하였습니다.",
                data: null
            })
        }
        else{
            res.status(500).send({
                success: false,
                message: "휴대폰 번호 확인.",
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


export const varifyToken = async (req, res) => {
    try{
        const phoneNumber = req.body.phone
        const token = req.body.token
        const isValid = await checkVerifyToken(token, phoneNumber);
        if(isValid){
            res.status(500).send({
                success: true,
                message: "휴대폰 인증 성공",
                data: null
            })
        }
        else{
            res.status(500).send({
                success: false,
                message: "휴대폰 인증 실패",
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