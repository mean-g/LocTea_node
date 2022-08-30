const userService = require('../services/userService')

const signUp = async(req, res)=>{ //async = promise를 반환 혹은 promise가 아닌 값을 promise로 감싸서 반환.
    try{
        const {name, username, email, password, mobile_number, birth_day} = req.body; //const로 기본 정보들 (in request.body) 상수화.
        if(!name || !username || !email || !password || !mobile_number || !birth_day){ // ||는 OR 논리연산자, !은 NOT 논리연산자이다. 
            throw { status : 400, message : "KEY_ERROR" }
        };
        const userId = await userService.signUp(name, username, email, password, mobile_number, birth_day);
        await userService.createUserAddress(userId,address);
        res.status(201).json({message : "success"});
        /* await는 promise값을 도출할 때 까지 멈춘다. => userService의 signUp을 끝낼때 까지 멈춤 => 그동안 CPU아낌
        userID는 usersService의 signUp에 있는 ()를 바라본다. */
    }catch(err){
        console.log(err)
        res.status(err.statusCode || 400).json({message : err.message})
    }
}

const logIn = async (req, res)=>{
    try {
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({message : "FAILED"})
        }
        const token = await userService.logIn(username, password);
        if(token){
            return res.status(201).json({message : "SUCCESS", token : token});
        }
        return res.status(400).json({message : "FAILED"})
    } catch(err){
        return res.status(err.statusCode || 400).json({message : err.MESSAGE})
    }
}

// const userInfo = async(req, res)=>{
//     try{
//         const {id} = req.body;
//         if(!id){
//             res.status(400).jsonS({message : "FAILED"});
//         }
//         const userInfo = await userService.gettingUserInfo(id);
//         res.status(201).json({message : "SUCCESS", data : userInfo})
//     } catch(err) {
//         res.status(err.statusCode || 400).json({message : "FAILED"})
//     }
// }

module.exports = {
    signUp, logIn, 
    //userInfo
}

// 3. 로그인 : post요청 json으로 받으면 정보 확인 / 토큰발급
// username과 password 동일하면 200
// 토큰 발행 - 시간제한 1,2분 / 리프레시 토큰 발급
// 유저정보 일치 x = INVALID_USER 에러 400
// 키에러 400