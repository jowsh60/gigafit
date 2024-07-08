const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader){
        res.status(401).send("Invalid credentials")
    } else {
        const token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (decoded.username === 'demo' || err){
                res.status(403)
                return
            }else{
                //console.log(decoded.userId);
                next();
            }
        })
    }
}