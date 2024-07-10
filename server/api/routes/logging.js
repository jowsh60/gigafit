const jwt = require("jsonwebtoken")
const pool = require("../db")

async function readFoodRoute(req, res) {
    const client = await pool.connect();
    const date = req.query.date;
    if (date == '') {
        res.send([{}]);
        client.release();
        return
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        var id = jwt.verify(token, process.env.SECRET).userId
        const result = await client.query("SELECT food FROM meals WHERE date = $1 AND user_id = $2", [date, id]);
        if (result.rows.length) {

            res.send(result.rows[0].food)
        } else {
            res.send([{}]);
        }
    } catch (error) {
        //console.log(error) 
        res.send("error")
    } finally {
        client.release();
    }
}

async function addFoodRoute(req, res) {
    if (Object.keys(req.body).length == 3) {
        const date = req.body.date
        const food = req.body.foods
        const totals = { c: req.body.totals[0], f: req.body.totals[1], p: req.body.totals[2], cal: req.body.totals[3] }
        const token = req.headers.authorization.split(' ')[1]
        var id = jwt.verify(token, process.env.SECRET).userId
        const client = await pool.connect();
        try {
            await client.query(
                `INSERT INTO meals (user_id, date, food) 
            VALUES ($1, $2, $3) 
            ON CONFLICT (user_id, date) 
            DO UPDATE SET food = $3`, [id, date, food]);
            await client.query(
                `INSERT INTO daylogger (user_id, date, totals) 
            VALUES ($1, $2, $3) 
            ON CONFLICT (user_id, date) 
            DO UPDATE SET totals = $3`, [id, date, totals]);
            //This should also insert the calorie goal for later graphing purposes
        } catch (error) {
            console.log(error)
            res.send({ message: "error" })
        } finally {
            client.release();
        }
        res.send({ message: "nice" })
    } else {
        res.send({ message: "not nice" })
    }
    return
}

async function readDayRoute(req, res) {
    const client = await pool.connect();
    const date = req.query.date;
    if (date == undefined || date === '') {
        res.send({});
        client.release();
        return
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        const x = jwt.verify(token, process.env.SECRET)
        const id = x.userId
        const username = x.username
        const result = await client.query("SELECT * FROM daylogger WHERE date = $1 AND user_id = $2", [date, id]);
        if (result.rows.length) {
            var rows = result.rows[0]
            //Only run 1 extra query at most
            if (rows.calorie_goal == null && rows.weight_phase == null) {
                const cal_phase = await client.query("SELECT calorie_goal, weight_phase FROM preferences WHERE user_id = $1", [id]);
                rows.calorie_goal = cal_phase.rows[0].calorie_goal
                rows.weight_phase = cal_phase.rows[0].weight_phase
            } else if (rows.calorie_goal == null) {
                const cal = await client.query("SELECT calorie_goal FROM preferences WHERE user_id = $1", [id]);
                rows.calorie_goal = cal.rows[0].calorie_goal
            } else if (rows.weight_phase == null) {
                const phase = await client.query("SELECT weight_phase FROM preferences WHERE user_id = $1", [id]);
                rows.weight_phase = phase.rows[0].weight_phase
            }
            if(username==='demo') delete rows["perceived_happiness"] //don't need people seeing that!
            delete rows["custom"] //Add back later
            delete rows["user_id"]
            delete rows["date"]
            res.send(rows)
        } else {
            const cal_phase = await client.query("SELECT calorie_goal, weight_phase FROM preferences WHERE user_id = $1", [id]);
            res.send(cal_phase.rows[0]);
        }
    } catch (error) {
        console.log(error)
        res.send("error")
    } finally {
        client.release();
    }
}

async function addDayRoute(req, res) {
    if (Object.keys(req.body).length == 2) {

        const date = req.body.date
        const day = req.body.day
        const token = req.headers.authorization.split(' ')[1]
        var id = jwt.verify(token, process.env.SECRET).userId
        const data = [
            id, date,
            day.hours_slept == null || isNaN(day.hours_slept) ? null : day.hours_slept % 25,
            day.sleep_quality == null || isNaN(day.sleep_quality) ? null : day.sleep_quality % 11,
            day.morning_weight == null || isNaN(day.morning_weight) ? null : day.morning_weight % 1000,
            day.night_weight == null || isNaN(day.night_weight) ? null : day.night_weight % 1000,
            day.workout_quality == null || isNaN(day.workout_quality) ? null : day.workout_quality % 11,
            day.perceived_happiness == null || isNaN(day.perceived_happiness) ? null : day.perceived_happiness % 11,
            day.calorie_goal !== null && day.calorie_goal !== '' ? Math.abs(Number(day.calorie_goal)) % 32768 : null,
            day.weight_phase !== null && day.weight_phase !== '' ? Number(day.weight_phase) % 2 : null,
        ]

        const client = await pool.connect();
        try {
            const result = await client.query(
                `INSERT INTO daylogger (user_id, date, hours_slept, sleep_quality, morning_weight, night_weight, workout_quality, perceived_happiness, calorie_goal, weight_phase) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
             ON CONFLICT (user_id, date) 
             DO UPDATE SET hours_slept = $3, sleep_quality = $4, morning_weight = $5, night_weight = $6, workout_quality = $7, perceived_happiness = $8, calorie_goal = $9, weight_phase = $10`, data);
        } catch (error) {
            console.log(error)
            res.send({ message: "bruh" })
        } finally {
            client.release();
        }
        res.send({ message: "nice" })
    } else {
        res.send({ message: "not nice" })
    }
    return
}

module.exports = {
    readFoodRoute,
    addFoodRoute,
    readDayRoute,
    addDayRoute
}