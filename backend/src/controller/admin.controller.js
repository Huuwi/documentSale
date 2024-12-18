const FileDisk = require("../helper/fileDisk.helper")
const path = require("path")

const fileDisk = new FileDisk()

class AdminController {

    async addNewDocument(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: "not found file!"
                })
            }

            let filePath = req.file.path
            let author = req.body.author
            let fileName = req.body.fileName
            let image = req.body.image
            let type = req.body.type || 2
            let description = req.body.description
            let price = Number(req.body.price) || 0

            await globalThis.connection.executeQuery(`insert into document (name,author,description,image,price,filePath,type) values (?,?,?,?,?,?,?)`, [fileName, author, description, image, price, filePath, type])
                .catch((e) => {
                    throw new Error(e)
                })

            return res.status(200).json({
                message: "ok"
            })
        } catch (error) {
            console.log("err when addNewDocument : ", error);
            return res.status(500).json({
                message: "have wrong!"
            })
        }
    }

    async deleteDocument(req, res) {
        try {
            await FileDisk.asyncFileWithDB()
            let documentId = Number(req.body.documentId);
            if (!documentId) {
                return res.status(400).json({
                    message: "not found documentId!"
                })
            }

            let documentFound = await globalThis.connection.executeQuery(`select * from document where documentId = ${documentId} LIMIT 1`)
                .then((doc) => {
                    return doc[0]
                })
                .catch((e) => {
                    throw new Error(e)
                })
            if (!documentFound) {
                return res.status(400).json({
                    message: "not found document!"
                })
            }
            let deleteState = await FileDisk.deleteFile(path.join(globalThis.root + "\\" + documentFound.filePath.split("src\\")[1]), documentId)
            if (!deleteState.state) {
                throw new Error(deleteState.error)
            }

            return res.status(200).json({
                message: "ok"
            })

        } catch (error) {
            console.log("err when deleteDocument : ", error);
            return res.status(500).json({
                message: "have wrong!"
            })
        }
    }


}

module.exports = AdminController

