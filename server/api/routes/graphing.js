const jwt = require("jsonwebtoken")
const pool = require("../db")

async function historyRoute(req, res) {
    const date = req.query.date;
    const client = await pool.connect();
    try {
        const token = req.headers.authorization.split(' ')[1]
        var id = jwt.verify(token, process.env.SECRET).userId
        const result = await client.query(`
      SELECT date, morning_weight, calorie_goal, totals 
      FROM dayLogger 
      WHERE (user_id = $1 AND totals IS NOT NULL AND date != $2) ORDER BY date ASC`, [id, date]);

        //Check for blank cal goals, fill with default

        if (result.rows.length) {
            // let cal_phase = false
            // for(let i = 0; i < result.rows.length; i++) {
            //     if(result.rows[i].calorie_goal === null || result.rows[i].weight_phase === null) {
            //         cal_phase = await client.query("SELECT calorie_goal, weight_phase from preferences WHERE user_id = $1", [id])
            //         break;
            //     }
            // }
            // if(cal_phase){
            //     for(let i = 0; i < result.rows.length; i++) {
            //         if(result.rows[i].calorie_goal === null) {
            //             result.rows[i].calorie_goal = cal_phase.rows[0].calorie_goal
            //         }
            //         if(result.rows[i].weight_phase === null) {
            //             result.rows[i].weight_phase = cal_phase.rows[0].weight_phase
            //         }
            //     }
            // }
            res.send(result.rows)
        } else {
            res.send([]);
        }
    } catch (error) {
        console.log(error)
        res.send("error")
    } finally {
        client.release();
    }
}

async function counterRoute(req, res){
    const date = req.query.date;
    const client = await pool.connect();
    try {
        const token = req.headers.authorization.split(' ')[1]
        var id = jwt.verify(token, process.env.SECRET).userId
        const result = await client.query(`
        SELECT date, calorie_goal, weight_phase, totals 
        FROM dayLogger 
        WHERE (user_id = $1 AND totals IS NOT NULL AND date != $2) ORDER BY date DESC LIMIT 7`, [id, date]);
        if (result.rows.length) {
            let cal_phase = false
            for (let i = 0; i < result.rows.length; i++) {
                if (result.rows[i].calorie_goal === null || result.rows[i].weight_phase === null) {
                    cal_phase = await client.query("SELECT calorie_goal, weight_phase from preferences WHERE user_id = $1", [id])
                    break;
                }
            }
            if (cal_phase) {
                for (let i = 0; i < result.rows.length; i++) {
                    if (result.rows[i].calorie_goal === null) {
                        result.rows[i].calorie_goal = cal_phase.rows[0].calorie_goal
                    }
                    if (result.rows[i].weight_phase === null) {
                        result.rows[i].weight_phase = cal_phase.rows[0].weight_phase
                    }
                }
            }
            res.send(result.rows)
        } else {
            res.send([]);
        }
    } catch (error) {
        //console.log(error) 
        res.send("error")
    } finally {
        client.release();
    }
}

async function macroRoute(req, res){
    const date = req.query.date;
    const client = await pool.connect();
    try {
        const token = req.headers.authorization.split(' ')[1]
        var id = jwt.verify(token, process.env.SECRET).userId
        const goals = await client.query(`SELECT macro_goal, calorie_goal, dark_mode FROM preferences WHERE user_id = $1`, [id]);
        if (goals.rows[0].macro_goal == null) {
            return res.send({ goals: null })
        }
        const progress = await client.query(`
        SELECT totals FROM daylogger 
        WHERE (user_id = $1 and date = $2 and totals IS NOT NULL)`, [id, date]);
        if(progress.rows.length){
            return res.send({goals:{...goals.rows[0].macro_goal, cal:goals.rows[0].calorie_goal}, progress:progress.rows[0].totals, dark_mode:goals.rows[0].dark_mode})
        }else{
            return res.send({goals:{...goals.rows[0].macro_goal, cal:goals.rows[0].calorie_goal}, progress:{"c":0,"f":0,"p":0,"cal":0}, dark_mode:goals.rows[0].dark_mode})
        }
    } catch (error) {
        //console.log(error) 
        res.send("error")
    } finally {
        client.release();
    }
}

module.exports = {
    historyRoute,
    counterRoute,
    macroRoute
}