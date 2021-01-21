const request = require('request');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');


function getCityWeather(){
    return new Promise((resolve, reject)=>{                 //加入Promise的語法
        var options = {
            'method': 'GET',
            'url': 'https://www.cwb.gov.tw/V8/C/W/County/MOD/Week/65_Week_m.html',

            form: {
             }
          };
          
        request(options, function (error, response, body) {
          if (error) reject();
          var $ = cheerio.load(body)               //用cheerio像jQuery一樣把HTML的id, class抓下來

          let weather = {}
          
          for (i=1; i<8; i++){
            date = $(`#heading-${i} .date`).find('span').eq(1).text().trim();   // # -> id, . -> class, eq -> 第幾項span
            week = $(`#heading-${i} .date`).find('span').eq(0).text().trim();   
            day = $(`#heading-${i} .Day`).find('span').eq(0).text().trim();         
            temp = $(`#heading-${i} .Day`).find('span').eq(1).text().trim();          
            rain = $(`#collapse-${i} `).find('li').eq(1).text().trim();
            night = $(`#heading-${i} .Night`).find('span').eq(0).text().trim();
            tempNight = $(`#heading-${i} .Night`).find('span').eq(1).text().trim();
            rainNight = $(`#collapse-${i} `).find('li').eq(2).text().trim();

            weather[`Day${i}`] = [`data: ${date} ${week}`, `${day}的氣溫為${temp}，${rain}`, `${night}的氣溫為${tempNight}，${rainNight}`]
            }
            
          resolve(weather)
         });
    })   
}

//寄信
function sendMail(weather,args){

    var transporter = nodemailer.createTransport({
        service: 'gmail',         //伺服器
        auth: {
        user: 'xxx@gmail.com',    //帳號
        pass: 'xxx'               //密碼
        }
    });
    
    var args = process.argv;

    var mailOptions = {
        from: '"貼心天氣提醒" <xxx@gmail.com>',    //寄件者
        to: `${args}`,                  //在開啟檔案的參數輸入收件者信箱
        subject: '每日天氣',            //標題
        html: '<body><span>'+ JSON.stringify(weather) +'</span></body>'   //把Object轉成String
        };
        
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        } else {
            console.log('Message sent: ' + info.response); //寄信成功後印出訊息
        }
    });
}


getCityWeather().then((weather)=>{
    console.log(weather);
    sendMail(weather);
});
