const { decode } = require('jsonwebtoken')
const utility = require('../utility/utility')

const userVerification = function (req,res,next) {
    try {
        var token = req.headers['authorization']
        var decoded=utility.JWTDecodeToken(token)
        console.log(decode)
        req.userId=decoded.id
        next()
      }
      catch (e) {
        console.log(e)
        next(e)
      }
}

module.exports = userVerification
