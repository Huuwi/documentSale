const crypto = require("crypto")

const base64url = require('base64url'); //npm i base64url



class Token {

    generateToken(data, secrectKey) {
        data.timeExpried = Date.now() + 3600
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

let token = new Token()
let myToken = token.generateToken({
    userId: 15
}, secrectKey)

let decodeToken = token.verifyToken(myToken, secrectKey)

console.log(decodeToken);

