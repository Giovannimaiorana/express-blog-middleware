const users = require("../db/user.json");

function index(req, res) {
    res.send("Admin homepage Benvenuto");
}

module.exports = {
    index,
}