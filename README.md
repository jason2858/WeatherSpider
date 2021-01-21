# WeatherSpider 氣候爬蟲
## Working Environment
* [Node.js v13.14.0](https://nodejs.org/en/download/)

## API
[request](https://www.npmjs.com/package/request) 
[cheerio](https://www.npmjs.com/package/cheerio) 
[nodemailer](https://www.npmjs.com/package/nodemailer) 

## How to run 
### Clone and go into repository
```
git clone https://github.com/Larry850806/cheerio-weather
cd cheerio-weather
```
### Install dependencies and run
```
npm install
node index.js args (args: e-mail address)
```

## 說明

爬取氣象局新北市一周內的天氣預報，將氣象資料寄給 **args** 。

寄信部分將 **user** 及 **pass** 改成自己的帳號密碼。
```
auth: {
    user: 'xxx@gmail.com', 
    pass: 'xxx'
}
```
