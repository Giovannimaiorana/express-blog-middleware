const jwt = require('jsonwebtoken');

module.exports = function (user) {

    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username


    }
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h'
    })
}