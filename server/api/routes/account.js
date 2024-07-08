const jwt = require("jsonwebtoken")
const pool = require("../db")
const bcrypt = require('bcryptjs')

async function login(req, res){
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT user_id, username, password_hash FROM "users" WHERE username = $1 OR email = $1', [req.body.username.toLowerCase()]);
        if(result.rows.length){
            const match = await bcrypt.compare(req.body.password, result.rows[0].password_hash)
                if(match){
                    const token = jwt.sign({
                        userId: result.rows[0].user_id ? result.rows[0].user_id : 1, //For demo
                        username: result.rows[0].username,
                    }, process.env.SECRET);
                    res.json({
                        token
                    })
                }else{
                    res.status(401).send("Login Failed")
                }
        } else {
            res.status(401).send("Bad credentials")
        }
      } catch(error){
        console.log(error)
         res.send("error")
      } finally {
        client.release();
      }
}

async function available(req,res){
    const client = await pool.connect();
    const email = req.body.email.toLowerCase();
    const username = req.body.username.toLowerCase();
    if(email.length > 255 || username.length > 50){
      res.send("error: bad length")
      return
    }
    try {
      const emailCount = await client.query("SELECT COUNT(*) FROM users WHERE email = $1", [email]);
      const usernameCount = await client.query("SELECT COUNT(*) FROM users WHERE username = $1", [username]);
      const token = jwt.sign({email: email, username:username}, process.env.SECRET);
    res.send([emailCount.rows[0].count, usernameCount.rows[0].count, token])
    } catch(error){
       //console.log(error) 
       res.send("error")
    } finally {
      client.release();
    }
}

async function register(req, res){
    //Decode the token
    const authHeader = req.headers.authorization;
    if (!authHeader){
        res.status(401).send("Invalid credentials")
        return
    }
    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET)

    const data = req.body

    //Check for valid input
    if(data.email==null||data.email.toLowerCase()!==decoded.email||data.email.length>255||
    data.username==null||data.username.toLowerCase()!==decoded.username||data.username.length>20||
    data.first_name==null||data.first_name===''||
    data.password==null||data.password===''||
    data.gender===''||isNaN(data.gender)||
    data.calorie_goal==null||data.calorie_goal===''||isNaN(data.calorie_goal)||
    data.weight_phase==null||data.weight_phase===''||isNaN(data.weight_phase))
    {
        res.status(403).send("Bad input")
        return
    }

    //Normalise input
    const email = data.email.toLowerCase()
    const username = data.username.toLowerCase()
    const firstName = data.first_name
    const lastName = data.last_name
    const password = await bcrypt.hash(data.password,10)
    const birthday = data.birthday
    const gender = data.gender !== null ? Math.abs(Number(data.gender)) % 3 : null
    const calorieGoal = Math.abs(Number(data.calorie_goal)) % 32768
    const weightPhase = Number(data.weight_phase) % 2


    const client = await pool.connect();
    try {
        await client.query(`
        INSERT INTO users 
        (email, username, first_name, last_name, password_hash, birthday, gender, registration_date)
        values ($1, $2, $3, $4, $5, $6, $7, now())`,
        [email,username,firstName,lastName,password,birthday,gender]);

        await client.query(`
        INSERT INTO preferences
        (calorie_goal, weight_phase)
        values ($1, $2)`,
        [calorieGoal,weightPhase]);
        res.json({registration:"success"})
    } catch (error) {
        //console.log(error) 
        res.send("error")
    } finally {
        client.release();
    }
}

async function readPreferences(req, res){
    const client = await pool.connect();
    try {
        const token = req.headers.authorization.split(' ')[1]
        var id = jwt.verify(token, process.env.SECRET).userId
        const result = await client.query("SELECT * FROM preferences WHERE user_id = $1", [id]);
        res.send(result.rows[0])
    } catch (error) {
        //console.log(error) 
        res.send("error")
    } finally {
        client.release();
    }
}

async function savePreferences(req, res){
    const preferences = req.body.preferences
    const token = req.headers.authorization.split(' ')[1]
    var id = jwt.verify(token, process.env.SECRET).userId
    const data = [
        id,
        preferences.calorie_goal % 32768,
        preferences.weight_phase % 2,
        preferences.macro_goal
    ]
    const client = await pool.connect();
    try {
       const result = await client.query(
         `UPDATE preferences
         SET calorie_goal = $2, weight_phase = $3, macro_goal = $4
         WHERE user_id = $1`, data);
    } catch (error) {
      console.log(error)
      res.send({ message: "bruh" })
    } finally {
      client.release();
    }
return
}

async function changePassword(req, res){
    const token = req.headers.authorization.split(' ')[1]
    const client = await pool.connect();
    try {
        var id = jwt.verify(token, process.env.SECRET).userId
        const result = await client.query('SELECT password_hash FROM "users" WHERE user_id = $1', [id]);
        const match = await bcrypt.compare(req.body.password, result.rows[0].password_hash)
            if(match){
                const newPassword = await bcrypt.hash(req.body.newPassword,10)
                await client.query(`UPDATE users
                                    SET password_hash = $2
                                    WHERE user_id = $1`, [id, newPassword]);
                res.send({
                    status:1
                })
            }else{
                res.send({
                    status:0
                })
            }
      } catch(error){
        console.log(error)
         res.send("error")
      } finally {
        client.release();
      }
}


module.exports = {
    login,
    available,
    register,
    readPreferences,
    savePreferences,
    changePassword
}