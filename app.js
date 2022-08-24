//index.js
const express = require("express");     // 설치한 express를 불러와 변수에 담음
const cors    = require("cors");
const req = require("express/lib/request");

const app = express();      // express실행해서 app에 담기

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// app.get은 서버에 get요청이 있는 경우 실행됨
// localhost:4000/으로 get요청을 받으면 HELLO NODE를 보여줘라
// app.get('/', (req,res) => {
//     res.send('HELLO NODE')
// })
app.use('/users', require('./routes/userRouter'))

const port = 4000;             // 사용할 포트 번호
// app.listen는 서버가 실행되는 경우 실행됨
app.listen(port, () => {      
    console.log('서버켜짐');
})