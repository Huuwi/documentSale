const crypto = require("crypto")

const base64url = require('base64url');

class ManageToken {

    generateToken(data, secrectKey, options) {
        data.timeExpried = Date.now() + Number(options.expiresIn)
        let payload = base64url(JSON.stringify(data))
        let signature = base64url(payload + secrectKey)
        let hashFun = crypto.createHash('sha256')
        signature = hashFun.update(signature).digest('hex')
        return payload + "." + signature
    }

    verifyToken(token, secrectKey) {
        let [payload, signature] = token.split('.')
        let data = JSON.parse(base64url.decode(payload))

        if (data.timeExpried < Date.now()) {
            return {
                state: false,
                message: "expriedTime"
            }
        }
        let hashFun = crypto.createHash('sha256')
        let sigServer = base64url(payload + secrectKey)
        sigServer = hashFun.update(sigServer).digest('hex')
        if (sigServer != signature) {
            return {
                state: false,
                message: "invalid!"
            }
        }

        return {
            state: true,
            message: "valid",
            data
        }
    }

}


module.exports = ManageToken
