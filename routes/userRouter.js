//routes > userRouter.js

const router = require("express").Router();
const db     = require("../config/mysql");

router.get("/", async(req, res, next) => {
    try {
        const sql = 
        // `
        // insert into users (user_id, name, age) values (${req.body.user_id}, '${req.body.name}', ${req.body.age});
        // `
        'select * from users'
        const [rows, fields] = await db.query(sql)
        return res.status(200).json({message:"success", result:rows});
    } catch(e) {
        console.log(e.message);
    }
});

module.exports = router;