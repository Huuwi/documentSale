const CommonHelper = require("../helper/common.helper.js")
let commonHelper = new CommonHelper()


class CommonController {

    async getNewCaptcha(req, res) {
        try {
            let captchaData = await commonHelper.generatorCaptcha()

            if (!captchaData?.state) {
                throw new Error("unknown error when generatorCaptcha")
            }

            return res.status(200).json({
                message: "ok!",
                base64: captchaData.base64,
                key: captchaData.key
            })


        } catch (error) {

            console.log("error when getNewCaptcha :  ", error);
            return res.status(500).json({
                message: "have wrong!"
            })

        }

    }


    async changeNickName(req, res) {

        try {
            let userId = req.decodeAccessToken?.userId;

            let newNickName = req.body.newNickName;

            if (!newNickName) {
                return res.status(400).json({
                    message: "missing data!"
                })
            }

            let charactersNotValid = ["`", '"', "`"]
            for (let e of charactersNotValid) {
                if (newNickName.includes(e)) {
                    return res.status(400).json({
                        message: `can't include characters :  ${charactersNotValid.join(" ,")}`
                    })
                }
            }

            await globalThis.connection.executeQuery(`update user set nickName = '${newNickName}'  where userId = ${userId} `)
                .catch((e) => {
                    throw new Error(e)
                })

            return res.status(200).json({
                message: "ok"
            })

        } catch (error) {
            console.log("err when change nickname : ", error);
            return res.status(500).json({
                message: "have wrong!"
            })

        }


    }

    async changePassWord(req, res) {


        try {
            let userId = req.decodeAccessToken?.userId;

            let { oldPassWord, newPassWord } = req.body;

            if (!oldPassWord || !newPassWord) {
                return res.status(400).json({
                    message: "missing data!"
                })
            }

            let charactersNotValid = ["`", '"', "`"]
            for (let e of charactersNotValid) {
                if (oldPassWord.includes(e) || newPassWord.includes(e)) {
                    return res.status(400).json({
                        message: `can't include characters :  ${charactersNotValid.join(" ,")}`
                    })
                }
            }

            let userFound = await globalThis.connection.executeQuery(`select * from user where userId = ${userId}`)
                .then((data) => {
                    return data[0]
                })
                .catch((e) => {
                    throw new Error(e)
                })

            if (!bcrypt.compareSync(oldPassWord, userFound?.password)) {
                return res.status(400).json({
                    message: "old password not correct!"
                })
            }

            const salt = bcrypt.genSaltSync(10);
            let hashPassWord = bcrypt.hashSync(newPassWord, salt)

            await globalThis.connection.executeQuery(`update user set passWord = '${hashPassWord}' where userId = ${userId} `)
                .catch((e) => {
                    throw new Error(e)
                })

            return res.status(200).json({
                message: "ok"
            })


        } catch (error) {
            console.log("err when change passWord : ", error);
            return res.status(500).json({
                message: "have wrong!"
            })
        }

    }




}


module.exports = CommonController

