const dotenv = require("dotenv");     // dotenv 부르기
const mysql  = require("mysql2/promise");   // promise를 적용할 수 있게 mysql2 패키지를 설치했다. mysql2만 호출하면 프로미스 기능 사용 불가함

dotenv.config();    // 현재 디렉토리의 .env파일을 가져올 수 있게끔 세팅

const dbConfig = {
    host    : process.env.DB_HOST,      // .env에 저장된 변수들을 부를 때는 process.env.변수이름
    user    : process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    port    : process.env.DB_PORT,
    password: process.env.DB_PASSWORD
}

const connection = mysql.createPool(dbConfig);    // createPool함수로 pool 생성

module.exports = connection;     // 밖에서 가져다 쓸 수 있게 connection을 내보내준다.