const jwt = require("jsonwebtoken");
const key = process.env.SECRET_KEY

const makeToken = (payLoad)=>{
    return jwt.sign(payLoad, key)
}
//payload 토큰 발행

const isRightPassword = (token)=>{
    return jwt.verify(token, key);
}
//토큰 확인?
const validationToken = async (req, res, next)=>{
    try {
        const token = req.headers.authorization; //토큰으로 권한 확인

        const result = isRightPassword(token); //result는 isRightPassword는 'token이랑 key 확인하기'
        if(result){
            const {name, username, email, password, mobile_number, birth_day} = result // {}안에 정보가 토큰이랑 일치한다면!
            req.body = {name, username, email, password, mobile_number, birth_day} //req.body는 {}
            console.log(req.body)
            next(); //다음 인자로 반환...?
        }
    }catch(err){
        console.log(err)
        res.status(400).json({MESSAGE : "INVALID TOKEN"})
    }
    /* js에서는 error 발생하면 멈추고 콘솔에 error출력, 
    그러나 try... catch(err) 사용하면 스크립트 죽는 거 방지 & 에러 상황을 예외처리 가능.
    try안에서 에러 발생하면 catch로 이동 -> catch에서 에러 핸들링*/
}

module.exports = {
    makeToken, isRightPassword, validationToken
}