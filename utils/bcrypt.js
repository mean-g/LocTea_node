const bcrypt = require("bcrypt");

const makeHash = (password, saltRound)=>{
    return bcrypt.hash(password, saltRound)
}

const isRightPassword = (password, hashedPassword)=>{
    return bcrypt.compare(password, hashedPassword)
}

module.exports = {
    makeHash, isRightPassword
}

/*비밀번호 암호화
const PW = 'abcd1234';
const encryptedPW = bcrypt.hashSync(PW, 12);
위 코드에서 12는 암호화 횟수 -> 늘어날 수록 시간이 오래걸린다... */