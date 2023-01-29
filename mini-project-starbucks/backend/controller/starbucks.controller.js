import { getStarbucksMenuList } from "../services/starbucks.service.js";

export const getMenuList= async (req, res) => {
    try{
        const data = await getStarbucksMenuList();
        res.status(200).send({
            success: true,
            message: "메뉴 목록을 불러왔습니다.",
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