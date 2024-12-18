const multer = require("multer")
const fs = require("fs")

class FileDisk {

    static async deleteFile(filePath, documentId) {
        try {
            if (!filePath) {
                return {
                    state: false
                }
            }
            fs.unlinkSync(filePath)
            await globalThis.connection.executeQuery("delete from document where documentId = ?", [documentId])
                .catch((e) => {
                    throw new Error(e)
                })
            await globalThis.connection.executeQuery("delete from comment where documentId = ?", [documentId])
                .catch((e) => {
                    throw new Error(e)
                })
            return {
                state: true
            }

        } catch (error) {
            return {
                state: false,
                error
            }
        }

    }

    static async asyncFileWithDB() {
        try {
            let folderPath = "./src/uploads"
            let fileNames = fs.readdirSync(folderPath, "utf-8")

            let folderInDB = "src\\uploads\\"
            fileNames = fileNames.map((e) => { return folderInDB + e })

            await globalThis.connection.executeQuery('delete from document where filePath not in (?)', [fileNames])
                .catch((e) => {
                    throw new Error(e)
                })
            return true
        } catch (error) {
            console.log("err when asyncFileWithDB : " + error);
            return false
        }


    }


    static async getAllDocument() {

    }

    static async clearAllFile() {
        try {
            await globalThis.connection.executeQuery('delete from document')
                .catch((e) => {
                    throw new Error(e)
                })

            let folderPath = "./src/uploads"

            let fileNames = fs.readdirSync(folderPath, "utf-8")

            for (let e of fileNames) {
                fs.unlinkSync(folderPath + "/" + e)
            }
            return true
        } catch (error) {
            console.log("err when clearAllFile : " + error);
            return false
        }
    }

    constructor() {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, "./src/uploads")
            },
            filename: function (req, file, cb) {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + "."
                cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname.split(".")[file.originalname.split(".").length - 1])
            }
        })
        this.upload = multer({ storage: storage })
        return this.upload
    }



}


module.exports = FileDisk