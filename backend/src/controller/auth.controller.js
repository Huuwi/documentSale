const CommonHelper = require("../helper/common.helper.js")
let commonHelper = new CommonHelper()

const AuthHelper = require("../helper/auth.helper.js")
let authHelper = new AuthHelper()

class AuthController {

    async login(req, res) {

        try {

            let { text, userName, passWord, key } = req.body

            if (!text || !userName || !passWord || !key) {
                return res.status(400).json({
                    message: "missing data!"
                })
            }

            // let valid = commonHelper.verifyCaptcha(key, text)

            // if (!valid?.state) {
            //     return res.status(400).json({
            //         message: valid.message,
            //     })
            // }


            let charactersNotValid = ["`", '"', "`"]
            for (let e of charactersNotValid) {
                if (userName.includes(e)) {
                    return res.status(400).json({
                        message: `can't include characters :  ${charactersNotValid.join(" ,")}`
                    })
                }
            }

            let userFound = await globalThis.connection.executeQuery("select * from user where userName = ?", [userName])
                .then((data) => {
                    return data[0]
                })
                .catch((e) => {
                    console.log(e);
                })


            if (!userFound) {
                return res.status(400).json({
                    message: "not found user!"
                })
            }



            if (!commonHelper.compareHash(passWord, userFound?.passWord)) {
                return res.status(400).json({
                    message: "password is not correct!"
                })
            }


            let userId = userFound.userId

            let at = authHelper.generatorAccessToken({ userId, isAdmin: userFound.isAdmin }).at
            let rt = authHelper.generatorRefreshToken({ userId, isAdmin: userFound.isAdmin }).rt


            globalThis.tokenOfUserId.set(userId, {
                at, rt
            })

            res.cookie("at", at, { httpOnly: true, maxAge: 3600000 * 12, sameSite: "none", secure: true, })
            res.cookie("rt", rt, { httpOnly: true, maxAge: 3600000 * 12, sameSite: "none", secure: true, })


            let { nickName, avartar, gameId, isRegSale, isAdmin, balance } = userFound

            let userData = { nickName, avartar, gameId, isRegSale, isAdmin, balance, userId }
            return res.status(200).json({
                message: "ok",
                userData,
                at
            })

        } catch (error) {
            console.log("err when login : ", error);
            res.status(500).json({
                message: "have wrong!"
            })

        }


    }


    async addCart(req, res) {

        try {
            let userId = req?.decodeAccessToken?.userId;

            if (!userId) {
                return res.status(400).json({
                    message: "not found userId!"
                });
            }

            let { documentId } = req.body;

            if (!documentId) {
                return res.status(400).json({
                    message: "missing data!"
                });
            }

            let documentFound = await globalThis.connection.executeQuery("select * from document where documentId = ?", [documentId])
                .then((r) => {
                    return r[0];
                })
                .catch((e) => {
                    throw new Error(e);
                });

            if (!documentFound) {
                return res.status(400).json({
                    message: "not found document!"
                });
            }

            await globalThis.connection.executeQuery("insert into cart (userId, documentId) values (?,?)", [userId, documentId])
                .then((r) => {
                    return r;
                })
                .catch((e) => {
                    throw new Error(e);
                });

            return res.status(200).json({
                message: "ok"
            });

        } catch (error) {
            console.log("error when addCart : ", error);
            return res.status(500).json({
                message: "have wrong!"
            });
        }

    }


    async register(req, res) {
        try {

            let { text, userName, passWord, rePassWord, nickName, key } = req.body

            if (!text || !userName || !passWord || !rePassWord || !nickName || !key) {
                return res.status(400).json({
                    message: "missing data!"
                })
            }

            let charactersNotValid = ["`", '"', "`"]

            for (let e of charactersNotValid) {
                if (userName.includes(e) || nickName.includes(e) || passWord.includes(e)) {
                    return res.status(400).json({
                        message: `can't include characters :  ${charactersNotValid.join(" ,")}`
                    })
                }
            }

            if (rePassWord != passWord) {
                return res.status(400).json({
                    message: "Password and re-entered password are not the same!!"
                })
            }


            let valid = commonHelper.verifyCaptcha(key, text)

            if (!valid?.state) {
                return res.status(400).json({
                    message: valid.message,
                })
            }

            let userFound = await globalThis.connection.executeQuery("select * from user where userName = ?", [userName])
                .then((data) => {
                    return data
                })
                .catch((e) => {
                    console.log(e);
                })

            if (userFound?.length) {
                return res.status(400).json({
                    message: "userName already existed!",
                })
            }

            let hashPassWord = commonHelper.hashText(passWord)
            console.log("hashPassWord :  ", hashPassWord);


            await globalThis.connection.executeQuery(`INSERT INTO user (userName , passWord , nickName)
                                                        VALUES (? , ? , ?);` , [userName, hashPassWord, nickName])

            return res.status(200).json({
                message: "ok",
            })


        } catch (error) {
            console.log("err when register : ", error);
            res.status(500).json({
                message: "have wrong!"
            })

        }



    }

    async getInforUser(req, res) {

        try {
            let userId = req?.decodeAccessToken?.userId

            if (!userId) {
                return res.status(400).json({
                    message: "not found userId!"
                })
            }

            let userFound = await globalThis.connection.executeQuery("select * from user where userId = ?", [userId])
                .then((res) => {
                    return res[0]
                })

            if (!userFound) {
                return res.status(400).json({
                    message: "not found user!"
                })
            }

            let userNameGame = false
            if (userFound.gameId > 0) {
                try {
                    userNameGame = await globalThis.connection.executeQuery(`select userNameGame from gameAccount where gameId = ${userFound.gameId}`)
                        .then((data) => {
                            return data[0].userNameGame
                        })
                } catch (error) {

                }
            }

            let { nickName, avartar, gameId, isRegSale, isAdmin, balance } = userFound

            let userData = { nickName, avartar, gameId, isRegSale, isAdmin, balance, userNameGame, userId }
            return res.status(200).json({
                message: "ok",
                userData
            })


        } catch (error) {

            console.log("err when getInforUser : ", error);
            res.status(500).json({
                message: "have wrong!"
            })

        }
    }

    getNewAccessToken(req, res) {

        try {

            let rt = req.cookies?.rt

            if (!rt) {
                return res.status(400).json({
                    message: "not found refresh token!"
                })
            }

            let validRefreshToken = authHelper.verifyRefreshToken(rt)

            if (!validRefreshToken?.state) {
                return res.status(400).json({
                    message: validRefreshToken.message
                })
            }

            let tokenOfUserId = globalThis.tokenOfUserId.get(validRefreshToken?.decodeRefreshToken?.data?.userId)


            if (tokenOfUserId?.rt != rt) {
                res.cookie("rt", "")
                return res.status(400).json({
                    message: "old refresh token!"
                })
            }

            let newAt = authHelper.generatorAccessToken({ userId: validRefreshToken?.decodeRefreshToken?.data?.userId })

            tokenOfUserId.at = newAt.at
            res.cookie("at", newAt.at, { httpOnly: true, maxAge: 3600000 * 12, sameSite: "none", secure: true })

            return res.status(200).json({
                message: "ok"
            })

        } catch (error) {
            console.log("err when getNewAccessToken : ", error);
            res.status(500).json({
                message: "have wrong!", at: newAt
            })
        }

    }


    async getAllDocument(req, res) {
        try {

            let dataDocument = await globalThis.connection.executeQuery("select * from document")
                .then((r) => {
                    return r
                })
                .catch((e) => {
                    throw new Error(e)
                })
            return res.status(200).json({
                message: "ok",
                dataDocument
            })

        } catch (error) {
            console.log("error when getAllDocument : ", error);
            return res.status(500).json({
                message: "have wrong!"
            })
        }
    }

    async getBoughtDocument(req, res) {
        try {

            let userId = req?.decodeAccessToken?.userId

            if (!userId) {
                return res.status(400).json({
                    message: "not found userId!"
                })
            }

            let dataBoughtDocument = await globalThis.connection.executeQuery(`
                    select document.documentId , document.name , document.author , document.description , document.image,document.type from boughtDocument join document on boughtDocument.documentId = document.documentId where boughtDocument.userId = ${userId}
                `)
                .then((r) => {
                    return r
                })
                .catch((e) => {
                    throw new Error(e)
                })

            return res.status(200).json({
                message: "ok",
                dataBoughtDocument
            })

        } catch (error) {
            console.log("error when getBoughtDocument : ", error);
            return res.status(500).json({
                message: "have wrong!"
            })
        }

    }


    async buyDocument(req, res) {
        try {

            let userId = req?.decodeAccessToken?.userId

            if (!userId) {
                return res.status(400).json({
                    message: "not found userId!"
                })
            }

            let { documentId } = req.body

            if (!documentId) {
                return res.status(400).json({
                    message: "missing data!"
                })
            }

            let documentFound = await globalThis.connection.executeQuery("select * from document where documentId = ?", [documentId])
                .then((r) => {
                    return r[0]
                })
                .catch((e) => {
                    throw new Error(e)
                })

            if (!documentFound) {
                return res.status(400).json({
                    message: "not found document!"
                })
            }

            let balanceUser = await globalThis.connection.executeQuery("select balance from user where userId = ?", [userId])
                .then((r) => {
                    return r[0].balance
                })
                .catch((e) => {
                    throw new Error(e)
                })

            if (balanceUser < documentFound.price) {
                return res.status(400).json({
                    message: "balance not enough!"
                })
            }

            await globalThis.connection.executeQuery("insert into boughtDocument (userId, documentId) values (?,?)", [userId, documentId])
                .then((r) => {
                    return r
                })
                .catch((e) => {
                    throw new Error(e)
                })

            await globalThis.connection.executeQuery("update user set balance = balance - ? where userId = ?", [documentFound.price, userId])

            await globalThis.connection.executeQuery("update document set quantitySold = quantitySold + 1 where documentId = ?", [documentId])


            return res.status(200).json({
                message: "ok"
            })



        } catch (error) {
            console.log("error when buyDocument : ", error);
            return res.status(500).json({
                message: "have wrong!"
            })
        }

    }


    async getCart(req, res) {

        try {

            let userId = req?.decodeAccessToken?.userId

            if (!userId) {
                return res.status(400).json({
                    message: "not found userId!"
                })
            }

            let dataCart = await globalThis.connection.executeQuery(`
                    select document.documentId , document.name , document.author , document.description , document.image,document.type,document.price , document.quantitySold from cart join document on cart.documentId = document.documentId where cart.userId = ${userId}
                `)
                .then((r) => {
                    return r
                })
                .catch((e) => {
                    throw new Error(e)
                })

            return res.status(200).json({
                message: "ok",
                dataCart
            })

        } catch (error) {
            console.log("error when getCart : ", error);
            return res.status(500).json({
                message: "have wrong!"
            })
        }

    }


}


module.exports = AuthController