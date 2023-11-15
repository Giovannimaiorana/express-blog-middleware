jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    //leggo token tramite header
    const bearerToken = req.header("Authorization")
    // se token mancante errore
    if (!bearerToken) {
        return res.status(404).send("Token Mancante");
    }
    //leggo la parola barere al risultato 
    const token = bearerToken.split(" ")[1];

    //verifico con funzione verify 
    const validToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(validToken);

    if (!validToken) {
        return res.status(404).send("il token non è valido")
    }
    next();
}