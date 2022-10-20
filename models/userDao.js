// module.exports = (sequelize, DataTypes)=>{
//     var user = sequelize.define('user', {
//         _id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         name: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         username: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             unique: true
//         },
//         email: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 isEmail: true
//             },
//             unique: true
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         mobile_number: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         birth_day: {
//             type: DataTypes.STRING,
//             allowNull: false
//         }
//     },
//     {
//         timestamps: true
//     });

//     return user;
// }; //sequelize에서 하나하나 정의 할 필요없이 DB자체를 불러오는 방법도 있다 => 찾아보기

const db = require('../config/mysql')

const createUser = async (user) => {
    const sql = `
        INSERT INTO
            users
            (name, username, email, password, mobile_number, birth_day)
        VALUES
            ('${user.name}', '${user.username}', '${user.email}', '${user.password}', '${user.mobile_number}', '${user.birth_day}');`;
            await db.query(sql);
};

// const userInfo = async (id) => {
//     return sql = `
//         SELECT 
//             * 
//         FROM users`;
//         await db.query(sql);
// };

module.exports = {
    createUser, 
    //userInfo
}