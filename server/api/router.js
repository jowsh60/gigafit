const express = require("express");
const isLoggedIn = require("./middleware/isLoggedIn")
const router = express.Router();

const counterRoute = require("./routes/counterRoute")

const addFoodRoute = require("./routes/addFoodRoute")
const readFoodRoute = require("./routes/readFoodRoute")

const readDayRoute = require("./routes/readDayRoute")
const addDayRoute = require("./routes/addDayRoute")


router.get('/test', (req, res) => res.send("Express on Vercel"));

router.post('/login', require("./routes/loginRoute"));
router.post('/available', require("./routes/available"))
router.post('/register', require("./routes/register"))

router.get('/counter', isLoggedIn, counterRoute)

router.get('/food', isLoggedIn, readFoodRoute)
router.post('/food', isLoggedIn, addFoodRoute)

router.get('/day', isLoggedIn, readDayRoute)
router.post('/day', isLoggedIn, addDayRoute)

module.exports = router;