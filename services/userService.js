const userDao = require('../models/userDao')
const bcrypt  = require('../utils/bcrypt')
const jwt     = require('../utils/jwt');
const salt    = Number(process.env.SALT);

const signUp= async(name, username, email, password, mobile_number, birth_day)=>{
    const pwValidation = new RegExp(
        '^(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*#?&])[a-z\d$@$!%*#?&]{8,16}$'
    );
    const usernameValidation = new RegExp(
        '^[a-zA-Z0-9]{4,12}$'
    );
    const emailValidation = new RegExp(
        '^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$'
    );
    const bdayValidation = new RegExp(
        '^(19\d{2}|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$'
    );

    if (!pwValidation.test(password)) {
        const error = new Error("PASSWORD_VALIDATION_ERROR");
                error.statusCode = 400;
        throw error;
    }//test() 메소드는 정규식과 문자열이 일치하는지 검사한다.
    if(!usernameValidation.test(username)) {
        const error = new Error("USERNAME_VALIDATION_ERROR");
                error.statusCode = 400;
        throw error;
    }
    if(!emailValidation.test(email)) {
        const error = new Error("EMAIL_VALIDATION_ERROR");
                error.statusCode = 400;
        throw error;
    }
    if(!bdayValidation.test(birth_day)) {
        const error = new Error("BIRTHDAY_VALIDATION_ERROR");
                error.statusCode = 400;
        throw error;
    }
    const newUser    = await userDao.isNew(username);
    const zeroOrOne  = Number(Object.values(newUser[0])[0])
    if(!zeroOrOne){
        const hashed = await bcrypt.makeHash(password, salt)
        return await userDao.createUser(
            name, username, email, hashed, mobile_number, birth_day
        )
    }
}

const logIn = async(username, password)=>{
    const newUser   = await userDao.isNew(username);
    const zeroOrOne = Number(Object.values(newUser[0])[0]);
    if(zeroOrOne === 0) return false;
    //zero-or-one 함수는 인수에 하나의 항목이 있거나 인수가 비어 있는 시퀀스인 경우 인수를 리턴한다..?
    //시간나면 object.valuses값 찍어보고, newUser값찍어보고 보기보기


    const userInfo = await userDao.logIn(username);
    const temp     = userInfo[0].password;
    const payLoad  = {name : userInfo[0].name, username : userInfo[0].username, id : userInfo[0].id,
        email : userInfo[0].email, mobile_number : userInfo[0].mobile_number, birth_day : userInfo[0].birth_day}; //..?
    const auth     = await bcrypt.isRightPassword(password, temp);
    if(auth){
        return jwt.makeToken(payLoad)
    }
    else return auth;
}

const createUserAddress= async(id, address)=>{
    return await userDao.createUserAddress(id, address);
}

module.exports = {
    signUp, logIn, createUserAddress
}
// 예외처리 : email,username 같은 게 있으면 "DUPLICATION_어쩌구_ERROR, 400"
// user-create 성공 201

// 3. 로그인 : post요청 json으로 받으면 정보 확인 / 토큰발급
// username과 password 동일하면 200
// 토큰 발행 - 시간제한 1,2분 / 리프레시 토큰 발급
// 유저정보 일치 x = INVALID_USER 에러 400
// 키에러 400