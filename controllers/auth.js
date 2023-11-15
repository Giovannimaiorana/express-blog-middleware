const generateJWT = require("../utilities/jwtGenerate");

function login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send("username e password sono obbligatori");
        return
    }

    //prendo db
    const users = require("../db/user.json");

    //vedo corrispondenza con db 
    const user = users.find((user) => user.username === username && user.password === password);

    if (!user) {
        res.status(400).send("username o password non trovati");
        return
    }

    //generazione token
    const token = generateJWT(user);

    res.json({
        token
    });
}

module.exports = {
    login,
}