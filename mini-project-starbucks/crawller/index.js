import puppeteer from 'puppeteer'
import mongoose from 'mongoose'
import { Starbucks } from './models/starbucks.model.js'

const crawling = async () => {
    const browser = await puppeteer.launch({headless: false}); //headless:브라우저 감춤 여부
    const page = await browser.newPage()
    await page.setViewport({width: 1280, height: 720})    //브라우저 창크기
    await page.goto("https://www.starbucks.co.kr/menu/drink_list.do");   // url 뒤에 /robots.txt를 붙여 크롤링 허용 여부를 확인할 수 있다.
    //goto시 html을 한번에 받아오기 때문에 goto를 남발하지만 않는것이 좋다.
    await page.waitForTimeout(1000);    //타임아웃 기다림

    let i = 1;
    let j = 2;
    while(true){
        i = 1;
        while(true){
            try{            
                const name = await page.$eval(
                    `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${j}) > ul > li:nth-child(${i}) > dl > dd`,
                    (el) => (el.textContent)
                )
                const img = await page.$eval(
                    `#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(${j}) > ul > li:nth-child(${i}) > dl > dt > a > img`,
                    (el) => (el.src)
                )
                const doc = new Starbucks({
                    name: name,
                    img: img
                })
                await doc.save();
                i++;
            }
            catch(e){
                break;
            }
        }

        if(i == 1 && j != 2){
            break;
        }
        j += 2;
    }
    
    
    await browser.close();
}

//Mongodb connect
mongoose.connect('mongodb://localhost:27017/mydocker03'); 

crawling();


//#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(1) > dl > dt > a > img
//#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(1) > dl > dd

//#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(2) > ul > li:nth-child(2) > dl > dt > a > img
//#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(4) > ul > li:nth-child(1) > dl > dt > a > img
//#container > div.content > div.product_result_wrap.product_result_wrap01 > div > dl > dd:nth-child(2) > div.product_list > dl > dd:nth-child(6) > ul > li:nth-child(1) > dl > dt > a > img